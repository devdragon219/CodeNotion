using Ardalis.Specification;

namespace RealGimm.Core.Asst.CadastralUnitAggregate.Specifications;

public class CadastralUnitByHistoryTagsSpec : Specification<CadastralUnit>
{
  public CadastralUnitByHistoryTagsSpec(Guid[] historyTags)
  {
    Query
      .Where(cadastralUnit => cadastralUnit.HistoryTags
        .Any(tag => historyTags.Contains(tag)));
  }
}
