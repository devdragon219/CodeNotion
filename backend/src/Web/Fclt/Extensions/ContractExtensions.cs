using HotChocolate.Resolvers;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Models;
using RealGimm.Core.Docs.DocumentAggregate.Specifications;
using RealGimm.Core.Docs.Interfaces;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Web.Asst.DataLoaders;
using RealGimm.Web.Docs.Queries.Filters;
using RealGimm.WebCommons.Anag.DataLoaders;
using RealGimm.Core.Docs.DocumentAggregate;

namespace RealGimm.Web.Fclt.Extensions;

[ExtendObjectType(typeof(Contract))]
public sealed class ContractExtension
{
  public async Task<ISubject> GetProviderSubject(
    [Parent] Contract contract,
    [Service] SubjectDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(contract.ProviderSubjectId, cancellationToken);

  public async Task<IEnumerable<EstateUnit>> GetEstateUnits(
    [Parent] Contract contract,
    [Service] EstateUnitDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(contract.EstateUnitIds, cancellationToken);

  public async Task<IEnumerable<CatalogueType>> GetCatalogueTypes(
    [Parent] Contract contract,
    [Service] CatalogueTypeDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(contract.CatalogueTypeIds, cancellationToken);

  public async Task<bool> CanUseDocumentName(
    [Parent] Contract contract,
    string name,
    [Service] IReadRepository<Document> repository)
    => !await repository.AnyAsync(new DocumentsByEntityIdAndNameSpec<Contract>(contract.Id, name));

  [UseFiltering<DocumentFilterType>]
  [UseSorting]
  public IEnumerable<DocumentsPerContentCategoryGroupOutput> GetDocuments(
    [Parent] Contract contract,
    [SchemaService] IResolverContext resolverContext,
    [Service] IDocumentService documentService,
    [Service] IReadRepository<Document> repository)
  {
    var documents = repository
      .AsQueryable(new DocumentsByEntityIdSpec<Contract>(contract.Id))
      .Filter(resolverContext)
      .ToArray();

    return documentService
      .GroupDocumentsByContentCategoryGroup(documents)
      .Sort(resolverContext);
  }
}
