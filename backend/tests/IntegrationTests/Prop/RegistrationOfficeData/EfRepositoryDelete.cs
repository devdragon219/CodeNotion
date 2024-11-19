using RealGimm.Core.Prop.RegistrationOfficeAggregate;
using Xunit;

namespace RealGimm.IntegrationTests.Prop.RegistrationOfficeData;

public class EfRepositoryDelete : BaseEfRepoTestFixture
{
  [Fact]
  public async Task DeletesItemAfterAddingIt()
  {
    // add a project
    var testOffice = "testOffice";
    var testOfficeCode = Guid.NewGuid().ToString();
    var repository = GetRepository();
    var office = new RegistrationOffice();
    office.SetDescription(testOffice);
    office.SetCity(7);
    office.SetExternalCode(testOfficeCode);

    await repository.AddAsync(office);

    // delete the item
    await repository.DeleteAsync(office);

    // verify it's no longer there
    Assert.DoesNotContain(await repository.ListAsync(),
        office => office.Description == testOffice);
  }
}
