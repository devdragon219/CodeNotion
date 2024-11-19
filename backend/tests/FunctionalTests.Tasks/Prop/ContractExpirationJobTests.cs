using FunctionalTests.Tasks;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Common;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.ContractAggregate.Tasks;
using RealGimm.FunctionalTests.Web.Tests.Prop.ContractTests;

namespace RealGimm.FunctionalTests.Tasks.Prop;

[Collection(nameof(EmptyDbCollection))]
public class ContractExpirationJobTests : JobTest<ContractExpirationJob>
{
  public ContractExpirationJobTests(EmptyDbHostProvider host) : base(host)
  {
  }

  [Fact]
  public async Task Should_CreateNotificationEvents_For_ContractNearToExpiration()
  {
    // Arrange
    Contract contractNearToExpiration;

    await using (var scope = Services.CreateAsyncScope())
    {
      var contractFaker = ContractTestsHelper.CreateContractFaker(
        await ContractTestsHelper.SeedEntities(scope.ServiceProvider));

      var todayDate = DateTime.UtcNow.ToDateOnly();
      contractNearToExpiration = contractFaker.Generate();
      contractNearToExpiration.SetStatus(EntryStatus.Working);
      contractNearToExpiration.SetTerminationDate(null);
      contractNearToExpiration.SetSecondTermDetails(null, secondTermExpirationDate: todayDate.AddDays(1));

      await scope.ServiceProvider
        .GetRequiredService<IRepository<Contract>>()
        .AddAsync(contractNearToExpiration);
    }

    // Act
    await ExecuteJobAsync();
  }
}
