using Ardalis.Specification;

namespace RealGimm.Core.Docs.DocumentAggregate.Specifications;

public class DocumentsByEstateIdSpec : Specification<Document>
{
  public DocumentsByEstateIdSpec(int estateId)
  {
    var stringEstateId = estateId.ToString();

    Query.Where(document => document.EstateId == stringEstateId);
  }
}
