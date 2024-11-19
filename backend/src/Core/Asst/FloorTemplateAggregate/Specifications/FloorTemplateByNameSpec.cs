using Ardalis.Specification;

namespace RealGimm.Core.Asst.FloorTemplateAggregate.Specifications;

public class FloorTemplateByNameSpec : Specification<FloorTemplate>
{
  public FloorTemplateByNameSpec(string name)
  {
    Query.Where(template => template.Name == name);
  }
}
