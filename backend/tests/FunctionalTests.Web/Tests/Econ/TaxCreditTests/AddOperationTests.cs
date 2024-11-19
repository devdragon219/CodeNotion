using System.Runtime.CompilerServices;
using Ardalis.Specification;
using HotChocolate.Execution;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Econ.TaxCreditAggregate;
using RealGimm.Core.Econ.TaxCreditAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.FunctionalTests.Web.Fakers.Anag;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Infrastructure.Econ.Data.Fakers;
using RealGimm.Web.Econ.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Econ.TaxCreditTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddOperationTests : EmptyDbWebTest
{
  public string ModuleName => "taxCredit";
  public string MethodName => "addOperation";

  public string Mutation => $$"""
    mutation($taxCreditId: Int!, $input: {{nameof(OperationInput)}}!) {
      {{ModuleName}} {
        {{MethodName}}(taxCreditId: $taxCreditId, input: $input) {
          {{GraphQLHelper.ResultFragment(GraphQLHelper.Econ.OperationFragment())}}
        }
      }
    }
    """;
  
  public AddOperationTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_Add()
  {
    // Arrange
    int taxCreditId;
    OperationInput input;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var managementSubject = new ManagementSubjectFaker().Generate();
      var subjectRepository = scope.ServiceProvider.GetRequiredService<IRepository<Subject>>();
      await subjectRepository.AddAsync(managementSubject);

      var taxCredit = new TaxCreditFaker { ManagementSubjects = [managementSubject] }.Generate();
      var taxCreditRepository = scope.ServiceProvider.GetRequiredService<IRepository<TaxCredit>>();
      await taxCreditRepository.AddAsync(taxCredit);

      taxCreditId = taxCredit.Id;
      input = new OperationInputFaker(-taxCredit.Operations.Sum(operation => operation.Amount)).Generate();
    }

    var addMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("taxCreditId", taxCreditId)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addMutation);

    // Assert
    AssertSuccessGraphQLQueryResult(result);

    var addedOperationId = result.Data!
      .GetDictionaryValue(ModuleName)
      .GetDictionaryValue(MethodName)
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<TaxCredit>>();

      var addedOperation = await repository
        .AsQueryable(new GetByIdSpec<TaxCredit>(taxCreditId), new EntityNonDeletedSpec<TaxCredit>())
        .SelectMany(taxCredit => taxCredit.Operations)
        .SingleOrDefaultAsync(operation => operation.Id == addedOperationId);

      Assert.NotNull(addedOperation);
      AssertHelper.Econ.OperationEqual(input, addedOperation);
    }

    await Verify(result);
  }
}
