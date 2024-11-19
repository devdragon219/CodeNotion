using System.Globalization;
using Elders.Iso3166;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Localization;
using PdfSharp.Drawing;
using PdfSharp.Drawing.Layout;
using PdfSharp.Pdf;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Extensions;
using RealGimm.Core.Prop.BillAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Resources;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Prop.Services;

public sealed partial class BillPdfGenerator : IPdfGenerator<Bill>
{
  private readonly IConfiguration _configuration;
  private readonly IStringLocalizer<BillPdfGenerator> _localizer;
  private readonly IStringLocalizer<SharedResources> _sharedLocalizer;
  private readonly IReadRepository<BillItemType> _billItemTypeRepository;
  private readonly IReadRepository<EstateUnit> _estateUnitRepository;
  private readonly IReadRepository<VATRate> _vatRateRepository;
  private readonly IReadRepository<Subject> _subjectRepository;

  public BillPdfGenerator(
    IConfiguration configuration,
    IStringLocalizer<BillPdfGenerator> localizer,
    IStringLocalizer<SharedResources> sharedLocalizer,
    IReadRepository<BillItemType> billItemTypeRepository,
    IReadRepository<EstateUnit> estateUnitRepository,
    IReadRepository<VATRate> vatRateRepository,
    IReadRepository<Subject> subjectRepository)
  {
    _configuration = configuration;
    _localizer = localizer;
    _sharedLocalizer = sharedLocalizer;
    _billItemTypeRepository = billItemTypeRepository;
    _estateUnitRepository = estateUnitRepository;
    _vatRateRepository = vatRateRepository;
    _subjectRepository = subjectRepository;
  }

  public async Task<FileCacheEntry> GeneratePdfAsync(Bill bill)
  {
    var document = new PdfDocument();
    var page = document.AddPage();
    var graphics = XGraphics.FromPdfPage(page);

    DrawBill(await SelectBillData(bill), graphics);

    var sharedCacheFilename = Guid.NewGuid().ToString();
    var fileName = _localizer[bill.Contract!.Type.IsActive ? "ActiveBillFileName" : "PassiveBillFileName", bill.InternalCode];
    var fileEntry = new FileCacheEntry(fileName, MimeTypes.PDF, sharedCacheFilename);

    using var stream = File.OpenWrite(Path.Combine(_configuration.CachePath(), sharedCacheFilename));
    document.Save(stream);

    return fileEntry;
  }

  private async Task<BillData> SelectBillData(Bill bill)
  {
    var estateUnitAddress = await _estateUnitRepository
      .AsQueryable(new GetByIdSpec<EstateUnit>(bill.EstateUnitId!.Value))
      .Select(estateUnit => estateUnit.Address)
      .SingleAsync();

    var vatRates = await _vatRateRepository
      .AsQueryable(new GetByIdsSpec<VATRate>(bill.BillRows.Select(row => row.VATRateId).Distinct()))
      .Select(vatRate => new { vatRate.Id, vatRate.RatePercent })
      .ToDictionaryAsync(vatRate => vatRate.Id);

    var transactorSubjectName = await _subjectRepository
      .AsQueryable(new GetByIdSpec<Subject>(bill.TransactorSubjectId))
      .Select(subject => subject.Name)
      .SingleAsync();

    var totalAmount = bill.TotalAmount + bill.BillRows.Sum(row => row.Amount * (decimal)vatRates[row.VATRateId].RatePercent / 100m);

    var rows = bill.BillRows.Select(row =>
    {
      var billItemType = row.ItemType;
      var vatAmount = row.Amount * (decimal)vatRates[row.VATRateId].RatePercent / 100m;

      return new BillRowData(billItemType.Description, row.Amount + vatAmount);
    });

    return new BillData(
      bill.Contract!.Type.IsActive,
      totalAmount,
      bill.Date,
      bill.Until,
      estateUnitAddress,
      transactorSubjectName,
      rows.ToArray());
  }

  private void DrawBill(BillData bill, XGraphics graphics)
  {
    var leftPadding = 30d;
    var rightPadding = 40d;

    var pageWidth = graphics.PageSize.Width;
    var pageHeight = graphics.PageSize.Height;

    var textFormatter = new XTextFormatter(graphics);
    var arialRegular10 = new XFont("Arial", 10d, XFontStyleEx.Regular);
    var arialRegular11 = new XFont("Arial", 11d, XFontStyleEx.Regular);
    var arialRegular12 = new XFont("Arial", 12d, XFontStyleEx.Regular);
    var arialBold12 = new XFont("Arial", 12d, XFontStyleEx.Bold);

    DrawText(
      $"""
      {bill.TransactorSubjectName}
      {bill.EstateUnitAddress.Toponymy}, {bill.EstateUnitAddress.Numbering}
      {bill.EstateUnitAddress.LocalPostCode} {_sharedLocalizer.LocalizeCountry(bill.EstateUnitAddress.CountryISO!).Value}
      """.ToUpperInvariant(),
      arialRegular12,
      x: 314d,
      y: 166d);

    DrawText(
      $"{DateTime.Today.ToDateOnly().ToString("dd/MM/yyyy", CultureInfo.InvariantCulture)}",
      arialRegular12,
      x: leftPadding,
      y: 233d);

    DrawText($"OGGETTO: ", arialBold12, x: leftPadding, y: 261d);
    DrawText($"Invio avviso di pagamento", arialRegular12, x: leftPadding + 66d, y: 261d);

    DrawText(
      $"""
      {GetParagraphIndent()}In allegato si invia {(bill.IsActive ? "l’avviso" : "il mandato")} di pagamento per il versamento del corrispettivo dovuto per l’utilizzazione del civico immobile indicato nel dettaglio sottostante il cui pagamento è da effettuarsi entro il termine di scadenza indicato.
      
      {GetParagraphIndent()}Per le modalità di pagamento, dal mese di gennaio 2020, si prega di attenersi alle indicazioni specificate nella comunicazione allegata.
      """,
      arialRegular11,
      x: leftPadding,
      y: 297d);

    graphics.DrawString(
      "DETTAGLIO BOLLETTA",
      arialBold12,
      XBrushes.Black,
      x: pageWidth / 2d + leftPadding - rightPadding,
      y: 440d,
      XStringFormats.TopCenter);

    DrawText("MESE RIFERIMENTO", arialRegular10, x: leftPadding, y: 470d);
    DrawText(
      CultureInfo.InvariantCulture.TextInfo.ToTitleCase(bill.Date.ToString("MMMM yyyy")),
      arialRegular10,
      x: leftPadding + 150d,
      y: 470d);

    DrawText("SCADENZA", arialRegular10, x: leftPadding, y: 485d);
    DrawText(
      bill.Until.HasValue ? bill.Until.Value.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture) : "-",
      arialRegular10,
      x: leftPadding + 150d,
      y: 485d);

    DrawText("TOTALE", arialRegular10, x: leftPadding, y: 500d);
    DrawText($"{bill.TotalAmount:0.00} €", arialRegular10, x: leftPadding + 150d, y: 500d);

    DrawText("CIVICO IMMOBILE", arialRegular10, x: leftPadding, y: 515d);
    DrawText(
      $"{bill.EstateUnitAddress.Toponymy}, {bill.EstateUnitAddress.Numbering}",
      arialRegular10,
      x: leftPadding + 150d,
      y: 515d);

    for (int i = 0; i < bill.Rows.Length; i++)
    {
      var rowY = 530d + i * 15d;

      DrawText(bill.Rows[i].Name.ToUpperInvariant(), arialRegular10, x: leftPadding + 10d, rowY);

      graphics.DrawString(
        $"{bill.Rows[i].Amount:0.00} €",
        arialRegular10,
        XBrushes.Black,
        x: pageWidth - rightPadding,
        rowY,
        XStringFormats.TopRight);
    }

    void DrawText(string text, XFont font, double x, double y)
    {
      var width = pageWidth - rightPadding - x;
      var height = pageHeight - y;

      textFormatter.DrawString(text, font, XBrushes.Black, new XRect(x, y, width, height));
    }

    string GetParagraphIndent() => new(' ', 11);
  }
}
