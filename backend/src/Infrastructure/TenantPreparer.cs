using RealGimm.Infrastructure.Anag.Data;
using RealGimm.Infrastructure.Asst.Data;
using RealGimm.Infrastructure.Common.Data;
using RealGimm.Infrastructure.Prop.Data;
using RealGimm.Infrastructure.IAM.Data;
using RealGimm.SharedKernel.Interfaces;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Infrastructure.Econ.Data;
using RealGimm.Infrastructure.Nrgy.Data;
using RealGimm.Infrastructure.Fclt.Data;

namespace RealGimm.Infrastructure;

public class TenantPreparer : ITenantPreparer
{
  private readonly ILogger<TenantPreparer> _logger;
  private readonly CommonDbContext _commonContext;
  private readonly AnagDbContext _anagContext;
  private readonly IAMDbContext _iamContext;
  private readonly PropDbContext _propContext;
  private readonly AsstDbContext _asstContext;
  private readonly EconDbContext _econContext;
  private readonly NrgyDbContext _nrgyContext;
  private readonly FcltDbContext _fcltContext;
  private readonly MigrationService _migrationService;
  private readonly IServiceProvider _serviceProvider;

  public TenantPreparer(ILogger<TenantPreparer> logger,
    CommonDbContext commonContext,
    AnagDbContext anagContext,
    IAMDbContext iamContext,
    PropDbContext propContext,
    AsstDbContext asstContext,
    EconDbContext econContext,
    NrgyDbContext nrgyContext,
    FcltDbContext fcltContext,
    MigrationService migrationService,
    IServiceProvider serviceProvider
  )
  {
    _logger = logger;
    _commonContext = commonContext;
    _anagContext = anagContext;
    _iamContext = iamContext;
    _propContext = propContext;
    _asstContext = asstContext;
    _econContext = econContext;
    _nrgyContext = nrgyContext;
    _fcltContext = fcltContext;
    _migrationService = migrationService;
    _serviceProvider = serviceProvider;
  }

  public async Task PrepareAsync(CancellationToken cancellationToken)
  {
    if (_commonContext.Database.IsInMemory())
    {
      await _commonContext.Database.EnsureCreatedAsync(cancellationToken);
      return;
    }

    await _migrationService.Setup(_commonContext);

    await Task.WhenAll(
      _migrationService.Migrate(_commonContext, cancellationToken),
      _migrationService.Migrate(_anagContext, cancellationToken),
      _migrationService.Migrate(_iamContext, cancellationToken),
      _migrationService.Migrate(_propContext, cancellationToken),
      _migrationService.Migrate(_asstContext, cancellationToken),
      _migrationService.Migrate(_econContext, cancellationToken),
      _migrationService.Migrate(_nrgyContext, cancellationToken),
      _migrationService.Migrate(_fcltContext, cancellationToken)
    );
  }

  public async Task FillWithDemoDataAsync(bool shortData, CancellationToken cancellationToken)
  {
    foreach (var demoDataFillerGroup in _serviceProvider
      .GetServices<IDemoDataFiller>()
      .GroupBy(s => s.ExecutionOrder)
      .OrderBy(grp => grp.Key))
    {
      // in order to prevent race conditions, we need to run the fillers sequentially
      foreach (var filler in demoDataFillerGroup)
      {
        await filler.FillAsync(shortData, cancellationToken);
      }
    }
  }
}
