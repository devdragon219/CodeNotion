using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Common.OfficialActAggregate;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Models;
using RealGimm.Core.Docs.DocumentAggregate.Specifications;
using RealGimm.Core.Docs.Interfaces;
using RealGimm.Web.Anag.DataLoaders;
using RealGimm.Web.Asst.DataLoaders;
using RealGimm.Web.Common.DataLoaders;
using RealGimm.Web.Docs.Queries.Filters;
using RealGimm.WebCommons.Anag.DataLoaders;

namespace RealGimm.Web.Asst.Extensions;

[ExtendObjectType(typeof(EstateUnit))]
public sealed class EstateUnitExtension
{
  public async Task<ISubject> GetManagementSubject(
    [Parent] EstateUnit estateUnit,
    [Service] SubjectDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(estateUnit.ManagementSubjectId, cancellationToken);

  public async Task<OfficialAct?> GetOfficialAct(
    [Parent] EstateUnit estateUnit,
    [Service] OfficialActDataLoader loader,
    CancellationToken cancellationToken = default)
    => estateUnit.OfficialActId.HasValue
      ? await loader.LoadAsync(estateUnit.OfficialActId.Value, cancellationToken)
      : null;

  public async Task<IEnumerable<EstateUnitSurfaceSummary>> GetSurfacesTree(
    [Parent] EstateUnit estateUnit,
    [Service] EstateUnitSurfacesDataLoader estateUnitSurfacesDataLoader,
    CancellationToken cancellationToken = default)
    => await estateUnitSurfacesDataLoader.LoadAsync(estateUnit.Id, cancellationToken);

  public async Task<bool> CanUseDocumentName(
    [Parent] EstateUnit estateUnit,
    string name,
    [Service] IReadRepository<Document> repository)
  {
    if (estateUnit is null)
    {
      return false;
    }

    return !await repository
      .AsQueryable(new DocumentsByEntityIdAndNameSpec<EstateUnit>(estateUnit.Id, name))
      .AnyAsync();
  }

  [UseFiltering<DocumentFilterType>]
  [UseSorting]
  public IEnumerable<DocumentsPerContentCategoryGroupOutput> GetDocuments(
    [Parent] EstateUnit estateUnit,
    [SchemaService] IResolverContext resolverContext,
    [Service] IDocumentService documentService,
    [Service] ILogger<EstateUnitExtension> logger,
    [Service] IReadRepository<Document> repository)
  {
    try
    {
      var documents = repository
        .AsQueryable(new DocumentsByEntityIdSpec<EstateUnit>(estateUnit.Id))
        .Filter(resolverContext)
        .ToArray();

      return documentService
        .GroupDocumentsByContentCategoryGroup(documents)
        .Sort(resolverContext);
    }
    catch (Exception e)
    {
      logger.LogError(e, "Unable to fetch documents for estate unit");
      return [];
    }
  }
}
