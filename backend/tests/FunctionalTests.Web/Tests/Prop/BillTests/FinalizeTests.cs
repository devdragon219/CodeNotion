using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Core;
using RealGimm.Core.Prop.BillAggregate;
using RealGimm.FunctionalTests.Web.Tests.Prop.ContractTests;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.Infrastructure.Common.Data.Fakers;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.BillTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class FinalizeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      bill {
        finalize(ids: $ids) {
          {{
            GraphQLHelper.ResultFragment()
          }}
        }
      }
    }
    """;

  public FinalizeTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_Finalize()
  {
    // Arrange
    Bill billToFinilize;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var contractFaker = ContractTestsHelper.CreateContractFaker(await ContractTestsHelper.SeedEntities(scope.ServiceProvider));

      var vatRates = await scope.ServiceProvider
        .GetRequiredService<IRepository<VATRate>>()
        .AddRangeAsync(new VATRateFaker().Generate(2));

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
          VatRateIds = vatRates.Select(vatRate => vatRate.Id),
          BillItemTypes = billItemTypes
        }
      };

      billToFinilize = billFaker.Generate();
      billToFinilize.SetFinalDate(null);
      
      await scope.ServiceProvider
        .GetRequiredService<IRepository<Bill>>()
        .AddAsync(billToFinilize);
    }

    var finalizeBillMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", new[] { billToFinilize.Id })
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(finalizeBillMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var finalizedBill = await scope.ServiceProvider
        .GetRequiredService<IRepository<Bill>>()
        .SingleOrDefaultAsync(new GetByIdSpec<Bill>(billToFinilize.Id));

      Assert.NotNull(finalizedBill);
      Assert.True(finalizedBill.FinalDate.HasValue);
      Assert.False(finalizedBill.IsTemporary);
    }
  }
}
