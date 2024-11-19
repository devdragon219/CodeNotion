using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Docs.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Docs.Mapping;

public class EstateUnitDocumentMapper : EstateLinkedDocumentMapperBase<EstateUnit>
{
  private readonly IRepository<EstateUnit> _estateUnitRepository;
  private readonly IRepository<Subject> _subjectRepository;

  public EstateUnitDocumentMapper(IRepository<EstateUnit> estateUnitRepository, IRepository<Subject> subjectRepository)
  {
    _estateUnitRepository = estateUnitRepository;
    _subjectRepository = subjectRepository;
  }

  public override async Task MapAsync(int estateUnitId, DocumentInput from, Document into, CancellationToken cancellationToken)
  {
    ArgumentNullException.ThrowIfNull(from);
    ArgumentNullException.ThrowIfNull(into);

    var estateUnit = await _estateUnitRepository
      .AsQueryable(new GetByIdSpec<EstateUnit>(estateUnitId))
      .Select(estateUnit => new
      {
        EstateId = estateUnit.Estate.Id,
        estateUnit.ManagementSubjectId
      })
      .SingleOrDefaultAsync(cancellationToken)
      ?? throw new MappingException(ErrorCode.DocumentEstateIsInvalid.ToValidationError());

    Map(new[] { estateUnit.ManagementSubjectId }, estateUnitId, estateUnit.EstateId, from, into);
  }
}
