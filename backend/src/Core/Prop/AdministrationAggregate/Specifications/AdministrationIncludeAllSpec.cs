using Ardalis.Specification;

namespace RealGimm.Core.Prop.AdministrationAggregate.Specifications;

public sealed class AdministrationIncludeAllSpec : Specification<Administration>
{
  public AdministrationIncludeAllSpec()
  {
    Query.Include(administration => administration.Terms);
  }
}
