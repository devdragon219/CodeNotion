using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Prop.BillAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Web.Common.DataLoaders;

namespace RealGimm.Web.Prop.Extensions;

[ExtendObjectType(typeof(BillRow))]
public class BillRowExtension
{
  public Task<VATRate> GetVATRate(
    [Parent] BillRow parent,
    [Service] VATRateDataLoader dataLoader,
    CancellationToken cancellationToken)
    => dataLoader.LoadAsync(parent.VATRateId, cancellationToken);
}
