using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Fclt.WorkTeamAggregate;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.Shared.Services;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.Core.Fclt.Services;

public sealed class WorkTeamExportService : ExportService<WorkTeam, WorkTeamExportService.Data, WorkTeamExportService>
{
  private readonly IReadRepository<Subject> _subjectRepository;
  private readonly IReadRepository<User> _userRepository;

  public WorkTeamExportService(IReadRepository<Subject> subjectRepository, IReadRepository<User> userRepository)
  {
    _subjectRepository = subjectRepository;
    _userRepository = userRepository;
  }

  protected override Dictionary<string, Func<Data, XLCellValue>> CreateExcelDataSelector()
    => new()
    {
      [nameof(Data.InternalCode)] = data => data.InternalCode,
      [nameof(Data.Name)] = data => data.Name,
      [nameof(Data.Provider)] = data => data.Provider,
      [nameof(Data.Leader)] = data => data.Leader,
      [nameof(Data.InsertionDate)] = data => data.InsertionDate,
      [nameof(Data.WorkerFirstName)] = data => data.WorkerFirstName,
      [nameof(Data.WorkerLastName)] = data => data.WorkerLastName,
      [nameof(Data.WorkerStartDate)] = data => data.WorkerStartDate,
      [nameof(Data.WorkerEndDate)] = data => data.WorkerEndDate,
      [nameof(Data.WorkerCraft)] = data => data.WorkerCraft,
      [nameof(Data.WorkerQualificationLevel)] = data => data.WorkerQualificationLevel
    };

  protected override async Task<IList<Data>> SelectItemsAsync(
    IEnumerable<WorkTeam> workTeams,
    CancellationToken cancellationToken = default)
  {
    var providerSubjects = await _subjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(workTeams.Select(workTeam => workTeam.ProviderSubjectId).Distinct()))
      .Select(subject => new { subject.Id, subject.Name })
      .ToDictionaryAsync(subject => subject.Id, cancellationToken);

    var leaderUsers = await _userRepository
      .AsQueryable(new GetByIdsSpec<User>(workTeams.Select(workTeam => workTeam.LeaderUserId).Distinct()))
      .Select(user => new { user.Id, Name = user.LastName + " " + user.FirstName })
      .ToDictionaryAsync(user => user.Id, cancellationToken);

    return workTeams
      .SelectMany(workTeam => 
        workTeam.Workers.Select(worker => new Data
        {
          InternalCode = workTeam.InternalCode,
          Name = workTeam.Description,
          Provider = providerSubjects[workTeam.ProviderSubjectId].Name,
          Leader = leaderUsers[workTeam.LeaderUserId].Name,
          InsertionDate = workTeam.InsertionDate.ToString(),
          WorkerFirstName = worker.FirstName,
          WorkerLastName = worker.LastName,
          WorkerStartDate = worker.Since.ToString(),
          WorkerEndDate = worker.Until?.ToString() ?? "-",
          WorkerCraft = worker.Craft.Name,
          WorkerQualificationLevel = worker.QualificationLevel.Name,
        }))
      .ToList();
  }

  public record Data
  {
    public required XLCellValue InternalCode { get; init; }
    public required XLCellValue Name { get; init; }
    public required XLCellValue Provider { get; init; }
    public required XLCellValue Leader { get; init; }
    public required XLCellValue InsertionDate { get; init; }
    public required XLCellValue WorkerFirstName { get; init; }
    public required XLCellValue WorkerLastName { get; init; }
    public required XLCellValue WorkerStartDate { get; init; }
    public required XLCellValue WorkerEndDate { get; init; }
    public required XLCellValue WorkerCraft { get; init; }
    public required XLCellValue WorkerQualificationLevel { get; init; }
  }
}
