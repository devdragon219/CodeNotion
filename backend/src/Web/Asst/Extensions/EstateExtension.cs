using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Specifications;
using HotChocolate.Resolvers;
using RealGimm.Core.Docs.Interfaces;
using RealGimm.Web.Docs.Queries.Filters;
using RealGimm.Web.Anag.DataLoaders;
using RealGimm.Core.Docs.DocumentAggregate.Models;
using RealGimm.WebCommons.Anag.DataLoaders;

namespace RealGimm.Web.Asst.Extensions;

[ExtendObjectType(typeof(Estate))]
public sealed class EstateExtension
{
  public async Task<OrgUnit?> GetManagementOrgUnit(
    [Parent] Estate estate,
    [Service] OrgUnitDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => estate.ManagementOrgUnitId is null
      ? null
      : await dataLoader.LoadAsync(estate.ManagementOrgUnitId.Value, cancellationToken);

  public async Task<ISubject> GetManagementSubject(
    [Parent] Estate estate,
    [Service] SubjectDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => await dataLoader.LoadAsync(estate.ManagementSubjectId, cancellationToken);

  public async Task<bool> CanUseDocumentName(
    [Parent] Estate estate,
    string name,
    [Service] IReadRepository<Document> repository)
  {
    if (estate is null)
    {
      return false;
    }

    return !await repository
      .AsQueryable(new DocumentsByEntityIdAndNameSpec<Estate>(estate.Id, name))
      .AnyAsync();
  }

  [UseFiltering<DocumentFilterType>]
  [UseSorting]
  public IEnumerable<DocumentsPerContentCategoryGroupOutput> GetDocuments(
    [Parent] Estate estate,
    [SchemaService] IResolverContext resolverContext,
    [Service] IDocumentService documentService,
    [Service] ILogger<EstateExtension> logger,
    [Service] IReadRepository<Document> repository)
  {
    try
    {
      var documents = repository
        .AsQueryable(new DocumentsByEntityIdSpec<Estate>(estate.Id))
        .Where(document => document.ContentType != ContentType.Image)
        .Filter(resolverContext)
        .ToArray();

      return documentService
        .GroupDocumentsByContentCategoryGroup(documents)
        .Sort(resolverContext);
    }
    catch (Exception e)
    {
      logger.LogError(e, "Unable to fetch documents for estate");
      return Enumerable.Empty<DocumentsPerContentCategoryGroupOutput>();
    }
  }

  public IEnumerable<Document> GetImages(
    [Parent] Estate estate,
    [Service] IReadRepository<Document> repository)
    => repository
        .AsQueryable(new DocumentsByEntityIdSpec<Estate>(estate.Id))
        .Where(document => document.ContentType == ContentType.Image)
        .AsEnumerable();
}
