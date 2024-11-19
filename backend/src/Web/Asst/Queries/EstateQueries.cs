using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateAggregate.Specifications;
using RealGimm.Core.Asst.Interfaces;
using RealGimm.Core.IAM;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.WebCommons.Models;
using RealGimm.Web.Asst.Queries.Filters;
using RealGimm.Web.Asst.Queries.Sorting;
using RealGimm.Core.Asst.Services;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons;
using RealGimm.Core;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Web.Asst.Models;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate.Models;
using AddressType = RealGimm.Core.Asst.EstateAggregate.AddressType;

namespace RealGimm.Web.Asst.Queries;

public class EstateQueries : QueriesBase
{
  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  public async Task<Estate?> GetEstate(
    int estateId,
    [Service] IReadRepository<Estate> repository,
    CancellationToken cancellationToken = default)
    => await repository
        .AsQueryable(new GetByIdSpec<Estate>(estateId), new EntityNonDeletedSpec<Estate>(), new EstateIncludeAllSpec())
        .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(EstateFilterType))]
  [UseSorting(typeof(EstateSortInputType))]
  public async Task<IQueryable<Estate>> ListEstates(
    int[]? keepTopIds,
    [Service] RepositoryWebWrapper<Estate> repository,
    [SchemaService] IResolverContext? resolverContext)
    => await repository.ListAllAsync(resolverContext, new EntityNonDeletedSpec<Estate>(), new EstateIncludeForListSpec(), new EstateOrderByIdsSpec(keepTopIds));


  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  [UseFiltering<EstateFilterType>]
  [UseSorting<EstateSortInputType>]
  public async Task<IEnumerable<EstateLightDto>> ListEstatesFull(
    [SchemaService] IResolverContext? resolverContext,
    [Service] RepositoryWebWrapper<Estate> estateRepository,
    [Service] IReadRepository<Subject> subjectRepository,
    CancellationToken cancellationToken = default)
  {
    var managementSubjects = await subjectRepository
      .AsQueryable()
      .OfType<ManagementSubject>()
      .Select(subject => new { subject.Id, subject.Name })
      .ToListAsync(cancellationToken);

    var estates = (await estateRepository.ListAllAsync(resolverContext, new EntityNonDeletedSpec<Estate>(), new EstateIncludeForLightDtoSpec()))
      .Select(estate => new
      {
        estate.Id,
        estate.ManagementSubjectId,
        estate.InternalCode,
        estate.Name,
        estate.Status,
        estate.Type,
        estate.UsageType,
        estate.Addresses
      })
      .ToList();

    return estates.Select(estate => new EstateLightDto
    {
      Id = estate.Id,
      ManagementSubjectId = estate.ManagementSubjectId,
      InternalCode = estate.InternalCode,
      ManagementSubjectName = managementSubjects
        .Where(subject => subject.Id == estate.ManagementSubjectId)
        .Select(subject => subject.Name)
        .SingleOrDefault(),
      Name = estate.Name,
      Status = estate.Status,
      Type = estate.Type,
      UsageType = estate.UsageType,
      Addresses = estate.Addresses
    });
  }

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  public async Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<Estate> codeSuggestor)
    => await codeSuggestor.SuggestNextCode(null, (Estate?)null);

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  public async Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentEstateId,
    [Service] IReadRepository<Estate> repository,
    CancellationToken cancellationToken = default)
  {
    var isCodeInUse = currentEstateId.HasValue
      ? await repository
          .AsQueryable(
            new GetByInternalCodeSpec<Estate>(internalCode.Trim()),
            new ExcludeByIdSpec<Estate>(currentEstateId.Value))
          .AnyAsync(cancellationToken)
      : await repository.AnyAsync(new GetByInternalCodeSpec<Estate>(internalCode.Trim()), cancellationToken);

    return !isCodeInUse;
  }

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  [UseFiltering(typeof(EstateFilterType))]
  [UseSorting(typeof(EstateSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] RepositoryWebWrapper<Estate> estateRepo,
    [Service] IDistributedCache distributedCache,
    [Service] IExportService<Estate> exportService,
    CancellationToken cancellationToken = default)
  {
    var estates = await (await estateRepo
      .ListAllAsync(resolverContext, new EntityNonDeletedSpec<Estate>(), new EstateIncludeAllForExportSpec()))
      .ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(estates, distributedCache, exportService, cancellationToken);
  }

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  public async Task<List<EstateSurfaces>> GetSurfaces(int estateId, [Service] IEstateSurfacesService estateSurfacesService)
    => await estateSurfacesService.EstateSurfaces(estateId);

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  public async Task<EstateStatisticsOutput> GetStatistics(
    [Service] IReadRepository<Estate> estateRepository,
    [Service] IReadRepository<EstateUnit> estateUnitRepository,
    [Service] IReadRepository<Contract> contractRepository,
    CancellationToken cancellationToken = default)
  {
    var estatesCount = await estateRepository.CountAsync(new EntityNonDeletedSpec<Estate>(), cancellationToken);
    var estateUnitsCount = await estateUnitRepository.CountAsync(new EntityNonDeletedSpec<EstateUnit>(), cancellationToken);

    var ocuppiedEstatesUnitsIds = await contractRepository
      .AsQueryable()
      .SelectMany(contract => contract.LocatedUnits.Select(locatedUnit => locatedUnit.EstateUnitId))
      .GroupBy(estateUnitId => estateUnitId)
      .Select(group => group.Key)
      .ToListAsync(cancellationToken);

    var occupiedEstatesCount = await estateUnitRepository
      .AsQueryable(new EntityNonDeletedSpec<EstateUnit>())
      .Where(estateUnit => ocuppiedEstatesUnitsIds.Contains(estateUnit.Id))
      .GroupBy(estateUnit => estateUnit.Estate.Id)
      .Select(group => group.Key)
      .CountAsync(cancellationToken);

    var vacantEstatesCount = estatesCount - occupiedEstatesCount;

    return new EstateStatisticsOutput(estatesCount, estateUnitsCount, occupiedEstatesCount, vacantEstatesCount);
  }

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  public async Task<IEnumerable<EstateLocation>> GetLocations(
    [Service] IReadRepository<Estate> estateRepository,
    CancellationToken cancellationToken)
    => await estateRepository
        .AsQueryable(new EntityNonDeletedSpec<Estate>())
        .Where(estate =>
          estate.Addresses.SingleOrDefault(address => address.AddressType == AddressType.Primary)!.LocationLatLon != null)
        .Select(estate => new EstateLocation(
          estate.Id,
          estate.InternalCode,
          estate.Name,
          estate.Addresses.SingleOrDefault(address => address.AddressType == AddressType.Primary)))
        .ToListAsync(cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  public async Task<EstateOccupationStatisticsOutput> GetOccupationStatistics(
    [Service] EstateOccupationStatisticsService statisticsService,
    CancellationToken cancellationToken = default)
  {
    return await statisticsService.GetCurrentStatisticsAsync(cancellationToken);
  }
}
