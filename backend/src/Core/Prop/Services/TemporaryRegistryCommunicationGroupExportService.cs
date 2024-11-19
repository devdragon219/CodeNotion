using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;
using RealGimm.Core.Shared.Services;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.Core.Prop.Services;

public sealed partial class TemporaryRegistryCommunicationGroupExportService : ExportService<RegistryCommunicationGroup, TemporaryRegistryCommunicationGroupExportService.Data, TemporaryRegistryCommunicationGroupExportService>
{
  private readonly IRepository<Subject> _subjectRepository;

  public TemporaryRegistryCommunicationGroupExportService(IRepository<Subject> subjectRepository)
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

      [nameof(Data.DebtAmount)] = data
        => data.DebtAmount,

      [nameof(Data.HasAnomalies)] = data
        => LocalizeBool(data.HasAnomalies),
    };

  protected override async Task<IList<Data>> SelectItemsAsync(
    IEnumerable<RegistryCommunicationGroup> entities,
    CancellationToken cancellationToken = default)
  {
    var managementSubjectNames = await _subjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(entities.Select(entity => entity.Id.ManagementSubjectId)))
      .Select(subject => new { subject.Id, subject.Name })
      .ToDictionaryAsync(subject => subject.Id, subject => subject.Name, cancellationToken);

    return entities
      .Select(entity => new Data
      {
        ManagementSubjectName = managementSubjectNames[entity.Id.ManagementSubjectId],
        IsActiveContract = entity.Id.IsActiveContract,
        CommunicationType = entity.Id.CommunicationType,
        EndDate = entity.Id.EndDate,
        DebtAmount = entity.DebtAmount,
        HasAnomalies = entity.HasAnomalies,
      })
      .ToList();
  }
}
