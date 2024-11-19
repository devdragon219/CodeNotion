using Ardalis.Specification;

namespace RealGimm.Core.Prop.AdministrationAggregate.Specifications;

public sealed class AdministrationIncludeForImportSpec : Specification<Administration>
{
  public AdministrationIncludeForImportSpec()
  {
    Query
      .Include(administration => administration.Terms)
      .ThenInclude(term => term.Installments);
  }
}
