using ClosedXML.Excel;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Prop.BillAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Shared.Services;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.Asst.EstateUnitAggregate;
using Microsoft.EntityFrameworkCore;
using Elders.Iso3166;
using RealGimm.SharedKernel;
using RealGimm.Core.Asst.EstateAggregate;
using Address = RealGimm.Core.Asst.EstateAggregate.Address;
using RealGimm.Core.Resources;
using RealGimm.Core.Extensions;

namespace RealGimm.Core.Prop.Services;

public abstract partial class BillExportService<TSelf> : ExportService<Bill, BillExportService<TSelf>.Data, TSelf>
  where TSelf : BillExportService<TSelf>
{
  public required IReadRepository<Subject> _subjectRepository { private get; init; }
  public required IReadRepository<EstateUnit> _estateUnitRepository { private get; init; }

  protected override async Task<IList<Data>> SelectItemsAsync(
    IEnumerable<Bill> entities,
    CancellationToken cancellationToken = default)
  {
    var managementSubjectsNames = await _subjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(entities
        .Where(bill => bill.Contract is not null)
        .Select(bill => bill.Contract!.ManagementSubjectId)
        .Distinct()))
      .Select(subject => new { subject.Id, subject.Name })
      .ToDictionaryAsync(subject => subject.Id, subject => subject.Name, cancellationToken);

    var counterpartSubjectsNames = await _subjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(entities.Select(bill => bill.MainCounterpartSubjectId).Distinct()))
      .Select(subject => new { subject.Id, subject.Name })
      .ToDictionaryAsync(subject => subject.Id, subject => subject.Name, cancellationToken);

    var transactorSubjectsNames = await _subjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(entities.Select(bill => bill.TransactorSubjectId).Distinct()))
      .Select(subject => new { subject.Id, subject.Name })
      .ToDictionaryAsync(subject => subject.Id, subject => subject.Name, cancellationToken);
    
    var estateUnits = await _estateUnitRepository
      .AsQueryable(new GetByIdsSpec<EstateUnit>(entities
        .Where(bill => bill.EstateUnitId.HasValue)
        .Select(bill => bill.EstateUnitId!.Value)
        .Distinct()))
      .Select(estateUnit => new { estateUnit.Id, estateUnit.InternalCode, estateUnit.Address })
      .ToDictionaryAsync(estateUnit => estateUnit.Id, cancellationToken);

    return entities
      .Select(bill =>
      {
        var currentEstateUnit = bill.EstateUnitId is null
          ? null
          : estateUnits[bill.EstateUnitId.Value];

        return new Data(
          bill,
          bill.Contract is null ? null : managementSubjectsNames[bill.Contract.ManagementSubjectId],
          counterpartSubjectsNames[bill.MainCounterpartSubjectId],
          transactorSubjectsNames[bill.TransactorSubjectId],
          currentEstateUnit is null ? null : (currentEstateUnit.InternalCode, currentEstateUnit.Address));
      })
      .ToList();
  }

  protected override void FormatWorksheet(IXLWorksheet worksheet)
  {
    var columnToFormat = worksheet.RangeUsed()!.AsTable().FindColumn(e => e.FirstCell().Value.ToString() == Localizer[nameof(Bill.TotalAmount)].Value);
    columnToFormat.Style.NumberFormat.Format = Constants.EXPORT_NUMBERFORMAT_CURRENCY;
    
    base.FormatWorksheet(worksheet);
  }

  protected override Dictionary<string, Func<Data, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<Data, XLCellValue>>()
    {
      [nameof(Bill.IsTemporary)] = data
        => data.Bill.IsTemporary
          ? Localizer["Temporary"].Value
          : Localizer["NonTemporary"].Value,

      [$"{nameof(Bill.Contract)}.{nameof(Contract.InternalCode)}"] =
        data => data.Bill.Contract?.InternalCode,

      ["ManagementSubjectName"] = data
        => data.ManagementSubjectName,

      ["CountepartName"] = data
        => data.CountepartSubjectName,

      [nameof(Bill.Year)] = data
        => data.Bill.Year,

      [$"{nameof(Bill.Contract)}.{nameof(Contract.Type)}"] =
        data => data.Bill.Contract?.Type.Description,

      [nameof(Bill.IsInvoiced)] = data
        => LocalizeBool(data.Bill.IsInvoiced),

      ["EstateUnitInternalCode"] = data
        => data.EstateUnit?.InternalCode,

      ["EstateUnitAddress"] = data
        => data.EstateUnit.HasValue
            ? FormatAddress(data.EstateUnit.Value.Address)
            : null,

      [nameof(Bill.ContractBillingPeriod)] = data
        => LocalizeEnumValue(data.Bill.ContractBillingPeriod),

      [nameof(Bill.IsOccupiedWithoutRight)] = data
        => LocalizeBool(data.Bill.IsOccupiedWithoutRight),

      [nameof(Bill.Date)] = data
        => data.Bill.Date.ToString(),

      [nameof(Bill.Since)] = data
        => data.Bill.Since.ToString(),

      [nameof(Bill.Until)] = data
        => data.Bill.Until.ToString(),

      [nameof(Bill.TransactorPaymentType)] = data
        => LocalizeEnumValue(data.Bill.TransactorPaymentType),

      ["InvoiceRecipient"] = data
        => data.TransactorSubjectName,

      [nameof(Bill.EmissionType)] = data
        => LocalizeEnumValue(data.Bill.EmissionType),

      [nameof(Bill.TotalAmount)] = data
        => data.Bill.TotalAmount,
    };

  private string FormatAddress(Address address)
    => $"{address.Toponymy}, {address.Numbering} - {address.LocalPostCode} - {SharedLocalizer.LocalizeCountry(address.CountryISO!).Value}";
}
