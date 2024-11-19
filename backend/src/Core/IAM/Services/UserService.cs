using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.SubjectAggregate.Specifications;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate.Specifications;
using RealGimm.Core.IAM.Interfaces;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.IAM.UserAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.Core.IAM.Services;

public class UserService : IUserService
{
  private readonly IRepository<User> _userRepo;
  private readonly IRepository<Subject> _subjectRepo;
  private readonly IRepository<OrgUnit> _ouRepo;

  public UserService(
    IRepository<User> userRepo,
    IRepository<Subject> subjectRepository,
    IRepository<OrgUnit> ouRepo)
  {
    _userRepo = userRepo;
    _subjectRepo = subjectRepository;
    _ouRepo = ouRepo;
  }

  public async Task<UserDetail> GetUserAsync(int userId, CancellationToken cancellationToken = default)
  {
    var user = await _userRepo
      .AsQueryable(new GetByIdSpec<User>(userId), new UserIncludeAllSpec())
      .FirstOrDefaultAsync(cancellationToken);

    ArgumentNullException.ThrowIfNull(user);

    List<OrgUnit> orgUnits = new();
    if (user.OrgUnits is not null && user.OrgUnits.Any())
    {
      orgUnits = await _ouRepo.AsQueryable(new GetByIdsSpec<OrgUnit>(user.OrgUnits), new OrgUnitIncludeAllSpec(), new EntityNonDeletedSpec<OrgUnit>()).ToListAsync(cancellationToken);
    }

    List<ManagementSubject> managementSubjects = new();
    if (user.Subjects is not null && user.Subjects.Any())
    {
      var subSpec1 = new GetByIdsSpec<Subject>(user.Subjects);
      var subSpec2 = new SubjectByPersonTypeSpec(PersonType.ManagementSubject);
      var subResult = _subjectRepo.AsQueryable(subSpec1, subSpec2);

      managementSubjects = subResult
        .Where(e => e is ManagementSubject)
        .Select(e => (ManagementSubject)e)
        .ToList();
    }

    var userDetail = new UserDetail
    (
      user.Id,
      user.FirstName,
      user.LastName,
      user.UserName,
      user.Status,
      user.Type,
      user.CeasedDate,
      user.LockedSince,
      user.EnabledSince,
      user.SuspensionReason,
      user.Contacts,
      orgUnits,
      managementSubjects,
      user.Groups
    );

    return userDetail;
  }

  public async Task<List<UserListRow>> GetUserListAsync(CancellationToken cancellationToken = default)
  {
    var userList = await _userRepo
      .AsQueryable(new UserIncludeAllForListSpec(), new EntityNonDeletedSpec<User>())
      .ToListAsync(cancellationToken);

    var subSpec = new SubjectByPersonTypeSpec(PersonType.ManagementSubject);
    var managementSubjects = await _subjectRepo.ListAsync(subSpec, cancellationToken);

    var userListRows = userList.Select(e => new UserListRow(e.Id, e.FirstName, e.LastName, e.UserName, e.Status, e.Type,
                                            managementSubjects.Where(ms => e.Subjects is not null && e.Subjects.Contains(ms.Id)).ToList(), e.Groups
                                       )).ToList();

    return userListRows;
  }
}
