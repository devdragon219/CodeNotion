using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public class CadastralUnitMapper : MapperBase, IMapper<CadastralUnitInput, CadastralUnit>
{
  private readonly IMapper _mapper;
  private readonly IRepository<EstateUnit> _estateUnitRepository;

  public CadastralUnitMapper(IMapper mapper, IRepository<EstateUnit> estateUnityepository)
  {
    _mapper = mapper;
    _estateUnitRepository = estateUnityepository;
  }

  public async Task<CadastralUnit?> MapAsync(
    CadastralUnitInput? from,
    CadastralUnit? into,
    CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var cadastralUnit = into ?? new CadastralUnit();

    if (into is null)
    {
      cadastralUnit.SetHistoryTags(new Guid[] { Guid.NewGuid() });
      cadastralUnit.SetLastRelevantChangeDate(DateTime.UtcNow);
    }

    cadastralUnit.SetType(from.Type);
    cadastralUnit.SetStatus(from.Status);
    cadastralUnit.SetInternalCode(from.InternalCode!);
    cadastralUnit.SetDates(from.Since, from.Until);
    cadastralUnit.SetNotes(from.CadastralNotes, from.FiscalNotes, from.ConsortiumNotes);
    cadastralUnit.SetAddress((await _mapper.MapAsync(from.Address, into?.Address, cancellationToken))!);
    cadastralUnit.SetCadastralFlags(from.IsCadastralRegistrationInProgress, from.IsAncillaryUnit);

    var income = await _mapper.MapAsync(from.Income, into?.Income, cancellationToken);

    if (income is not null)
    {
      cadastralUnit.SetIncome(income);
    }

    var inspection = await _mapper.MapAsync(from.Inspection, into?.Inspection, cancellationToken);

    cadastralUnit.SetInspection(inspection);

    await _mapper.UpdateCollectionAsync(from.Coordinates ?? Array.Empty<CadastralCoordinatesInput>(), cadastralUnit.Coordinates, cancellationToken);
    await _mapper.UpdateCollectionAsync(from.Expenses ?? Array.Empty<CadastralExpensesInput>(), cadastralUnit.Expenses, cancellationToken);
    await _mapper.UpdateCollectionAsync(from.Unavailabilities ?? Array.Empty<CadastralUnavailabilityInput>(), cadastralUnit.Unavailabilities, cancellationToken);

    cadastralUnit.TaxConfig.Clear();
    if (from.TaxConfig is not null)
    {
      var fields = await _mapper.MapAsync<CadastralUnitTaxConfigInput, CadastralUnitTaxConfig>(from.TaxConfig, cancellationToken);
      cadastralUnit.TaxConfig.AddRange(fields!);
    }

    if (from.EstateUnitId.HasValue &&
      (cadastralUnit.EstateUnit is null || cadastralUnit.EstateUnit.Id != from.EstateUnitId))
    {
      var estateUnit = await _estateUnitRepository
        .AsQueryable(new GetByIdSpec<EstateUnit>(from.EstateUnitId.Value))
        .SingleAsync(cancellationToken);

      cadastralUnit.SetEstateUnit(estateUnit);
    }

    return cadastralUnit;
  }
}
