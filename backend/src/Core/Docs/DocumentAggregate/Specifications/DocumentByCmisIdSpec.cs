using Ardalis.Specification;

namespace RealGimm.Core.Docs.DocumentAggregate.Specifications;

public class DocumentByCmisIdSpec : Specification<Document>, ISingleResultSpecification<Document>
{
  public DocumentByCmisIdSpec(string cmisId)
  {
    Query.Where(document => document.CmisId == cmisId);
  }
}
