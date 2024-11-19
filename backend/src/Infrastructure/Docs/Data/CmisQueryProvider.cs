using System.Linq.Expressions;
using PortCMIS;
using PortCMIS.Client;
using PortCMIS.Exceptions;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Infrastructure.Docs.Types;
using Document = RealGimm.Core.Docs.DocumentAggregate.Document;

namespace RealGimm.Infrastructure.Docs.Data;

public class CmisQueryProvider : IQueryProvider
{
  private readonly CmisSession _session;
  private readonly Guid _tenantId;

  public CmisQueryProvider(CmisSession session, Guid tenantId)
  {
    _session = session;
    _tenantId = tenantId;
  }

  public async Task EnsureInitializedAsync(CancellationToken cancellationToken)
  {
    await _session.EnsureInitializedAsync(cancellationToken);
  }

  public IQueryable CreateQuery(Expression expression)
  {
    return new CmisQueryable<Document>(expression, this);
  }

  public IQueryable<TElement> CreateQuery<TElement>(Expression expression)
  {
    return new CmisQueryable<TElement>(expression, this);
  }

  public object Execute(Expression expression)
  {
    return ExecuteCmisQuery(expression);
  }

  public TResult Execute<TResult>(Expression expression)
  {
    return (TResult)ExecuteCmisQuery(expression);
  }

  private object ExecuteCmisQuery(Expression expression)
  {
    var qvisit = new CmisQueryVisitor(_tenantId);

    _ = qvisit.ToSql(expression);

    var where = qvisit.WhereExpression;
    var orderBy = qvisit.OrderByExpression;

    var ctx = _session.Session.CreateOperationContext();
    ctx.OrderBy = orderBy;

    try
    {
      var result = _session.Session
          .QueryObjects(_session.DocumentType, where, false, ctx)
          .Select(r => MapResult(r, _session.Session))
          .ToList();

      if (!result.Any() && expression!.Type == typeof(Document)) return new Document();
      if (!result.Any() && expression.Type.GetInterfaces().Contains(typeof(IQueryable))) return new List<Document>();

      return expression.Type.GetInterfaces().Contains(typeof(IQueryable)) ? result : result.Single()!;
    }
    catch (CmisObjectNotFoundException)
    {
      return new List<Document>();
    }
  }

  public static Document? MapResult(ICmisObject? result, ISession session)
  {
    if (result == null) return null;

    var nd = new Document();
    nd.UpdateCmisId(result.TryGetValue(PropertyIds.ObjectId)!);
    nd.SetBaseData(result.TryGetValue(PropertyIds.Name)!,
        result.TryGetValue(CmisTypes.RG_FILE_NAME),
        result.TryGetValue<ContentType>(CmisTypes.RG_CONTENT_TYPE)!.Value,
        result.TryGetValue<ContentCategory>(CmisTypes.RG_CONTENT_CATEGORY)!.Value,
        result.TryGetValue(CmisTypes.RG_UPLOADER_NAME),
        result.TryGetDateTime(PropertyIds.CreationDate) ?? DateTime.UtcNow);

    nd.SetOwnershipData(
      result.TryGetValue(CmisTypes.RG_TENANT_ID)!,
      result.TryGetMultipleValues(CmisTypes.RG_MANAGEMENT_SUBJECT_ID)!,
      result.TryGetValue(CmisTypes.RG_OWNER_ID),
      result.TryGetValue(CmisTypes.RG_ESTATE_ID));

    nd.SetProtocol(result.TryGetValue(CmisTypes.RG_PROTOCOL_NUMBER));
    nd.SetIssuer(
        result.TryGetValue(CmisTypes.RG_ISSUER_NAME),
        result.TryGetValue(CmisTypes.RG_ISSUER_CODE),
        result.TryGetDateTime(CmisTypes.RG_ISSUE_DATE)
    );
    nd.SetNotes(result.TryGetValue(CmisTypes.RG_NOTES));
    nd.SetValidity(
        result.TryGetDateTime(CmisTypes.RG_VALID_SINCE),
        result.TryGetDateTime(CmisTypes.RG_VALID_UNTIL)
    );

    nd.SetStreamGetter(
        () =>
        {
          var contentStream = session.GetContentStream(new ObjectId(nd.CmisId));
          if (contentStream is null || contentStream.Length == 0)
            return null;
          return contentStream.Stream;
        },
        result.TryGetValue(PropertyIds.ContentStreamMimeType)!
    );

    return nd;
  }
}
