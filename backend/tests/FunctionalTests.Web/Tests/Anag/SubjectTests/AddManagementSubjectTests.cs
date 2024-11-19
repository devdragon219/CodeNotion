using Ardalis.Specification;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.SubjectAggregate.Specifications;
using RealGimm.FunctionalTests.Web.Fakers.Anag;
using RealGimm.Web.Anag.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Anag.SubjectTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddManagementSubjectTests : BaseAddTests<Subject, ManagementSubject, ManagementSubjectInput>
{
  public override string MethodName => "addManagementSubject";
  public override string EntityFragment
  {
    get
    {
      return GraphQLHelper.Anag.ManagementSubjectFragment(
        includeAddresses: true,
        includeContacts: true,
        includeOrgUnits: true,
        includeBankAccounts: true,
        includeCategories: true,
        includeTaxStatues: true,
        includeRelations: true);
    }
  }
  public override ISpecification<Subject>[] AdditionalSpecifications => [new SubjectIncludeAllSpec()];

  public AddManagementSubjectTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override Task<ManagementSubjectInput> ArrangeAsync(IServiceProvider scopedServices)
  {
    var faker = new ManagementSubjectInputFaker();
    var input = faker.Generate();

    return Task.FromResult(input);
  }

  protected override Task AssertAsync(IServiceProvider scopedServices, ManagementSubjectInput input, ManagementSubject addedEntity)
  {
    AssertHelper.Anag.ManagementSubjectEqual(input, addedEntity);
    return Task.CompletedTask;
  }
}
