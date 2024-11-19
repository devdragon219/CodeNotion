using RealGimm.Core.Anag.Services;
using RealGimm.Core.Anag.OrgUnitAggregate;
using Xunit;

namespace RealGimm.IntegrationTests.Anag.OrgUnitData;

public class SuggestionService : BaseEfRepoTestFixture
{
  [Fact]
  public async Task OrgUnitSuggestion()
  {
    var suggestionService = new OrgUnitCodeSuggestionService(GetRepositoryOu());

    var nextCode = await suggestionService.SuggestNextCode(null, (OrgUnit?)null, null);

    Assert.NotNull(nextCode);
    Assert.False(string.IsNullOrEmpty(nextCode));
  }
}
