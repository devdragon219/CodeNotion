using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using Xunit;

namespace RealGimm.IntegrationTests.Asst.Data;

public class EfRepositoryAdd : BaseEfRepoTestFixture
{
  [Fact]
  public async Task AddsEstateAndSetsId()
  {
    var testEstateName = "testEstate";
    var testEstateStatus = EstateStatus.Operational;
    var repository = GetAsstRepository<Estate>();
    var estate = new Estate();
    estate.SetName(testEstateName);
    estate.SetInternalCode("ES0123");
    estate.SetStatus(testEstateStatus);
    estate.SetType(EstateType.UrbanPlot);
    estate.SetOwnership(EstateOwnership.Easement);
    var emut = new EstateMainUsageType();
    emut.SetName("Main Usage");
    emut.SetInternalCode("C001");
    estate.SetMainUsageType(emut);
    var eut = new EstateUsageType();
    eut.SetName("Usage");
    eut.SetInternalCode("C001");
    estate.SetUsageType(eut);
    estate.SetManagement(7, null);

    await repository.AddAsync(estate);

    var newEstate = (await repository.ListAsync())
                    .FirstOrDefault();

    Assert.Equal(testEstateName, newEstate?.Name);
    Assert.Equal(testEstateStatus, newEstate?.Status);
    Assert.Equal(EstateType.UrbanPlot, newEstate?.Type);
    Assert.Equal(7, newEstate?.ManagementSubjectId);
    Assert.True(newEstate?.Id > 0);
  }
}
