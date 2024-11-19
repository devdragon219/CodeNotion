using Ardalis.Specification;

namespace RealGimm.Core.Docs.DocumentAggregate.Specifications;

public class DocumentsByCmisIdsSpec : Specification<Document>
{
  public DocumentsByCmisIdsSpec(IEnumerable<string> cmisIds)
  {
    Query.Where(document => cmisIds.Contains(document.CmisId));
  }
}
