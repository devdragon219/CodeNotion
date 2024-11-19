using RealGimm.Core;
using RealGimm.Core.Asst.CadastralCategoryAggregate;
using RealGimm.Core.IAM;

namespace RealGimm.Web.Asst.Queries;

public class CadastralCategoryQueries
{
  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering]
  [UseSorting]
  public IQueryable<CadastralCategory> ListCadastralCategories([Service] IReadRepository<CadastralCategory> repository)
    => repository.AsQueryable();
}
