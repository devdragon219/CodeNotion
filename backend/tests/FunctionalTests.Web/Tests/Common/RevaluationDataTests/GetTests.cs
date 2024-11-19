using RealGimm.Core.Common.RevaluationDataAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Common.RevaluationDataTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<RevaluationData>
{
  protected override string EntityFragment => GraphQLHelper.Common.RevaluationDataFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
