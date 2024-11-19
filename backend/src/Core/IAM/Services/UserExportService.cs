using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.Shared.Services;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.Core.IAM.Services;

public sealed partial class UserExportService : ExportService<User, UserExportService.Data, UserExportService>
{
  public required IReadRepository<Subject> _subjectRepository { private get; init; }

  protected override async Task<IList<Data>> SelectItemsAsync(
    IEnumerable<User> entities,
    CancellationToken cancellationToken = default)
  {
    var managementSubjectsNames = await _subjectRepository
      .AsQueryable(
        new GetByIdsSpec<Subject>(entities
          .Select(user => user.Subjects)
          .SelectMany(subjects => subjects ?? Array.Empty<int>())
          .Distinct()))
      .Select(subject => new { subject.Id, subject.Name })
      .ToDictionaryAsync(subject => subject.Id, subject => subject.Name, cancellationToken);

    return entities
      .Select(user =>
      {
        var currentManagementSubjectNames = user.Subjects is null
          ? Array.Empty<string>()
          : user.Subjects.Select(subjectId => managementSubjectsNames[subjectId]).ToArray();

        return new Data(user, currentManagementSubjectNames);
      })
      .ToList();
  }

  protected override Dictionary<string, Func<Data, XLCellValue>> CreateExcelDataSelector()
    => new()
    {
      [nameof(User.FullName)] = data
        => data.User.FullName,

      [nameof(User.UserName)] = data
        => data.User.UserName,

      [nameof(User.Status)] = data
        => LocalizeEnumValue(data.User.Status),

      ["ManagementSubjects"] = data
        => string.Join(",", data.ManagementSubjectsNames),

      [nameof(User.Type)] = data
        => LocalizeEnumValue(data.User.Type),

      [nameof(User.Groups)] = data
        => string.Join(",", data.User.Groups.Select(group => group.Name))
    };
}
