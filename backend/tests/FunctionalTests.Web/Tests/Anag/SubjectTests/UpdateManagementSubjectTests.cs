using Ardalis.Specification;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.SubjectAggregate.Specifications;
using RealGimm.FunctionalTests.Web.Fakers.Anag;
using RealGimm.Web.Anag.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Anag.SubjectTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateManagementSubjectTests : BaseUpdateWithoutIdParameterTests<Subject, ManagementSubject, ManagementSubjectInput>
{
  public override string MethodName => "updateManagementSubject";
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

  public UpdateManagementSubjectTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override async Task<(ManagementSubject EntityToUpdate, ManagementSubjectInput Input)> ArrangeAsync(
    IServiceProvider scopedServices)
  {
    var repository = scopedServices.GetRequiredService<IRepository<Subject>>();

    var subjectFaker = new Fakers.Asst.ManagementSubjectFaker();
    var subjectToUpdate = subjectFaker.Generate();
    await repository.AddAsync(subjectToUpdate);

    var inputFaker = new ManagementSubjectInputFaker();
    var input = inputFaker.Generate();
    input.Id = subjectToUpdate.Id;

    return (subjectToUpdate, input);
  }

  protected override Task AssertAsync(IServiceProvider scopedServices, ManagementSubjectInput input, ManagementSubject updatedEntity)
  {
    AssertHelper.Anag.ManagementSubjectEqual(input, updatedEntity);
    return Task.CompletedTask;
  }
}
