using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Docs.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Docs.Mapping;

public class ContractDocumentMapper : EstateLinkedDocumentMapperBase<Contract>
{
  private readonly IRepository<Contract> _repository;

  public ContractDocumentMapper(IRepository<Contract> repository)
  {
    _repository = repository;
  }

  public override async Task MapAsync(int contractId, DocumentInput from, Document into, CancellationToken cancellationToken)
  {
    ArgumentNullException.ThrowIfNull(from);
    ArgumentNullException.ThrowIfNull(into);

    var managementSubjectId = await _repository
      .AsQueryable(new GetByIdSpec<Contract>(contractId))
      .Select(contract => (int?)contract.ManagementSubjectId)
      .SingleOrDefaultAsync(cancellationToken)
      ?? throw new MappingException(ErrorCode.ContractDoesntExists.ToValidationError());

    Map(new[] { managementSubjectId }, contractId, estateId: null, from, into);
  }
}
