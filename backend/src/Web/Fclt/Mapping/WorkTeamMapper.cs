using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Fclt.WorkTeamAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.IAM.UserAggregate;

namespace RealGimm.Web.Fclt.Mapping;

public class WorkTeamMapper : IMapper<WorkTeamInput, WorkTeam>
{
  private readonly IMapper _mapper;
  private readonly IReadRepository<Subject> _subjectRepository;
  private readonly IReadRepository<User> _userRepository;

  public WorkTeamMapper(IMapper mapper, IReadRepository<Subject> subjectRepository, IReadRepository<User> userRepository)
  {
    _mapper = mapper;
    _subjectRepository = subjectRepository;
    _userRepository = userRepository;
  }

  public async Task<WorkTeam?> MapAsync(
    WorkTeamInput? from,
    WorkTeam? into = null,
    CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var workTeam = into ?? new WorkTeam();
    workTeam.SetInternalCode(from.InternalCode);
    workTeam.SetDescription(from.Description);
    workTeam.SetInsertionDate(from.InsertionDate);
    
    await _mapper.UpdateCollectionAsync(from.Workers, workTeam.Workers, cancellationToken);

    if (!await CheckSubjectExistsAsync(from.ProviderSubjectId, cancellationToken))
    {
      throw new MappingException(ErrorCode.ProviderSubjectNotFound.ToValidationError());
    }

    workTeam.SetProviderSubjectId(from.ProviderSubjectId);

    if (!await CheckUserExistsAsync(from.LeaderUserId, cancellationToken))
    {
      throw new MappingException(ErrorCode.LeaderSubjectNotFound.ToValidationError());
    }

    workTeam.SetLeaderUserId(from.LeaderUserId);
    
    return workTeam;
  }

  private async Task<bool> CheckSubjectExistsAsync(int subjectId, CancellationToken cancellationToken)
    => await _subjectRepository
        .AsQueryable(new GetByIdSpec<Subject>(subjectId), new EntityNonDeletedSpec<Subject>())
        .AnyAsync(cancellationToken);

  private async Task<bool> CheckUserExistsAsync(int userId, CancellationToken cancellationToken)
    => await _userRepository
        .AsQueryable(new GetByIdSpec<User>(userId), new EntityNonDeletedSpec<User>())
        .AnyAsync(cancellationToken);
}
