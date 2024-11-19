using System.Linq.Expressions;
using Ardalis.Specification;
using Ardalis.Specification.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.Extensions.Logging;
using PortCMIS;
using PortCMIS.Client;
using PortCMIS.Exceptions;
using RealGimm.Core;
using RealGimm.Core.Docs;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Infrastructure.Docs.Types;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure.Docs.Data;

public class DocsCmisRepository : IReadRepository<Document>, IRepository<Document>
{
  private readonly ILogger<DocsCmisRepository> _logger;
  private readonly CmisSession _session;
  private readonly IUserDataProvider _userDataProvider;

  public DocsCmisRepository(
      ILogger<DocsCmisRepository> logger,
      CmisSession session,
      IUserDataProvider userDataProvider)
  {
    _logger = logger;
    _session = session;
    _userDataProvider = userDataProvider;
  }

  private IQueryProvider? _queryProvider;
  private IQueryProvider QueryProvider
  {
    get
    {
      _queryProvider ??= new CmisQueryProvider(_session, _userDataProvider.TenantId);

      return _queryProvider!;
    }
  }

  public async Task<Document> AddAsync(Document entity, CancellationToken cancellationToken = default)
  {
    var cmisId = await UploadEntity(entity, true, cancellationToken);

    if (cmisId != null)
    {
      entity.UpdateCmisId(cmisId);
    }

    return entity;
  }

  public async Task<IEnumerable<Document>> AddRangeAsync(IEnumerable<Document> entities, CancellationToken cancellationToken = default)
  {
    foreach (var doc in entities)
    {
      await AddAsync(doc, cancellationToken);
    }

    return entities;
  }

  public async Task<bool> AnyAsync(ISpecification<Document> specification, CancellationToken cancellationToken = default)
  {
    return await AsQueryable(specification).AnyAsync();
  }

  public async Task<bool> AnyAsync(CancellationToken cancellationToken = default)
  {
    return await AsQueryable().AnyAsync();
  }

  public IQueryable<Document> AsQueryable(ISpecification<Document> specification)
  {
    _session.EnsureInitializedAsync(CancellationToken.None).GetAwaiter().GetResult();

    var query = QueryProvider.CreateQuery<Document>(
        Expression.Empty()
    );

    query = SpecificationEvaluator.Default.GetQuery(query, specification, false);

    return query;
  }

  public IQueryable<Document> AsQueryable(IEnumerable<ISpecification<Document>> specifications)
  {
    _session.EnsureInitializedAsync(CancellationToken.None).GetAwaiter().GetResult();

    var query = QueryProvider.CreateQuery<Document>(
        Expression.Empty()
    );

    foreach (var specification in specifications)
    {
      query = SpecificationEvaluator.Default.GetQuery(query, specification, false);
    }

    return query;
  }

  public IQueryable<Document> AsQueryable(params ISpecification<Document>[] specifications)
    => AsQueryable((IEnumerable<ISpecification<Document>>)specifications);

  public async Task<int> CountAsync(ISpecification<Document> specification, CancellationToken cancellationToken = default)
  {
    return await AsQueryable(specification).CountAsync();
  }

  public async Task<int> CountAsync(CancellationToken cancellationToken = default)
  {
    return await AsQueryable().CountAsync();
  }

  public async Task DeleteAsync(Document entity, CancellationToken cancellationToken = default)
  {
    await _session.EnsureInitializedAsync(cancellationToken);

    var doc = _session.Session.GetObject(new ObjectId(entity.CmisId)) as IDocument;

    doc?.Delete();
  }

  public async Task DeleteRangeAsync(IEnumerable<Document> entities, CancellationToken cancellationToken = default)
  {
    foreach (var doc in entities)
    {
      await DeleteAsync(doc, cancellationToken);
    }
  }

  public async Task DeleteRangeAsync(ISpecification<Document> specification, CancellationToken cancellationToken = default)
    => await DeleteRangeAsync(await AsQueryable(specification).ToListAsync(cancellationToken), cancellationToken);

  public async Task<Document?> FirstOrDefaultAsync(ISpecification<Document> specification, CancellationToken cancellationToken = default)
  {
    await _session.EnsureInitializedAsync(cancellationToken);

    _session.EnsureDocumentTypeExists();

    return AsQueryable(specification).FirstOrDefault();
  }

  public Task<TResult?> FirstOrDefaultAsync<TResult>(ISpecification<Document, TResult> specification, CancellationToken cancellationToken = default)
  {
    throw new NotImplementedException();
  }

  public async Task<Document?> GetByIdAsync<TId>(TId id, CancellationToken cancellationToken = default) where TId : notnull
  {
    await _session.EnsureInitializedAsync(cancellationToken);

    _session.EnsureDocumentTypeExists();

    return CmisQueryProvider.MapResult(
        _session.Session.GetObject(new ObjectId(id as string)) as IDocument,
        _session.Session);
  }

  public async Task<Document?> GetBySpecAsync(ISpecification<Document> specification, CancellationToken cancellationToken = default)
  {
    return await FirstOrDefaultAsync(specification, cancellationToken);
  }

  public Task<TResult?> GetBySpecAsync<TResult>(ISpecification<Document, TResult> specification, CancellationToken cancellationToken = default)
  {
    throw new NotImplementedException();
  }

  public async Task<List<Document>> ListAsync(CancellationToken cancellationToken = default)
  {
    await _session.EnsureInitializedAsync(cancellationToken);

    _session.EnsureDocumentTypeExists();

    return await AsQueryable().ToListAsync(cancellationToken);
  }

  public async Task<List<Document>> ListAsync(ISpecification<Document> specification, CancellationToken cancellationToken = default)
  {
    await _session.EnsureInitializedAsync(cancellationToken);

    _session.EnsureDocumentTypeExists();

    return await AsQueryable(specification).ToListAsync(cancellationToken);
  }

  public Task<List<TResult>> ListAsync<TResult>(ISpecification<Document, TResult> specification, CancellationToken cancellationToken = default)
  {
    throw new NotImplementedException();
  }

  public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
  {
    throw new NotImplementedException();
  }

  public async Task<Document?> SingleOrDefaultAsync(ISingleResultSpecification<Document> specification, CancellationToken cancellationToken = default)
  {
    var list = await ListAsync(specification, cancellationToken);

    if (list.Count > 1)
    {
      throw new InvalidOperationException("There are more than 1 results matching the specification");
    }

    return list.FirstOrDefault();
  }

  public Task<TResult?> SingleOrDefaultAsync<TResult>(ISingleResultSpecification<Document, TResult> specification, CancellationToken cancellationToken = default)
  {
    throw new NotImplementedException();
  }

  public async Task UpdateAsync(Document entity, CancellationToken cancellationToken = default)
  {
    if(entity.IsMetadataUpdated) {
      await UploadEntity(entity, true, cancellationToken);
    }
  }

  public async Task UpdateRangeAsync(IEnumerable<Document> entities, CancellationToken cancellationToken = default)
  {
    foreach (var doc in entities)
    {
      await UpdateAsync(doc, cancellationToken);
    }
  }

  private async Task<string?> UploadEntity(Document entity, bool isMajorUpdate, CancellationToken cancellationToken)
  {
    await _session.EnsureInitializedAsync(cancellationToken);

    var documentType = _session.EnsureDocumentTypeExists();

    Dictionary<string, object> properties = new Dictionary<string, object>
        {
          { PropertyIds.ObjectTypeId, documentType.Id },
          { PropertyIds.Name, entity.Name },
          { CmisTypes.RG_CONTENT_CATEGORY, Enum.GetName(entity.ContentCategory)! },
          { CmisTypes.RG_CONTENT_TYPE, Enum.GetName(entity.ContentType)! },
          { CmisTypes.RG_TENANT_ID, _userDataProvider.TenantId.ToString() },
          { CmisTypes.RG_MANAGEMENT_SUBJECT_ID, entity.ManagementSubjectIds }
        };

    if (!string.IsNullOrEmpty(entity.FileName))
    {
      properties.Add(CmisTypes.RG_FILE_NAME, entity.FileName);
    }

    if (!string.IsNullOrEmpty(entity.UploaderName))
    {
      properties.Add(CmisTypes.RG_UPLOADER_NAME, entity.UploaderName);
    }

    if (!string.IsNullOrEmpty(entity.EntityId))
    {
      properties.Add(CmisTypes.RG_OWNER_ID, entity.EntityId);
    }

    if (!string.IsNullOrEmpty(entity.EstateId))
    {
      properties.Add(CmisTypes.RG_ESTATE_ID, entity.EstateId);
    }

    if (!string.IsNullOrEmpty(entity.Issuer))
    {
      properties.Add(CmisTypes.RG_ISSUER_NAME, entity.Issuer);
    }

    if (!string.IsNullOrEmpty(entity.IssuerCode))
    {
      properties.Add(CmisTypes.RG_ISSUER_CODE, entity.IssuerCode);
    }

    if (entity.IssueDate is not null)
    {
      properties.Add(CmisTypes.RG_ISSUE_DATE, entity.IssueDate.Value.ToDateTime(
        TimeOnly.MinValue
      ));
    }

    if (!string.IsNullOrEmpty(entity.ProtocolNumber))
    {
      properties.Add(CmisTypes.RG_PROTOCOL_NUMBER, entity.ProtocolNumber);
    }

    if (entity.Since.HasValue)
    {
      properties.Add(CmisTypes.RG_VALID_SINCE, entity.Since.Value);
    }

    if (entity.Until.HasValue)
    {
      properties.Add(CmisTypes.RG_VALID_UNTIL, entity.Until.Value);
    }

    if (!string.IsNullOrEmpty(entity.Notes))
    {
      properties.Add(CmisTypes.RG_NOTES, entity.Notes);
    }

    // Check if the main (document category) folder exists, otherwise create it
    var containerFolder = _session.GetOrCreateFolder(entity.Folder, entity.EntityId);

    IDocument? previous = null;

    try
    {
      previous = entity.CmisId is not null
        ? (_session.Session.GetObject(entity.CmisId) as IDocument)
        : null;
    }
    catch (CmisObjectNotFoundException) { }

    if (entity.Data != null && !string.IsNullOrEmpty(entity.MimeType))
    {
      properties.Add(PropertyIds.ContentStreamMimeType, entity.MimeType);

      if (previous is not null)
      {
        //Update both properties and content
        if (previous.IsVersionSeriesCheckedOut ?? false)
        {
          previous.CancelCheckOut();
        }
        var workingCopyId = previous.CheckOut();
        var workingCopy = _session.Session.GetObject(workingCopyId) as IDocument;
        return workingCopy?.CheckIn(isMajorUpdate, properties,
        _session.Session.ObjectFactory.CreateContentStream(
                entity.FileName,
                entity.DataLength,
                entity.MimeType,
                entity.Data),
                string.Empty)?.Id;
      }
      else
      {
        try
        {
          return _session.Session.CreateDocument(
              properties,
              new ObjectId(containerFolder!.Id),
              _session.Session.ObjectFactory.CreateContentStream(
                  entity.FileName,
                  entity.DataLength,
                  entity.MimeType,
                  entity.Data),
              PortCMIS.Enums.VersioningState.Major)?.Id;
        }
        catch (CmisNameConstraintViolationException e)
        {
          _logger.LogWarning(e, "Duplicate document name exception");
          throw new DuplicateDocumentNameException(entity.Name, e);
        }
      }
    }
    else
    {
      if (previous is not null)
      {
        previous.UpdateProperties(properties, false);
        return previous.Id;
      }
      else
      {
        try
        {
          return _session.Session.CreateDocument(
              properties,
              new ObjectId(containerFolder!.Id),
              null,
              PortCMIS.Enums.VersioningState.Major)?.Id;
        }
        catch (CmisNameConstraintViolationException e)
        {
          _logger.LogWarning(e, "Duplicate document name exception");
          throw new DuplicateDocumentNameException(entity.Name, e);
        }
      }
    }
  }

  public void UpdateSuspend(Document entity)
  {
    throw new NotImplementedException();
  }

  public void AddSuspend(Document entity)
  {
    throw new NotImplementedException();
  }

  public void DeleteSuspend(Document entity)
  {
    throw new NotImplementedException();
  }

  public void DeleteRangeSuspend(Document[] entities)
  {
    throw new NotImplementedException();
  }

  public Task LoadCollectionAsync<TItem>(Document entity, Expression<Func<Document, IEnumerable<TItem>>> collectionSelector, CancellationToken cancellationToken = default) where TItem : class
  {
    throw new NotImplementedException();
  }

  Task IRepository<Document>.UpsertCollectionAsync<TEntity, TItem>(TEntity entity, Expression<Func<TEntity, IEnumerable<TItem>>> collectionExpression, CancellationToken cancellationToken)
  {
    throw new NotImplementedException();
  }

  public async IAsyncEnumerable<Document> AsAsyncEnumerable(ISpecification<Document> specification)
  {
    foreach (var doc in await ListAsync(specification))
    {
      yield return doc;
    }
  }

  public Task ExecuteUpdateAsync(Expression<Func<Document, bool>> filter, Expression<Func<SetPropertyCalls<Document>, SetPropertyCalls<Document>>> update)
  {
    throw new NotImplementedException();
  }

  public Task LoadNavigationsAsync(TicketCondition condition, CancellationToken cancellationToken)
    => throw new NotImplementedException();
}

