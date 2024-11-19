using Ardalis.Specification;

namespace RealGimm.Core.Asst.CadastralUnitAggregate.Specifications;

public class CadastralUnitIncludeAllSpec : Specification<CadastralUnit>
{
  public CadastralUnitIncludeAllSpec()
  {
    Query
      .Include(cadastralUnit => cadastralUnit.EstateUnit)
        .ThenInclude(estateUnit => estateUnit!.Estate)
      .Include(cadastralUnit => cadastralUnit.EstateUnit)
        .ThenInclude(estateUnit => estateUnit!.Estate)
        .ThenInclude(estate => estate.UsageType)
      .Include(cadastralUnit => cadastralUnit.EstateUnit)
        .ThenInclude(estateUnit => estateUnit!.Estate)
        .ThenInclude(estate => estate.MainUsageType)
      .Include(cadastralUnit => cadastralUnit.EstateUnit)
        .ThenInclude(estateUnit => estateUnit!.Address)
      .Include(cadastralUnit => cadastralUnit.EstateUnit)
        .ThenInclude(estateUnit => estateUnit!.UsageType)
      .Include(cadastralUnit => cadastralUnit.Unavailabilities.OrderBy(sc => sc.Id))
      .Include(cadastralUnit => cadastralUnit.Coordinates)
      .Include(cadastralUnit => cadastralUnit.Expenses.OrderBy(sc => sc.Id))
      .Include(cadastralUnit => cadastralUnit.Address)
      .Include(cadastralUnit => cadastralUnit.TaxConfig)
      .Include(cadastralUnit => cadastralUnit.TaxPayments)
        .ThenInclude(payment => payment.Installments)
      .Include(cadastralUnit => cadastralUnit.Income)
        .ThenInclude(payment => payment.CadastralCategory)
      .AsSplitQuery();
  }
}
