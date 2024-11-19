using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using RealGimm.Core.Mtnt.Interfaces;
using RealGimm.Core.Common.TaxConfigAggregate;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Taxes;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Taxes.Interfaces;

namespace RealGimm.Core.Common;

public class CommonDataSeeder : IModuleDataSeeder
{
  private readonly ILogger<CommonDataSeeder> _log;
  private readonly IRepository<TaxConfig> _taxConfiguration;
  private readonly IRepository<AccountingItem> _accountingItems;
  private readonly IEnumerable<ITaxCalculator> _taxCalculators;
  private readonly TaxCalculatorService _tcService;
  private readonly IStringLocalizer _localizer;

  public CommonDataSeeder(
      ILogger<CommonDataSeeder> log,
      IRepository<TaxConfig> taxConfiguration,
      IRepository<AccountingItem> accountingItems,
      IEnumerable<ITaxCalculator> taxCalculators,
      TaxCalculatorService tcService,
      IStringLocalizer localizer
  )
  {
    _log = log;
    _localizer = localizer;
    _taxConfiguration = taxConfiguration;
    _accountingItems = accountingItems;
    _taxCalculators = taxCalculators;
    _tcService = tcService;
  }

  public async Task InitializeAsync()
  {
    if (await _taxConfiguration.CountAsync() > 0)
    {
      //Skip
      _log.LogInformation("Not running data seeder on already-initialized repository.");
      return;
    }

    _log.LogInformation("Adding default tax configuration values...");
    await FixTaxConfiguration();

    _log.LogInformation("Adding default accounting items...");
    await FixAccountingItems();
  }

  public async Task UpdateAsync()
  {
    await FixTaxConfiguration();
    await FixAccountingItems();
  }

  private async Task FixAccountingItems()
  {
    //Add any missing accounting items
    if(await _accountingItems.AnyAsync()) {
      return;
    }

    var defaultPayablesAccount = new AccountingItem();
    defaultPayablesAccount.SetDescription(_localizer["SharedResources.DefaultAccountingItem.Payables"]);
    defaultPayablesAccount.SetCodes("PAY001", "0101001");
    
    var defaultReceivablesAccount = new AccountingItem();
    defaultReceivablesAccount.SetDescription(_localizer["SharedResources.DefaultAccountingItem.Receivables"]);
    defaultReceivablesAccount.SetCodes("REC001", "0201001");

    await _accountingItems.AddRangeAsync([
      defaultPayablesAccount,
      defaultReceivablesAccount
    ]);
  }

  private async Task FixTaxConfiguration()
  {
    //Replicate any already present configuration from previous year, if applicable
    await _tcService.DuplicateYearlyConfiguration(CancellationToken.None);

    //Add any missing configuration, per calculator
    foreach (var taxCalculator in _taxCalculators)
    {
      //Add any missing years back for this calculator
      await taxCalculator.FixDataSeedAsync();
    }
  }
}
