using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.ContractTemplateAggregate;
using RealGimm.Web.Asst.DataLoaders;

namespace RealGimm.Web.Fclt.Extensions;

[ExtendObjectType(typeof(ContractTemplate))]
public sealed class ContractTemplateExtension
{
  public async Task<IEnumerable<CatalogueType>> GetCatalogueTypes(
    [Parent] ContractTemplate contractTemplate,
    [Service] CatalogueTypeDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(contractTemplate.CatalogueTypeIds, cancellationToken);
}
