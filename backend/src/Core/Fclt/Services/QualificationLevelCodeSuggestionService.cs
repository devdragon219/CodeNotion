using RealGimm.Core.Fclt.QualificationLevelAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public class QualificationLevelCodeSuggestionService : CodeSuggestorBase<QualificationLevel>
{
  public QualificationLevelCodeSuggestionService(IReadRepository<QualificationLevel> repository) : base(repository)
  {
  }

  protected override string CreateCode(int unoccupiedNumber, QualificationLevel? partialEntity)
    => $"L{unoccupiedNumber.ToString().PadLeft(2, '0')}";
}
