using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Web.Asst.Mapping;
using RealGimm.Web.Asst.Mutations;
using RealGimm.Web.Asst.Queries;

namespace RealGimm.IntegrationTests.Asst.Data;

public class EstateUnitTest : BaseEfRepoTestFixture
{
  [Fact]
  public async Task Should_GetEstateUnitList()
  {
    string EUName = Guid.NewGuid().ToString();

    await CreateEstateUnit(EUName);

    var estateUnitQueries = new EstateUnitQueries();

    var euList = (await estateUnitQueries.ListEstateUnits(GetRepositoryWebWrapperEU(), null))
      .ToList();

    var contains = euList.Any(eu => eu.Name == EUName);

    Assert.NotEmpty(euList);

    Assert.True(contains);
  }

  [Fact]
  public async Task Should_DeleteEstateUnits()
  {
    string EUName = Guid.NewGuid().ToString();
    var estateUnitIt = await CreateEstateUnit(EUName);
    var repo = GetAsstRepository<EstateUnit>();
    var estateUnitMutations = new EstateUnitMutations();
    var result = await estateUnitMutations.DeleteRange(new[] { estateUnitIt.Id }, repo);
    Assert.True(result.IsSuccess);

    var deleted = await repo.GetByIdAsync(estateUnitIt.Id, CancellationToken.None);
    Assert.NotNull(deleted?.DeletionDate);
  }

  [Fact]
  public async Task Should_DeleteEstateUnit()
  {
    string EUName = Guid.NewGuid().ToString();
    var estateUnitIt = await CreateEstateUnit(EUName);
    var repo = GetAsstRepository<EstateUnit>();
    var estateUnitMutations = new EstateUnitMutations();
    var result = await estateUnitMutations.Delete(estateUnitIt.Id, repo);
    Assert.True(result.IsSuccess);

    var deleted = await repo.GetByIdAsync(estateUnitIt.Id, CancellationToken.None);
    Assert.NotNull(deleted?.DeletionDate);
  }

  [Fact]
  public async Task Should_AddEstateUnitSurfaces()
  {
    var repo = GetAsstRepository<EstateUnit>();

    var eu = await CreateEstateUnit("testEstateUnit");
    var eus_input = CreateEstateUnitSurfaces();
    var eus = EstateUnitMapper.MapSurfaces(eus_input);

    Assert.True(eus != null);

    eu.SetSurfaces(eus);

    Assert.True(eu.Surfaces.Count == 2);
    Assert.True(eu.Surfaces.First().SurfaceSqMTotal == 200);
  }
}
