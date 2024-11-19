using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Docs.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Docs.Mapping;

public class SubjectDocumentMapper : EstateLinkedDocumentMapperBase<Subject>
{
  private readonly IRepository<Subject> _subjectRepository;

  public SubjectDocumentMapper(IRepository<Subject> subjectRepository)
  {
    _subjectRepository = subjectRepository;
  }

  public override async Task MapAsync(int subjectId, DocumentInput from, Document into, CancellationToken cancellationToken)
  {
    ArgumentNullException.ThrowIfNull(from);
    ArgumentNullException.ThrowIfNull(into);

    var managementSubjectIds = await _subjectRepository
      .AsQueryable(new GetByIdSpec<Subject>(subjectId))
      .Select(subject => subject.RelationSubordinates
        .Where(relation => relation.RelationType == SubjectRelationType.ManagementEntityOwned)
        .Select(relation => relation.MainId))
      .SingleOrDefaultAsync(cancellationToken)
      ?? throw new MappingException(ErrorCode.DocumentSubjectIsInvalid.ToValidationError());

    Map(managementSubjectIds.ToArray(), subjectId, estateId: null, from, into);   
  }
}
