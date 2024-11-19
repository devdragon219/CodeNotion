using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.Web.Asst.DataLoaders;

namespace RealGimm.Web.Prop.Extensions;

[ExtendObjectType(typeof(ContractType))]
public class ContractTypeExtensions
{
  public async Task<EstateUsageType> GetUsageType(
    [Parent] ContractType contractType,
    [Service] EstateUsageTypeDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(contractType.UsageTypeId, cancellationToken);
}
