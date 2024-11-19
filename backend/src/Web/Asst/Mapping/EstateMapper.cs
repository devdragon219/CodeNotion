using RealGimm.Core;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public class EstateMapper : MapperBase, IMapper<EstateInput, Estate>
{
  private readonly IMapper _mapper;
  private readonly IReadRepository<EstateUsageType> _usageTypes;
  private readonly IReadRepository<EstateMainUsageType> _mainUsageTypes;

  public EstateMapper(IMapper mapper,
    IReadRepository<EstateUsageType> usageTypes,
    IReadRepository<EstateMainUsageType> mainUsageTypes)
  {
    _mapper = mapper;
    _usageTypes = usageTypes;
    _mainUsageTypes = mainUsageTypes;
  }

  public async Task<Estate?> MapAsync(EstateInput? from, Estate? into, CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var estate = into ?? new Estate();

    estate.SetName(from.Name);
    estate.SetStatus(from.Status);
    estate.SetInternalCode(from.InternalCode);
    estate.SetType(from.Type);
    estate.SetOwnership(from.Ownership);
    estate.SetExternalCode(from.ExternalCode);
    estate.SetNotes(from.Notes);

    estate.SetManagement(from.ManagementSubjectId, from.ManagementOrgUnitId);

    estate.SetMainUsageType(
      (await _mainUsageTypes.GetByIdAsync(from.MainUsageTypeId, cancellationToken))!
    );

    estate.SetUsageType(
      (await _usageTypes.GetByIdAsync(from.UsageTypeId, cancellationToken))!
    );
    
    estate.SetSurfaceArea(from.SurfaceAreaSqM);
    estate.SetBuildYear(from.BuildYear);
    estate.SetDecommissioningDate(from.DecommissioningDate);

    try
    {
      await UpdateCollectionAsync(
        from.Addresses,
        _mapper,
        () => estate.Addresses,
        estate.AddAddress,
        estate.RemoveAddress,
        cancellationToken
      );
    }
    catch (ArgumentException argumentException)
    {
      if (argumentException.ParamName == "address")
      {
        throw new MappingException(ErrorCode.AddressStillInUse.ToValidationError());
      }
    }

    await UpdateCollectionAsync(
      from.Stairs,
      _mapper,
      () => estate.Stairs,
      estate.AddStairs,
      estate.RemoveStairs,
      cancellationToken
    );

    await UpdateCollectionAsync(
      from.Floors,
      _mapper,
      () => estate.Floors,
      estate.AddFloor,
      estate.RemoveFloor,
      cancellationToken
    );

    await UpdateCollectionAsync(
      from.Refactorings,
      _mapper,
      () => estate.Refactorings,
      estate.AddRefactoring,
      estate.RemoveRefactoring,
      cancellationToken
    );

    await UpdateCollectionAsync(
      from.Valuations,
      _mapper,
      () => estate.Valuations,
      estate.AddValuation,
      estate.RemoveValuation,
      cancellationToken
    );

    var totalMarketValue = await _mapper.MapAsync(
      from.MarketValue,
      into?.TotalMarketValue,
      cancellationToken);

    estate.SetTotalMarketValue(totalMarketValue);

    return estate;
  }
}
