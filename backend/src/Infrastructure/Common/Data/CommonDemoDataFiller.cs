using Microsoft.Extensions.Logging;
using RealGimm.Infrastructure.Common.Data.Fakers;
using RealGimm.Core.Common.AccountingItemAggregate;
using Humanizer;
using Bogus;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core;
using RealGimm.Core.Common.VATRateAggregate;

namespace RealGimm.Infrastructure.Common.Data;

public class CommonDemoDataFiller : DemoDataFillerBase<CommonDbContext, CommonDemoDataFiller>
{
  public override int ExecutionOrder => 10;

  public CommonDemoDataFiller(
    CommonDbContext context,
    ILogger<CommonDemoDataFiller> logger)
    : base(context, logger)
  {
  }

  public override async Task FillAsync(bool shortData, CancellationToken cancellationToken)
  {
    await FillVATRatesAsync(cancellationToken);
    await FillAccountingItemAsync(cancellationToken);
  }

  private async Task FillVATRatesAsync(CancellationToken cancellationToken)
  {
    var vatRateData = new (string InternalCode, string Description, double RatePercent, VATRateType Type)[]
    {
      ("001", "IVA 10% (N.127 - TER TAB A PARTE III DPR 633)", 10, VATRateType.Rate),
      ("002", "IVA 21%", 21, VATRateType.Rate),
      ("003", "IVA 22%", 22, VATRateType.Rate),
      ("004", "ESENTE DA I.V.A.AI SENSI ART.6 L.133/99", 0, VATRateType.Exempt),
      ("005", "ESENTE DA I.V.A.AI SENSI ART.10 D.P.R. 633 DEL 26/10/1972", 0, VATRateType.Exempt),
      ("006", "ESENTE DA I.V.A.", 0, VATRateType.Exempt),
      ("007", "NON IMP. AI SENSI ART.8 D.P.R. 633 DEL 26/10/1972", 0, VATRateType.NonTaxable),
      ("008", "NON IMPONIBILE", 0, VATRateType.NonTaxable)
    };

    var vatRates = vatRateData.Select(data =>
    {
      var vatRate = new VATRate();
      vatRate.SetDescription(data.Description);
      vatRate.SetRatePercent(data.RatePercent);
      vatRate.SetType(data.Type);
      vatRate.SetInternalCode(data.InternalCode);

      return vatRate;
    });

    Context.Set<VATRate>().AddRange(vatRates);
    await Context.SaveChangesAsync(cancellationToken);
  }

  private async Task FillAccountingItemAsync(CancellationToken cancellationToken)
  {
    var accountingItemsDescriptions = new string[]
    {
      "Affitti attivi",
      "Rendite da locazione",
      "Proventi da servizi",
      "Contributi e finanziamenti",
      "Affitti passivi",
      "Spese di manutenzione ordinaria",
      "Spese di manutenzione straordinaria",
      "Assicurazioni",
      "Imposte e tasse",
      "Spese di gestione amministrativa",
      "Spese di vigilanza e sicurezza",
      "Spese condominiali",
      "Spese per utenze",
      "Spese legali e contenziosi",
      "Spese marketing",
      "Ammortamenti",
      "Spese per attrezzature e arredi",
      "Accantonamenti per rischi e oneri",
      "Ricavi e oneri finanziari",
      "Accantonamenti per fondo manutenzione",
      "Plusvalenza da vendita immobili"
    };

    var faker = new Faker { Random = new Randomizer(localSeed: 0) };

    var accountingItems = accountingItemsDescriptions.Select((description, index) =>
    {
      var accountingItem = new AccountingItem();
      accountingItem.SetDescription(description);
      
      accountingItem.SetCodes(
        internalCode: (index + 1).ToString().PadLeft(3, '0'),
        externalCode: faker.Random.AlphaNumeric(9).ToUpperInvariant());

      return accountingItem;
    });

    await Context.Set<AccountingItem>().AddRangeAsync(accountingItems, cancellationToken);
    await Context.SaveChangesAsync(cancellationToken);

    Logger.LogInformation("{entity} added", typeof(AccountingItem).Name.Humanize().Pluralize());
  }
}
