using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Core.Shared.Services;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.Core.Fclt.Services;

/// <summary>
/// "Fclt" prefix is required in order to avoid duplicate translation keys.
/// </summary>
public sealed class FcltContractExportService : ExportService<Contract, FcltContractExportService.Data, FcltContractExportService>
{
  private readonly IReadRepository<Subject> _subjectRepository;

  public FcltContractExportService(IReadRepository<Subject> subjectRepository)
  {
    _subjectRepository = subjectRepository;
  }

  protected override Dictionary<string, Func<Data, XLCellValue>> CreateExcelDataSelector()
    => new()
    {
      [nameof(Data.InternalCode)] = data => data.InternalCode,
      [nameof(Data.Type)] = data => data.Type,
      [nameof(Data.EntryStatus)] = data => data.EntryStatus,
      [nameof(Data.Provider)] = data => data.Provider,
      [nameof(Data.Description)] = data => data.Description,
      [nameof(Data.AgreementDate)] = data => data.AgreementDate,
      [nameof(Data.EffectiveDate)] = data => data.EffectiveDate,
      [nameof(Data.ExpirationDate)] = data => data.ExpirationDate
    };

  protected override async Task<IList<Data>> SelectItemsAsync(
    IEnumerable<Contract> contracts,
    CancellationToken cancellationToken = default)
  {
    var supplierSubjects = await _subjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(contracts.Select(contract => contract.ProviderSubjectId).Distinct()))
      .Select(subject => new { subject.Id, subject.Name })
      .ToDictionaryAsync(subject => subject.Id, cancellationToken);

    return contracts
      .Select(contract => new Data
      {
        InternalCode = contract.InternalCode,
        Type = contract.Type.Name,
        EntryStatus = LocalizeEnumValue(contract.EntryStatus),
        Provider = supplierSubjects[contract.ProviderSubjectId].Name,
        Description = contract.Description,
        AgreementDate = contract.AgreementDate?.ToShortDateString(),
        EffectiveDate = contract.EffectiveDate.ToShortDateString(),
        ExpirationDate = contract.ExpirationDate.ToShortDateString()
      })
      .ToList();
  }

  public record Data
  {
    public required XLCellValue InternalCode { get; init; }
    public required XLCellValue Type { get; init; }
    public required XLCellValue EntryStatus { get; init; }
    public required XLCellValue Provider { get; init; }
    public required XLCellValue Description { get; init; }
    public required XLCellValue AgreementDate { get; init; }
    public required XLCellValue EffectiveDate { get; init; }
    public required XLCellValue ExpirationDate { get; init; }
  }
}
