using RealGimm.Core;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public sealed class CadastralUnitTaxConfigMapper : IMapper<CadastralUnitTaxConfigInput, CadastralUnitTaxConfig>
{
  public CadastralUnitTaxConfig? Map(CadastralUnitTaxConfigInput? from, CadastralUnitTaxConfig? into = null)
  {
    if (from is null)
    {
      return null;
    }

    var taxConfig = into ?? new CadastralUnitTaxConfig();
    taxConfig.SetReference(
      from.Name,
      from.TaxCalculatorId,
      from.IsMandatory,
      from.TemplateTypeId,
      from.Type);

    taxConfig.SetValue(from.Value);

    return taxConfig;
  }

  Task<CadastralUnitTaxConfig?> IMapper<CadastralUnitTaxConfigInput, CadastralUnitTaxConfig>.MapAsync(
    CadastralUnitTaxConfigInput? from,
    CadastralUnitTaxConfig? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
