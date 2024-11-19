using Ardalis.Specification;
using HotChocolate.Execution;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Econ.TaxCreditAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.FunctionalTests.Web.Fakers.Anag;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Infrastructure.Econ.Data.Fakers;
using RealGimm.Web.Econ.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Econ.TaxCreditTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateOperationTests : EmptyDbWebTest
{
  public string ModuleName => "taxCredit";
  public string MethodName => "updateOperation";

  public string Mutation => $$"""
    mutation($taxCreditId: Int!, $operationId: Int!, $input: {{nameof(OperationInput)}}!) {
      {{ModuleName}} {
        {{MethodName}}(taxCreditId: $taxCreditId, operationId: $operationId, input: $input) {
          {{GraphQLHelper.ResultFragment(GraphQLHelper.Econ.OperationFragment())}}
        }
      }
    }
    """;
  
  public UpdateOperationTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_Update()
  {
    // Arrange
    int taxCreditId;
    int operationId;
    OperationInput input;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var managementSubject = new ManagementSubjectFaker().Generate();
      var subjectRepository = scope.ServiceProvider.GetRequiredService<IRepository<Subject>>();
      await subjectRepository.AddAsync(managementSubject);

      var taxCredit = new TaxCreditFaker { ManagementSubjects = [managementSubject] }.Generate();
      var taxCreditRepository = scope.ServiceProvider.GetRequiredService<IRepository<TaxCredit>>();
      await taxCreditRepository.AddAsync(taxCredit);

      var operationToUpdate = taxCredit.Operations.Last();

      taxCreditId = taxCredit.Id;
      operationId = operationToUpdate.Id;
      input = new OperationInputFaker(operationToUpdate.Amount - taxCredit.Operations.Sum(operation => operation.Amount)).Generate();
    }

    var updateMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("taxCreditId", taxCreditId)
      .SetVariableValue("operationId", operationId)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(updateMutation);

    // Assert
    AssertSuccessGraphQLQueryResult(result);

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<TaxCredit>>();

      var updatedOperation = await repository
        .AsQueryable(new GetByIdSpec<TaxCredit>(taxCreditId), new EntityNonDeletedSpec<TaxCredit>())
        .SelectMany(taxCredit => taxCredit.Operations)
        .SingleOrDefaultAsync(operation => operation.Id == operationId);

      Assert.NotNull(updatedOperation);
      AssertHelper.Econ.OperationEqual(input, updatedOperation);
    }

    await Verify(result);
  }
}
