using RealGimm.Core.Anag.SubjectAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Anag.SubjectTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ListTests : BasePageableListTests<Subject>
{
  protected override string EntityFragment => GraphQLHelper.Anag.ISubjectFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
