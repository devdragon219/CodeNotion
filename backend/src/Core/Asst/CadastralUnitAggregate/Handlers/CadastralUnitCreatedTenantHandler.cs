using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.Core.Asst.CadastralUnitAggregate.Events;
using RealGimm.Core.Asst.CadastralUnitAggregate.Specifications;
using RealGimm.Core.EventSystem;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.Taxes;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Asst.CadastralUnitAggregate.Handlers;

[BackgroundEventHandler]
public sealed class CadastralUnitCreatedTenantHandler : TenantMessageHandler<CadastralUnitCreatedEvent>
{
  public IServiceProvider _serviceProvider { get; }
  public ILogger<CadastralUnitCreatedTenantHandler> _logger { get; }
  public IRepository<CadastralUnit> _cadastralUnitRepository { get; }
  public TaxCalculatorService _taxCaclculatorService { get; }

  public CadastralUnitCreatedTenantHandler(
    IServiceProvider serviceProvider,
    ILogger<CadastralUnitCreatedTenantHandler> logger,
    IRepository<CadastralUnit> cadastralUnitRepository,
    TaxCalculatorService taxCaclculatorService)
  {
    _serviceProvider = serviceProvider;
    _logger = logger;
    _cadastralUnitRepository = cadastralUnitRepository;
    _taxCaclculatorService = taxCaclculatorService;
  }

  protected override async Task HandlePerTenant(CadastralUnitCreatedEvent message)
  {
    var cadastralUnit = await _cadastralUnitRepository
      .AsQueryable(new GetByIdSpec<CadastralUnit>(message.CadastralUnitId), new CadastralUnitIncludeAllSpec())
      .FirstOrDefaultAsync();

    if (cadastralUnit is null)
    {
      _logger.LogWarning("The created cadastral unit with id={id} wasn't found", [message.CadastralUnitId]);
      return;
    }

    var availableCalculatorsConfigs = await _taxCaclculatorService.GetApplicableCalculators(cadastralUnit);
    foreach (var config in availableCalculatorsConfigs)
    {
      await _taxCaclculatorService
        .GetTaxCalculator(config.TaxCalculator)!
        .UpdateAsync(cadastralUnit, CancellationToken.None);
    }
  }
}

