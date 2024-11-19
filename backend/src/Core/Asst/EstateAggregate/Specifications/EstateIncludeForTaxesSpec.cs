using Ardalis.Specification;

namespace RealGimm.Core.Asst.EstateAggregate.Specifications;

public class EstateIncludeForTaxesSpec : Specification<Estate>
{
  public EstateIncludeForTaxesSpec()
  {
    Query.Include(es => es.Addresses) 
         .Include(es => es.EstateUnits)
          .ThenInclude(eu => eu.Address)
         .Include(es => es.EstateUnits)
          .ThenInclude(eu => eu.CadastralUnits);
  }
}
