using Ardalis.Specification;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Econ.TaxCreditAggregate;
using RealGimm.Core.Econ.TaxCreditAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Fakers.Anag;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Web.Econ.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Econ.TaxCreditTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : BaseAddTests<TaxCredit, AddTaxCreditInput>
{
  public override string EntityFragment => GraphQLHelper.Econ.TaxCreditFragment(includeOperations: true);
  public override ISpecification<TaxCredit>[] AdditionalSpecifications =>
  [
    new EntityNonDeletedSpec<TaxCredit>(),
    new TaxCreditIncludeAllSpec()
  ];

  public AddTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override async Task<AddTaxCreditInput> ArrangeAsync(IServiceProvider scopedServices)
  {
    var managementSubject = new ManagementSubjectFaker().Generate();

    var subjectRepository = scopedServices.GetRequiredService<IRepository<Subject>>();
    await subjectRepository.AddAsync(managementSubject);

    var faker = new AddTaxCreditInputFaker();
    var input = faker.Generate() with { ManagementSubjectId = managementSubject.Id };

    return input;
  }

  protected override Task AssertAsync(IServiceProvider scopedServices, AddTaxCreditInput input, TaxCredit addedEntity)
  {
    AssertHelper.Econ.TaxCreditEqual(input, addedEntity);
    return Task.CompletedTask;
  }
}
