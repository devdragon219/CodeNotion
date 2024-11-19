using Ardalis.Specification;
using RealGimm.Core.Asst.AssetTaxCalculationAggregate;

namespace RealGimm.Core.Asst.CadastralUnitAggregate.Specifications;

public class AssetTaxCalculationIncludeAllSpec : Specification<AssetTaxCalculation>
{ 
  public AssetTaxCalculationIncludeAllSpec()
  {
    Query
    .Include(tc => tc.CadastralUnit)
      .ThenInclude(cu => cu.EstateUnit)
        .ThenInclude(eu => eu!.Estate)
    .Include(tc => tc.CadastralUnit)
      .ThenInclude(cu => cu.EstateUnit)
        .ThenInclude(eu => eu!.Address)
    .Include(tc => tc.CadastralUnit)
      .ThenInclude(cu => cu.Coordinates)
    .Include(tc => tc.CadastralUnit)
      .ThenInclude(cu => cu.Address)
    .Include(tc => tc.CadastralUnit)
      .ThenInclude(cu => cu.Income)
    .Include(tc => tc.CadastralUnit)
      .ThenInclude(cu => cu.TaxConfig)
    .Include(tc => tc.Installments);
  }
}