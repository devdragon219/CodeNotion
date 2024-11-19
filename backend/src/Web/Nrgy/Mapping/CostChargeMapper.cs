using RealGimm.Web.Nrgy.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Nrgy.CostChargeAggregate;
using RealGimm.Core;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.Nrgy.UtilityServiceAggregate.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Nrgy.Mapping;

public sealed class CostChargeMapper : IMapper<CostChargeInput, CostCharge>
{
  private readonly IMapper _mapper;
  private readonly IReadRepository<UtilityService> _utilityServiceRepository;

  public CostChargeMapper(IMapper mapper, IReadRepository<UtilityService> utilityServiceRepository)
  {
    _mapper = mapper;
    _utilityServiceRepository = utilityServiceRepository;
  }

  public async Task<CostCharge?> MapAsync(CostChargeInput? from, CostCharge? into, CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    var costCharge = into ?? new CostCharge();
    costCharge.SetPeriod(from.PeriodStart, from.PeriodEnd);
    costCharge.SetTotalAmount(from.TotalAmount);
    costCharge.SetReferenceDate(from.ReferenceDate);
    costCharge.SetDueDate(from.DueDate);
    costCharge.SetInvoiceNumber(from.InvoiceNumber);
    costCharge.SetTotalVATAmount(from.TotalVATAmount);
    costCharge.SetInvoicedConsumptionAmount(from.InvoicedConsumptionAmount);

    var utilityService = await _utilityServiceRepository
      .AsQueryable(new GetByIdSpec<UtilityService>(from.ServiceId), new UtilityServiceIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken)
      ?? throw new MappingException(ErrorCode.CostChargeNonExistingUtilityService.ToValidationError());

    costCharge.SetService(utilityService);

    var actualConsumption = await _mapper.MapAsync<CostChargeConsumptionInput, CostChargeConsumption>(
      from.ActualConsumption,
      cancellationToken);

    costCharge.SetActualConsumption(actualConsumption);

    var expectedConsumption = await _mapper.MapAsync<CostChargeConsumptionInput, CostChargeConsumption>(
      from.ExpectedConsumption,
      cancellationToken);
    
    costCharge.SetExpectedConsumption(expectedConsumption);

    var fields = await _mapper.MapAsync<CostChargeFieldInput, CostChargeField>(from.Fields, cancellationToken);
    costCharge.SetFields(fields!.ToArray()!);

    return costCharge;
  }
}
