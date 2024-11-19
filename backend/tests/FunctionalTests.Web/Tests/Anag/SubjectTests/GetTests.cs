using RealGimm.Core.Anag.SubjectAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Anag.SubjectTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<Subject>
{
  protected override string MethodName => "subject";
  protected override string IdParameterName => "subjectId";
  protected override string EntityFragment
  {
    get
    {
      return GraphQLHelper.Anag.SubjectUnionFragment(
        includeAddresses: true,
        includeContacts: true,
        includeOrgUnits: true,
        includeBankAccounts: true,
        includeCategories: true,
        includeTaxStatues: true,
        includeRelations: true);
    }
  }

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
