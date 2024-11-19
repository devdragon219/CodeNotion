using FunctionalTests.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Common;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.ContractAggregate.Tasks;
using RealGimm.Core.Prop.RegistryCommunicationAggregate.Tasks;
using RealGimm.FunctionalTests.Web.Tests.Prop.ContractTests;

namespace RealGimm.FunctionalTests.Tasks.Prop.ContractAggregate;

[Collection(nameof(EmptyDbCollection))]
public class ContractUpdateJobTests : JobTest<ContractUpdateJob>
{
  public ContractUpdateJobTests(EmptyDbHostProvider host) : base(host)
  {
  }

  [Fact]
  public async Task Should_UpdateTerminationDateAndSetStatusToFrozenClosed_For_WorkingContractsWithExpirationDateGreaterThanToday()
  {
    // Arrange
    Contract contractToUpdate;
    Contract contractToRemainUnchanged;

    await using (var scope = Services.CreateAsyncScope())
    {
      var contractFaker = ContractTestsHelper.CreateContractFaker(
        await ContractTestsHelper.SeedEntities(scope.ServiceProvider));

      contractToRemainUnchanged = contractFaker.Generate();
      contractToRemainUnchanged.SetStatus(EntryStatus.Working);
      contractToRemainUnchanged.SetTerminationDate(null);
      contractToRemainUnchanged.SetSecondTermDetails(null, secondTermExpirationDate: null);

      var todayDate = DateOnly.FromDateTime(DateTime.UtcNow);
      contractToUpdate = contractFaker.Generate();
      contractToUpdate.SetStatus(EntryStatus.Working);
      contractToUpdate.SetTerminationDate(null);
      contractToUpdate.SetSecondTermDetails(null, secondTermExpirationDate: todayDate.AddDays(-10));

      await scope.ServiceProvider
        .GetRequiredService<IRepository<Contract>>()
        .AddRangeAsync(new[] { contractToUpdate, contractToRemainUnchanged });
    }

    // Act
    await ExecuteJobAsync();

    // Assert
    await using (var scope = Services.CreateAsyncScope())
    {
      var contractRepository = scope.ServiceProvider.GetRequiredService<IRepository<Contract>>();

      var contracts = await contractRepository
        .AsQueryable()
        .Select(contract => new
        {
          contract.Id,
          contract.Status,
          contract.TerminationDate
        })
        .ToListAsync();

      Assert.Equal(2, contracts.Count);

      var updatedContract = Assert.Single(contracts, contract => contract.Id == contractToUpdate.Id);
      Assert.NotNull(updatedContract);
      Assert.Equal(EntryStatus.FrozenClosed, updatedContract.Status);
      Assert.Equal(contractToUpdate.SecondTermExpirationDate, updatedContract.TerminationDate);

      var unchangedContract = Assert.Single(contracts, contract => contract.Id == contractToRemainUnchanged.Id);
      Assert.NotNull(unchangedContract);
      Assert.Equal(contractToRemainUnchanged.TerminationDate, unchangedContract.TerminationDate);
      Assert.Equal(contractToRemainUnchanged.Status, unchangedContract.Status);
    }
  }
}
