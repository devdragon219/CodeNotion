using Ardalis.Specification;

namespace RealGimm.Core.Common.OfficialActAggregate.Specifications;

public class OfficialActIncludeAllSpec : Specification<OfficialAct>
{
  public OfficialActIncludeAllSpec()
  {
    Query
      .Include(act => act.ActRegistrationFields)
      .Include(act => act.ActRegistrationDates);
  }
}
