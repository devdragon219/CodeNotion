using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using Xunit;

namespace RealGimm.IntegrationTests.Asst.Data;

public class EfRepositoryDelete : BaseEfRepoTestFixture
{
  [Fact]
  public async Task DeletesItemAfterAddingIt()
  {
    // add a project
    var repository = GetAsstRepository<Estate>();
    var initialName = Guid.NewGuid().ToString();
    var estate = new Estate();
    estate.SetName(initialName);
    estate.SetInternalCode(initialName);
    estate.SetStatus(EstateStatus.Operational);
    estate.SetType(EstateType.LandPlotUndeveloped);
    estate.SetOwnership(EstateOwnership.Loan);
    var emut = new EstateMainUsageType();
    emut.SetName("Main Usage");
    emut.SetInternalCode("C001");
    estate.SetMainUsageType(emut);
    var eut = new EstateUsageType();
    eut.SetName("Usage");
    eut.SetInternalCode("C001");
    estate.SetUsageType(eut);
    estate.SetManagement(5, null);
    
    await repository.AddAsync(estate);

    // delete the item
    await repository.DeleteAsync(estate);

    // verify it's no longer there
    Assert.DoesNotContain(await repository.ListAsync(),
        subj => subj.Name == initialName);
  }
}
