using RealGimm.Core.Fclt.ContractTypeAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class ContractTypeMapper : IMapper<ContractTypeInput, ContractType>
{
  public ContractType? MapAsync(ContractTypeInput? from, ContractType? into = null)
  {
    if (from is null)
    {
      return null;
    }

    var contractType = into ?? new ContractType();
    contractType.SetData(from.Name, from.InternalCode, from.Ordering);

    return contractType;
  }

  Task<ContractType?> IMapper<ContractTypeInput, ContractType>.MapAsync(
    ContractTypeInput? from,
    ContractType? into,
    CancellationToken cancellationToken)
    => Task.FromResult(MapAsync(from, into));
}
