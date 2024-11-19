using RealGimm.Core.Prop.AdministrationTermAggregate;
using RealGimm.Core.Prop.Interfaces;
using RealGimm.Web.Prop.DataLoaders;

namespace RealGimm.Web.Prop.Extensions;

[ExtendObjectType(typeof(AdministrationTerm))]
public class AdministrationTermExtensions
{
  public async Task<IEnumerable<TermGroupedInstallmentPayment>> Payments(
    [Parent] AdministrationTerm administrationTerm,
    [Service] AdministrationTermDataLoader termDataLoader,
    CancellationToken cancellationToken = default) 
    => await termDataLoader.LoadAsync(administrationTerm.Id, cancellationToken);
}
