using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.SubjectCategoryAggregate;
using RealGimm.Web.Anag.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Anag.Mapping;

public class RootSubjectMapper : SubjectMapper<SubjectInput, Subject>
{
  public RootSubjectMapper(IMapper mapper, IRepository<Subject> subjectRepository, IRepository<SubjectCategory> categoryRepository)
    : base(mapper, subjectRepository, categoryRepository)
  {
  }

  public override async Task<Subject?> MapAsync(SubjectInput? from, Subject? into, CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var subject = into ?? new PhysicalSubject();

    await MapBaseAsync(from, subject, cancellationToken);

    return subject;
  }
}
