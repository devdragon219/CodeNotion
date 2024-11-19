using RealGimm.Core.Anag.Services;
using RealGimm.Core.Anag.SubjectAggregate;
using Xunit;

namespace RealGimm.IntegrationTests.Anag.SubjectData;

public class SuggestionService : BaseEfRepoTestFixture
{
  [Fact]
  public async Task SubjectSuggestion()
  {
    var suggestionService = new SubjectCodeSuggestionService(GetSubjRepository());

    var nextCode = await suggestionService.SuggestNextCode(null, (Subject?)null, null);

    Assert.NotNull(nextCode);
    Assert.False(string.IsNullOrEmpty(nextCode));
  }
}
