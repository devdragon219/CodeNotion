using Ardalis.Specification;

namespace RealGimm.Core.Common.RevaluationDataAggregate.Specification;

public class RevaluationDataByProviderIdSpec : Specification<RevaluationData>
{
  public RevaluationDataByProviderIdSpec(Guid providerId)
  {
    Query.Where(rd => rd.DataProvider == providerId);
  }
}
