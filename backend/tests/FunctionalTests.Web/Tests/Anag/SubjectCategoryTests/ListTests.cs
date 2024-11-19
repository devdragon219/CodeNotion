using RealGimm.Core.Anag.SubjectCategoryAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Anag.SubjectCategoryTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ListTests : BasePageableListTests<SubjectCategory>
{
  protected override string EntityFragment => GraphQLHelper.Anag.SubjectCategoryFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
