using HotChocolate.Resolvers;
using RealGimm.Core.Asst.EstateSubUnitAggregate;
using RealGimm.Core.Asst.EstateSubUnitAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web.Asst.DataLoaders;
using RealGimm.Web.Asst.Queries.Filters;
using RealGimm.Web.Asst.Queries.Sorting;
using RealGimm.WebCommons;

namespace RealGimm.Web.Asst.Queries;

public class EstateSubUnitQueries
{
  [BackOfficePermission(Features.ASST_ESTATEUNIT_BASE, Permission.Read)]
  public async Task<EstateSubUnit?> Get(
    int id,
    EstateSubUnitDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(id, cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATEUNIT_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(EstateSubUnitFilterType))]
  [UseSorting(typeof(EstateSubUnitSortInputType))]
  public Task<IQueryable<EstateSubUnit>> ListEstateSubUnit(
    [Service] RepositoryWebWrapper<EstateSubUnit> repository,
    [SchemaService] IResolverContext? resolverContext)
    => repository.ListAllAsync(resolverContext, new EntityNonDeletedSpec<EstateSubUnit>(), new EstateSubUnitIncludeAllSpec());

  [BackOfficePermission(Features.ASST_ESTATEUNIT_BASE, Permission.Read)]
  [UseFiltering(typeof(EstateSubUnitFilterType))]
  [UseSorting(typeof(EstateSubUnitSortInputType))]
  public async Task<IQueryable<EstateSubUnit>> ListEstateSubUnitsFull(
    [Service] RepositoryWebWrapper<EstateSubUnit> repository,
    [SchemaService] IResolverContext? resolverContext)
    => await repository.ListAllAsync(resolverContext, new EntityNonDeletedSpec<EstateSubUnit>(), new EstateSubUnitIncludeAllSpec());

  [BackOfficePermission(Features.ASST_ESTATEUNIT_BASE, Permission.Read)]
  public async Task<string?> ProposeNewInternalCode(int parentUnitEstateId, [Service] ICodeSuggestor<EstateSubUnit> codeSuggest)
    => await codeSuggest.SuggestNextCode(parentUnitEstateId, partialEntity: null);
}
