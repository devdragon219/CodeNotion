using RealGimm.Web.Docs.Models;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Docs.Mapping;

public abstract class DocumentMapperBase<TEntity> : IDocumentMapper<TEntity>
{
  public required IUserDataProvider UserDataProvider { protected get; init; }

  public abstract Task MapAsync(int entityId, int? estateId, DocumentInput from, Document into, CancellationToken cancellationToken);

  protected void Map(int[] managementSubjectIds, int entityId, int? estateId, DocumentInput from, Document into)
  {
    into.SetBaseData(
      from.Name,
      from.FileName,
      from.ContentType,
      from.ContentCategory,
      UserDataProvider.Username,
      into.CreationDate);

    into.SetIssuer(from.Issuer, from.IssuerCode, from.IssueDate);
    into.SetProtocol(from.ProtocolNumber);
    into.SetValidity(from.Since, from.Until);
    into.SetNotes(from.Notes);
    into.SetOwnership<TEntity>(managementSubjectIds, entityId, estateId);

    if (from.Content is not null)
    {
      into.SetStream(from.Content.OpenReadStream(), from.Content!.Length!.Value, from.MimeType ?? "application/octet-stream");
    }
    else
    {
      into.ClearStream();
    }

    if (from.CmisId is not null)
    {
      into.UpdateCmisId(from.CmisId);
    }
  }
}
