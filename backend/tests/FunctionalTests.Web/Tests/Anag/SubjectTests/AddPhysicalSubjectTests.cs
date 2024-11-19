using Ardalis.Specification;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.SubjectAggregate.Specifications;
using RealGimm.FunctionalTests.Web.Fakers.Anag;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Web.Anag.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Anag.SubjectTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddPhysicalSubjectTests : BaseAddTests<Subject, PhysicalSubject, PhysicalSubjectInput>
{
  public override string MethodName => "addPhysicalSubject";
  public override string EntityFragment
  {
    get
    {
      return GraphQLHelper.Anag.PhysicalSubjectFragment(
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

  public AddPhysicalSubjectTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override async Task<PhysicalSubjectInput> ArrangeAsync(IServiceProvider scopedServices)
  {
    var ownerSubject = new ManagementSubjectFaker().Generate();

    var subjectRepository = scopedServices.GetRequiredService<IRepository<Subject>>();
    await subjectRepository.AddAsync(ownerSubject);

    var faker = new PhysicalSubjectInputFaker();
    var input = faker.Generate() with { OwnerManagementSubjectIds = [ownerSubject.Id] };

    return input;
  }

  protected override Task AssertAsync(IServiceProvider scopedServices, PhysicalSubjectInput input, PhysicalSubject addedEntity)
  {
    AssertHelper.Anag.PhysicalSubjectEqual(input, addedEntity);
    return Task.CompletedTask;
  }
}
