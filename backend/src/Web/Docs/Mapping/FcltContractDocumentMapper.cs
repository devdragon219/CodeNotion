using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Docs.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Docs.Mapping;

public class FcltContractDocumentMapper : EstateLinkedDocumentMapperBase<Contract>
{
  private readonly IRepository<Contract> _contractRepository;
  private readonly IRepository<EstateUnit> _estateUnitRepository;

  public FcltContractDocumentMapper(IRepository<Contract> contractRepository, IRepository<EstateUnit> estateUnitRepository)
  {
    _contractRepository = contractRepository;
    _estateUnitRepository = estateUnitRepository;
  }

  public override async Task MapAsync(int contractId, DocumentInput from, Document into, CancellationToken cancellationToken)
  {
    ArgumentNullException.ThrowIfNull(from);
    ArgumentNullException.ThrowIfNull(into);

    var contract = await _contractRepository
      .AsQueryable(new GetByIdSpec<Contract>(contractId))
      .Select(contract => new
      {
        contract.ProviderSubjectId,
        contract.EstateUnitIds
      })
      .SingleOrDefaultAsync(cancellationToken)
      ?? throw new MappingException(ErrorCode.ContractNotFound.ToValidationError());

    var managementSubjectIds = await _estateUnitRepository
      .AsQueryable(new GetByIdsSpec<EstateUnit>(contract.EstateUnitIds))
      .Select(estateUnit => estateUnit.Estate.ManagementSubjectId)
      .ToListAsync(cancellationToken);

    Map([contract.ProviderSubjectId, ..managementSubjectIds], contractId, estateId: null, from, into);
  }
}
