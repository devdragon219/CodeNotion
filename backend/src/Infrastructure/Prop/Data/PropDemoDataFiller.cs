using Bogus;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Prop.AdministrationTermAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Infrastructure.Anag.Data;
using RealGimm.Infrastructure.Asst.Data;
using RealGimm.Infrastructure.Common.Data;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.SharedKernel;

namespace RealGimm.Infrastructure.Prop.Data;

public class PropDemoDataFiller : DemoDataFillerBase<PropDbContext, PropDemoDataFiller>
{
  private static readonly Faker<TermInstallment> _fakerInstallments = new Faker<TermInstallment>().UseSeed(0);
  private readonly PropDbContext _context;
  private readonly AnagDbContext _anagContext;
  private readonly AsstDbContext _asstContext;
  private readonly CommonDbContext _commonContext;

  public override int ExecutionOrder => 11;

  public PropDemoDataFiller(
    ILogger<PropDemoDataFiller> logger,
    PropDbContext context,
    AnagDbContext anagContext,
    AsstDbContext asstContext,
    CommonDbContext commonContext)
    : base(context, logger)
  {
    _context = context;
    _anagContext = anagContext;
    _asstContext = asstContext;
    _commonContext = commonContext;
  }

  public override async Task FillAsync(bool shortData, CancellationToken cancellationToken)
  {
    await FillBillItemTypeAsync(cancellationToken);
    
    await CreateTermInstallmentAsync();

    await FillContractTypesAsync(shortData ? 10 : 30, cancellationToken);
    await FillContractsAsync(shortData ? 30 : 100, cancellationToken);
    await FillRegistrationPaymentsAsync(shortData ? 30 : 100, cancellationToken);
    await FillAdministrationsAsync(shortData ? 30 : 100, cancellationToken);
    await FillAdministrationTermsAsync(shortData ? 30 : 100, cancellationToken);
    await FillRegistryCommunicationsAsync(shortData ? 30 : 100, cancellationToken);
  }

  private async Task FillBillItemTypeAsync(CancellationToken cancellationToken)
  {
    var billItemTypeData = new (string InternalCode, string Description, bool IsForContractFee, bool IsForContractCosts, bool IsForAdministration, bool IsPositive, bool IsForTax, string ActiveSubjectVR, string ActiveExemptVR, string ActiveNonTaxableVR, string PassiveSubjectVR, string PassiveExemptVR, string PassiveNonTaxableVR)[]
    {
      ("VB001", "Canone", true, false, false, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB002", "Acconto Morosità", false, true, false, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB003", "Accredito Spese Amm.Ne", false, true, true, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB004", "Aggiornamento Montante Istat", false, true, false, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB005", "Lavori Straord. Imm. Alienati", false, true, false, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB006", "Morosità Dilazionata", false, true, false, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB007", "Penale", false, true, false, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB008", "Prev. Spese Amministrazione", false, true, false, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB009", "Prev. Spese Amministrazione", false, true, false, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB010", "Spese Amm.Ne Forfettarie", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB011", "Recupero Esenzione Istat", false, true, false, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB012", "Recupero Spese Amministrazione", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB013", "Recupero Spese Sgombero", false, true, false, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB014", "Residuo Prezzo di Vendita", false, true, false, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB015", "Restituzione Somme Pagate", false, true, false, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB016", "Variazione Canone", false, true, false, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB017", "Rifusione Canone", false, true, false, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB018", "Rimborso Lavori Eseguiti", false, true, true, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB019", "Rimborso Manutenzione Straord.", false, true, true, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB020", "Rimborso Spese Postali", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB021", "Rimborso Somme in Eccedenza", false, true, true, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB022", "Rimborsi Vari", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB023", "Ripartizione Quote Pregresse", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB024", "Rimborso Canone", false, true, false, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB025", "Saldo Spese Amministrazione", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB026", "Arretrati Canone", false, true, false, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB027", "Saldo Spese Amministrazione", false, true, true, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB028", "Sanzione Imposta di Registro", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB029", "Spese Amministrazione/Utenze", false, false, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB030", "Spese Di Notifica", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB031", "Spese Forfettarie", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB032", "Spese Forfettarie", false, true, true, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB033", "Spese Straordinarie", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB034", "Spese Straordinarie", false, true, true, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB035", "Split Payment", false, true, true, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB036", "Arretrati Indennità di Occupazione", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB037", "Split Payment", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB038", "Bollo (Fatturazione Elettronica)", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB039", "Saldo Cartella Esattoriale", false, true, false, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB040", "Inter. Mancati/Rit. Pagamenti", false, true, true, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB041", "Addebito Rimborso Danni", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB042", "Anticipazione Canone", false, true, false, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB043", "Arretrati Spese Straordinarie", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB044", "Iva su Bollette", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB045", "Arrotondamento Precedente", false, true, true, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB046", "Arrotondamento Registro", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB047", "Canone  Ivato", true, false, false, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB048", "Cong Bolli Contr Fisiche", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB049", "Cong Bolli Contr Virtuali", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB050", "Arretrati Spese Amm.Ne", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB051", "Conguaglio Euro", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB052", "Conguaglio Spese Straordinarie", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB053", "Imposta di Registro", false, true, false, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB054", "Iva su Bollette", false, false, true, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB055", "Diritti di Segreteria", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB056", "Arrotondamento Attuale", false, true, true, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB057", "Anticipazione Canone per Morosità", false, true, false, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB058", "Spese Straordinarie per Morosità", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB059", "Spese Straordinarie per Morosità", false, true, true, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB060", "Canone per Morosità", false, true, false, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB061", "Bollo Su Bollette per Morosità", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB062", "Bollo Su Bollette per Morosità", false, true, true, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB063", "Rimborso Spese in Eccedenza", false, true, true, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB064", "Ripartizione Quote Pregresse", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB065", "Rimborso Lavori Eseguiti", false, true, true, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB066", "Recupero Canone", false, true, false, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB067", "Arrotondamento Precedente", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB068", "Canone Passivo", true, false, false, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB069", "Deposito Cauzione", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB070", "Can. Infr. Locazioni", true, false, false, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB071", "Aggiornamento Istat", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB072", "Cong. Can. Infr. Locazioni", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB073", "Arr. Can. Infr. Locazioni", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB074", "Can. Infr. Sublocazioni", true, false, false, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB075", "Cong. Can. Infr. Sublocazioni", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB076", "Arr. Can. Infr. Sublocazioni", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB077", "Iva (Fatturazione Elettronica)", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB078", "Arr. Istat Infr. Locazioni", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB079", "Arr. Istat Infr. Subloc.", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB080", "Agg. Istat Infr. Locazioni", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB081", "Arretrato Istat", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB082", "Agg. Istat Infr. Subloc.", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB083", "Occ. Senza Titolo Infr. Locazioni", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB084", "Occ. Senza Titolo Infr. Subloc.", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB085", "Anticipazione Canone", false, true, false, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB086", "Indennità di Occupazione", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB087", "Imposta di Registro", false, true, false, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB088", "Occupazione Senza Titolo", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB089", "Bollo Su Bollette", false, true, true, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB090", "Bolli Contrattuali", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB091", "Bolli Contrattuali", false, true, true, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB092", "Marche Registro", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB093", "Bolli Contrattuali Iva", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB094", "Bollo Su Bollette", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB095", "Deposito Cauzione", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB096", "Diritti di Segreteria", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB097", "Diritti di Segreteria", false, true, true, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB098", "Interessi Cauzione", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB099", "Imposta Registro Iva", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB100", "Indennità di Occupazione", false, true, true, false, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB101", "Ind. Occup. Risarcimento Danni", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB102", "Interesse di Dilazione", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
      ("VB103", "Inter. Mancati/Rit. Pagamenti", false, true, true, true, false, "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE", "IVA 22%", "ESENTE DA I.V.A.", "NON IMPONIBILE"),
    };

    var vatRates = await _commonContext.VATRates
      .AsQueryable()
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .ToListAsync(cancellationToken);

    var faker = new Faker { Random = new Randomizer(localSeed: 0) };

    var billItemTypes = billItemTypeData.Select(data =>
    {
      var billItemType = new BillItemType();
      billItemType.SetInternalCode(data.InternalCode);
      
      billItemType.SetData(
        data.Description,
        data.IsForContractFee,
        data.IsForContractCosts,
        data.IsForAdministration,
        data.IsPositive,
        data.IsForTax);
      
      billItemType.SetVatRates(
        vatRates.Single(vatRate => vatRate.Description == data.ActiveSubjectVR),
        vatRates.Single(vatRate => vatRate.Description == data.ActiveExemptVR),
        vatRates.Single(vatRate => vatRate.Description == data.ActiveNonTaxableVR),
        vatRates.Single(vatRate => vatRate.Description == data.PassiveSubjectVR),
        vatRates.Single(vatRate => vatRate.Description == data.PassiveExemptVR),
        vatRates.Single(vatRate => vatRate.Description == data.PassiveNonTaxableVR),
        administrationVR: faker.PickRandom(vatRates));

      return billItemType;
    });

    Context.BillItemTypes.AddRange(billItemTypes);
    await Context.SaveChangesAsync(cancellationToken);
  }

  private async Task FillContractTypesAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
  {
    var usageTypeRepo = new AsstEfRepository<EstateUsageType>(_asstContext);

    await FillEntitiesAsync(new ContractTypeFaker()
    {
      UsageTypes = await usageTypeRepo.AsQueryable().ToListAsync(cancellationToken)
    },
      entitiesToGenerateCount,
      cancellationToken);
  }

  private async Task FillContractsAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
  {
    var subjectsIds = await _anagContext.Subjects
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .Select(subject => subject.Id)
      .ToListAsync(cancellationToken);

    var citiesIds = await _commonContext.Cities
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .Select(city => city.Id)
      .ToListAsync(cancellationToken);

    var estateUnits = await _asstContext.EstateUnits
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .Where(estateUnit => estateUnit.EstateSubUnits.Any())
      .Select(estateUnit => new
      {
        estateUnit.Id,
        estateUnit.ManagementSubjectId,
        SubUnitIds = estateUnit.EstateSubUnits.Select(subUnit => subUnit.Id)
      })
      .ToListAsync(cancellationToken);

    var managementSubjectsIds = await _anagContext.Subjects
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .OfType<ManagementSubject>()
      .Where(subject => estateUnits.Select(estateUnit => estateUnit.ManagementSubjectId).Contains(subject.Id))
      .Select(subject => subject.Id)
      .ToListAsync(cancellationToken);

    var billItemTypes = await _context.BillItemTypes
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .ToListAsync(cancellationToken);

    var accountingItemsIds = await _commonContext.AccountingItems
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .Select(accountingItem => accountingItem.Id)
      .ToListAsync(cancellationToken);

    var vatRatesIds = await _commonContext.VATRates
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .Select(vatRate => vatRate.Id)
      .ToListAsync(cancellationToken);

    var subjectsWithAddresses = await _anagContext.Subjects
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .Select(subject => new
      {
        subject.Id,
        Addresses = subject.Addresses.Where(address => address.AddressType != AddressType.BirthLocation)
      })
      .ToDictionaryAsync(
        subject => subject.Id,
        subjectsIds => subjectsIds.Addresses.Select(address => address.Id),
        cancellationToken);

    var subjectsWithBankAccounts = await _anagContext.Subjects
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .Select(subject => new { subject.Id, subject.BankAccounts })
      .Where(subject => subject.BankAccounts.Any())
      .ToDictionaryAsync(
        subject => subject.Id,
        subject => subject.BankAccounts.Select(bankAccount => bankAccount.Id),
        cancellationToken);

    var registrationFaker = new RegistrationTaxFaker()
    {
      RegistrationOffices = await _context.RegistrationOffices.ToListAsync(cancellationToken)
    };

    var contractFaker = new ContractFaker()
    {
      BillItemTypes = billItemTypes,
      LocatedUnitFakerFactory = (managementSubjectId, isActiveContract) => new LocatedUnitFaker
      {
        EstateSubUnitsByUnitsIds = estateUnits
          .Where(estateUnit => estateUnit.ManagementSubjectId == managementSubjectId)
          .ToDictionary(estateUnit => estateUnit.Id, estateUnit => estateUnit.SubUnitIds),
        IsActiveContract = isActiveContract
      }
    }
      .UseManagementSubjectsIds(managementSubjectsIds)
      .UseContractTypes(Context.ContractTypes.Local)
      .UseRevolutionFaker(new RevaluationFaker())
      .UseRatePlanFaker(new RatePlanFaker())
      .UseBillingPauseFaker(new BillingPauseFaker())
      .UseTransactorFaker(new TransactorFaker() { SubjectsWithAddresses = subjectsWithAddresses })
      .UseSecurityDepositFaker(new SecurityDepositFaker() { SubjectsWithBankAccounts = subjectsWithBankAccounts })

      .UseRegistrationTaxFaker(registrationFaker
        .UseCitiesIds(citiesIds)
        .UseSubjectsIds(subjectsIds))

      .UseCounterpartFaker(new CounterpartFaker()
        .UseSubjectsIds(subjectsIds))

      .UseTakeoverFaker(new TakeoverFaker()
        .UseSubjectsIds(subjectsIds))

      .UseOneshotAdditionFaker(new OneshotAdditionFaker()
        .UseBillItemTypes(billItemTypes)
        .UseAccountingItemsIds(accountingItemsIds)
        .UseVATRatesIds(vatRatesIds))

      .UseRecurringAdditionFaker(new RecurringAdditionFaker()
        .UseBillItemTypes(billItemTypes)
        .UseAccountingItemsIds(accountingItemsIds)
        .UseVATRatesIds(vatRatesIds));

    await FillEntitiesAsync(contractFaker, entitiesToGenerateCount, cancellationToken);
  }

  private async Task FillRegistrationPaymentsAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
  {
    var faker = new RegistrationPaymentFaker
    {
      Contracts = Context.Contracts.Local
    };

    await FillEntitiesAsync(faker, entitiesToGenerateCount, cancellationToken);
  }

  private async Task FillAdministrationsAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
  {
    var subjects = await _anagContext.Subjects.TagWith(Constants.SKIP_ACCESS_FILTER).ToListAsync(cancellationToken);
    var estatesIds = await _asstContext.Estates.TagWith(Constants.SKIP_ACCESS_FILTER).Select(es => es.Id).ToListAsync(cancellationToken);
    var faker = new AdministrationFaker
    {
      Subjects = subjects,
      EstatesIds = estatesIds
    };

    await FillEntitiesAsync(faker, entitiesToGenerateCount, cancellationToken);
  }

  private async Task FillAdministrationTermsAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
  {
    var administrations = await _context.Administrations.TagWith(Constants.SKIP_ACCESS_FILTER).ToListAsync(cancellationToken);

    var faker = new AdministrationTermFaker
    {
      Administrations = administrations,
      FakerInstallment = _fakerInstallments
    };

    await FillEntitiesAsync(faker, entitiesToGenerateCount, cancellationToken);
  }

  private async Task FillRegistryCommunicationsAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
  {
    var managementSubjects = await _anagContext.Subjects
      .Include(subject => subject.Addresses)
      .Include(subject => subject.BankAccounts)
      .Include(subject => subject.RelationMains)
        .ThenInclude(relation => relation.Subordinate)
      .OfType<ManagementSubject>()
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .ToListAsync(cancellationToken);

    var legalRepresentativeSubjects = await _anagContext.Subjects
      .Include(subject => subject.BankAccounts)
      .OfType<PhysicalSubject>()
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .ToListAsync(cancellationToken);

    var estateUnits = await _asstContext.EstateUnits
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .ToListAsync(cancellationToken);

    var faker = new RegistryCommunicationFaker
    {
      Contracts = Context.Contracts.Local,
      ManagementSubjects = managementSubjects,
      LegalRepresentativeSubjects = legalRepresentativeSubjects,
      EstateUnits = estateUnits
    };

    await FillEntitiesAsync(faker, entitiesToGenerateCount, cancellationToken);
  }

  private async Task CreateTermInstallmentAsync()
  {
    var billItemTypes = await _context.BillItemTypes
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .ToListAsync();

    _fakerInstallments.CustomInstantiator(faker =>
    {
      var termInstallment = new TermInstallment();
      termInstallment.SetInstallmentNumber(faker.Random.Int(1, 9));
      termInstallment.SetAmount(faker.Random.Decimal());

      termInstallment.SetSince(faker.Date.PastDateOnly(refDate: new DateOnly(2024, 02, 01)));
      termInstallment.SetUntil(faker.Date.FutureDateOnly(refDate: new DateOnly(2024, 04, 01)));
      termInstallment.SetDueDate(faker.Date.BetweenDateOnly(start: new DateOnly(2024, 03, 01), end: new DateOnly(2024, 04, 01)));

      termInstallment.SetBillItemType(faker.PickRandom(billItemTypes));
      termInstallment.SetNotes(faker.Lorem.Word());

      return termInstallment;
    });

    _fakerInstallments.FinishWith((faker, administrationTerm) =>
    {
      var validationErrors = administrationTerm.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(AdministrationTerm)} entity! Errors: {errorMessages}");
      }
    });
  }
}
