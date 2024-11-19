using FunctionalTests.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Common;
using RealGimm.Core.Prop.BillAggregate.Tasks;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Shared;
using RealGimm.FunctionalTests.Web.Tests.Prop.ContractTests;

namespace RealGimm.FunctionalTests.Tasks.Prop;

[Collection(nameof(EmptyDbCollection))]
public class GenerateBillsJobTests : JobTest<GenerateBillsJob>
{
  public GenerateBillsJobTests(EmptyDbHostProvider host) : base(host)
  {
  }

  [Fact]
  public async Task Should_GenerateBillsForContract()
  {
    // Arrange
    var currentDate = DateOnly.FromDateTime(DateTime.UtcNow);
    Contract contract;

    await using (var scope = Services.CreateAsyncScope())
    {
      var contractFaker = ContractTestsHelper.CreateContractFaker(
        await ContractTestsHelper.SeedEntities(scope.ServiceProvider));

      contract = contractFaker.Generate();
      contract.SetStatus(EntryStatus.Working);
      contract.SetSecondTermDetails(null, secondTermExpirationDate: null);
      contract.SetBillingEndDate(null);
      contract.SetBillingPeriod(BillingPeriod.Monthly);
      contract.RecurringAdditions.Clear();
      contract.OneshotAdditions.Clear();
      contract.Bills.Clear();

      await scope.ServiceProvider
        .GetRequiredService<IRepository<Contract>>()
        .AddAsync(contract);
    }

    // Act
    await ExecuteJobAsync();

    // Assert
    await using (var scope = Services.CreateAsyncScope())
    {
      var contractRepository = scope.ServiceProvider.GetRequiredService<IRepository<Contract>>();

      var bills = await contractRepository
        .AsQueryable()
        .Select(contract => contract.Bills)
        .SingleOrDefaultAsync();

      Assert.NotNull(bills);
      Assert.Equal(contract.Transactors.Count, bills.Count);
      
      await Verify(bills);
    }
  }
}
