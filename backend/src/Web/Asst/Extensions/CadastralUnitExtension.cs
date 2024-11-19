using RealGimm.Core;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.Taxes;

namespace RealGimm.Web.Asst.Extensions;

[ExtendObjectType(typeof(CadastralUnit))]
public class CadastralUnitExtension
{
  public IQueryable<CadastralUnit> History(
    [Parent] CadastralUnit parent,
    [Service(ServiceKind.Synchronized)] IReadRepository<CadastralUnit> repository)
    => repository.AsQueryable(
        new EntityNonDeletedSpec<CadastralUnit>(),
        new CadastralUnitIncludeAllSpec(),
        new CadastralUnitByHistoryTagsSpec(parent.HistoryTags),
        new OrderBySinceSpec<CadastralUnit>());

  public async Task<ConfigSection[]> TaxCalculators(
    [Parent] CadastralUnit parent,
    [Service] TaxCalculatorService tcService
  ) => await tcService.GetApplicableCalculators(parent);
}
