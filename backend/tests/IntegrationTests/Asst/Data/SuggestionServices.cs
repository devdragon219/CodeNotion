using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Asst.Services;
using Xunit;

namespace RealGimm.IntegrationTests.Asst.Data;

public class SuggestionServices : BaseEfRepoTestFixture
{
  [Fact]
  public async Task EstateCodeSuggestion()
  {
    var suggestionService = new EstateCodeSuggestionService(GetAsstRepository<Estate>());

    var nextCode = await suggestionService.SuggestNextCode(null, partialEntity: null, null);

    Assert.NotNull(nextCode);
    Assert.False(string.IsNullOrEmpty(nextCode));
  }

  [Fact]
  public async Task EstateUnitCodeSuggestion()
  {
    var estateRepo = GetAsstRepository<Estate>();
    var estate = new Estate();
    estate.SetName("testEstateName");
    estate.SetStatus(EstateStatus.Operational);
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
    estate.SetInternalCode("I001");
    estate.SetManagement(7, null);
    await estateRepo.AddAsync(estate);

    var suggestionService = new EstateUnitCodeSuggestionService(GetAsstRepository<Estate>());

    var nextCode = await suggestionService.SuggestNextCode(estate.Id, partialEntity: null, null);

    Assert.NotNull(nextCode);
    Assert.False(string.IsNullOrEmpty(nextCode));
  }

  [Fact]
  public async Task CadastralUnitCodeSuggestion()
  {
    var eu = await CreateEstateUnit("estateUnitName");

    var suggestionService = new CadastralUnitCodeSuggestionService(GetAsstRepository<EstateUnit>());

    var nextCode = await suggestionService.SuggestNextCode(eu.Id, partialEntity: null, null);

    Assert.NotNull(nextCode);
    Assert.False(string.IsNullOrEmpty(nextCode));
  }
}
