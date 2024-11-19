using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;
using RealGimm.Core.Shared.Services;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.Core.Prop.Services;

public sealed partial class ConfirmedRegistryCommunicationGroupExportService : ExportService<RegistryCommunicationGroup, ConfirmedRegistryCommunicationGroupExportService.Data, ConfirmedRegistryCommunicationGroupExportService>
{
  private readonly IRepository<Subject> _subjectRepository;

  public ConfirmedRegistryCommunicationGroupExportService(IRepository<Subject> subjectRepository)
  {
    _subjectRepository = subjectRepository;
  }

  protected override Dictionary<string, Func<Data, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<Data, XLCellValue>>()
    {
      [nameof(Data.ManagementSubjectName)] = data
        => data.ManagementSubjectName,

      [nameof(Data.IsActiveContract)] = data
        => data.IsActiveContract ? Localizer["ActiveContract"].Value : Localizer["PassiveContract"].Value,

      [nameof(Data.CommunicationType)] = data
        => LocalizeEnumValue(data.CommunicationType),

      [nameof(Data.EndDate)] = data
        => data.EndDate?.ToString(),
      
      [nameof(Data.Date)] = data
        => data.Date.ToString(),

      [nameof(Data.RequestingSubjectLegalRepresentativeName)] = data
        => data.RequestingSubjectLegalRepresentativeName,

      [nameof(Data.DebtBankAccountReferenceCode)] = data
        => data.DebtBankAccountReferenceCode,

      [nameof(Data.DebtAmount)] = data
        => data.DebtAmount,

      [nameof(Data.HasAnomalies)] = data
        => LocalizeBool(data.HasAnomalies),
    };

  protected override async Task<IList<Data>> SelectItemsAsync(
    IEnumerable<RegistryCommunicationGroup> entities,
    CancellationToken cancellationToken = default)
  {
    var managementSubjects = await _subjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(entities.Select(entity => entity.Id.ManagementSubjectId)))
      .Select(subject => new
      {
        subject.Id,
        subject.Name,
        BankAccountReferenceCode = subject.BankAccounts
          .First(bankAccount => entities
            .Select(entity => entity.Id.DebtBankAccountId)
            .Any(bankAccountId => bankAccount.Id == bankAccountId))
          .ReferenceCode!,
      })
      .ToDictionaryAsync(subject => subject.Id, cancellationToken);

    var legalRepresentativeSubjectNames = await _subjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(entities.Select(entity => entity.Id.RequestingSubjectLegalRepresentativeId!.Value)))
      .Select(subject => new { subject.Id, subject.Name, })
      .ToDictionaryAsync(subject => subject.Id, subject => subject.Name, cancellationToken);

    return entities
      .Select(entity => new Data
      {
        ManagementSubjectName = managementSubjects[entity.Id.ManagementSubjectId].Name,
        IsActiveContract = entity.Id.IsActiveContract,
        CommunicationType = entity.Id.CommunicationType,
        EndDate = entity.Id.EndDate,
        Date = entity.Id.Date!.Value,
        RequestingSubjectLegalRepresentativeName = legalRepresentativeSubjectNames[entity.Id.RequestingSubjectLegalRepresentativeId!.Value],
        DebtBankAccountReferenceCode = managementSubjects[entity.Id.ManagementSubjectId].BankAccountReferenceCode,
        DebtAmount = entity.DebtAmount,
        HasAnomalies = entity.HasAnomalies,
      })
      .ToList();
  }
}
