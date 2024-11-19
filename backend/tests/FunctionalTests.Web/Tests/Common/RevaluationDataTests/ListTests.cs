using RealGimm.Core.Common.RevaluationDataAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Common.RevaluationDataTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<RevaluationData>
{
  protected override string EntityFragment => GraphQLHelper.Common.RevaluationDataFragment();
  protected override string MethodName => "listRevaluationData";

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
