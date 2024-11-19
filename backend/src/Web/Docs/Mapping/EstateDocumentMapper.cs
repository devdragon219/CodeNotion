using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Docs.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Docs.Mapping;

public class EstateDocumentMapper : EstateLinkedDocumentMapperBase<Estate>
{
  private readonly IRepository<Estate> _repository;

  public EstateDocumentMapper(IRepository<Estate> repository)
  {
    _repository = repository;
  }

  public override async Task MapAsync(int estateId, DocumentInput from, Document into, CancellationToken cancellationToken)
  {
    ArgumentNullException.ThrowIfNull(from);
    ArgumentNullException.ThrowIfNull(into);

    var managementSubjectId = await _repository
      .AsQueryable(new GetByIdSpec<Estate>(estateId))
      .Select(estate => (int?)estate.ManagementSubjectId)
      .SingleOrDefaultAsync(cancellationToken)
      ?? throw new MappingException(ErrorCode.DocumentEstateIsInvalid.ToValidationError());

    Map(new[] { managementSubjectId }, estateId, estateId, from, into);
  }
}
