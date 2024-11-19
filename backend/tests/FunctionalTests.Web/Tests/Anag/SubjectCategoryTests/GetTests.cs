using RealGimm.Core.Anag.SubjectCategoryAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Anag.SubjectCategoryTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<SubjectCategory>
{
  protected override string MethodName => "subjectCategory";
  protected override string IdParameterName => "subjectCategoryId";
  protected override string EntityFragment => GraphQLHelper.Anag.SubjectCategoryFragment(includeSubjects: true);

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
