using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Prop.Models;
using RealGimm.Core;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Prop.BillAggregate;
using RealGimm.FunctionalTests.Web.Tests.Prop.ContractTests;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.Infrastructure.Common.Data.Fakers;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Prop;
using RealGimm.Core.Prop.BillAggregate.Specifications;
using System.Text.Json;
using RealGimm.Core.Prop.BillItemTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.BillTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!, $input: {{nameof(BillInput)}}!) {
      bill {
        update(id: $id, input: $input) {
          {{
            GraphQLHelper.ResultFragment(
              GraphQLHelper.Prop.BillFragment()
          )}}
        }
      }
    }
    """;

  public UpdateTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_Update()
  {
    // Arrange
    Bill billToUpdate;
    BillInput input;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var contractFaker = ContractTestsHelper.CreateContractFaker(await ContractTestsHelper.SeedEntities(scope.ServiceProvider));

      var vatRateRepository = scope.ServiceProvider.GetRequiredService<IRepository<VATRate>>();
      var vatRates = await vatRateRepository.AddRangeAsync(new VATRateFaker().Generate(4));

      var billItemTypes = await scope.ServiceProvider
        .GetRequiredService<IRepository<BillItemType>>()
        .AddRangeAsync(new BillItemTypeFaker()
          .UseVATRates(vatRates)
          .Generate(2));
          
      var billFaker = new BillFaker
      {
        Contracts = contractFaker.Generate(1),
        BillRowFaker = new BillRowFaker()
        {
          VatRateIds = vatRates.Select(vatRate => vatRate.Id).Take(2),
          BillItemTypes = billItemTypes
        }
      };

      billToUpdate = billFaker.Generate();
      billToUpdate.SetFinalDate(null);
      
      await scope.ServiceProvider
        .GetRequiredService<IRepository<Bill>>()
        .AddAsync(billToUpdate);

      var inputFaker = new BillInputFaker
      {
        Contracts = new[] { billToUpdate.Contract! },
        BillRowInputFaker = new BillRowInputFaker()
        {
          VatRateIds = vatRates.Select(vatRate => vatRate.Id).Skip(1),
          BillItemTypes = billItemTypes.Skip(1)
        }
      };

      input = inputFaker.Generate();
    }

    var updateBillMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", billToUpdate.Id)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(updateBillMutation);

    // Assert
    Assert.NotNull(result);
    if(!result.IsSuccess())
    {
      Console.WriteLine(JsonSerializer.Serialize(result));
    }

    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Bill>>();

      var updatedBill = await repository
        .AsQueryable(new GetByIdSpec<Bill>(billToUpdate.Id), new BillIncludeAllSpec())
        .SingleOrDefaultAsync();

      Assert.NotNull(updatedBill);
      AssertHelper.Prop.BillEqual(input, updatedBill);
    }

    await Verify(result);
  }
}
