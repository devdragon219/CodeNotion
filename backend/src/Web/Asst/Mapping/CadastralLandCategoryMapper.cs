using RealGimm.Core.Asst.CadastralLandCategoryAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public sealed class CadastralLandCategoryMapper : IMapper<CadastralLandCategoryInput, CadastralLandCategory>
{
  public CadastralLandCategory? Map(CadastralLandCategoryInput? from, CadastralLandCategory? into)
  {
    if (from is null)
    {
      return null;
    }

    var cadastralLandCategory = into ?? new CadastralLandCategory();
    cadastralLandCategory.SetData(
      from.Description,
      from.InternalCode,
      from.CountryISO,
      from.Ordering);

    return cadastralLandCategory;
  }

  Task<CadastralLandCategory?> IMapper<CadastralLandCategoryInput, CadastralLandCategory>.MapAsync(
    CadastralLandCategoryInput? from,
    CadastralLandCategory? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
