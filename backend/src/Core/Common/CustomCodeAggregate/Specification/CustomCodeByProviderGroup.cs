using Ardalis.Specification;

namespace RealGimm.Core.Common.CustomCodeAggregate.Specification;

public class CustomCodeByProviderGroup : Specification<CustomCode>
{
  public CustomCodeByProviderGroup(Guid dataProvider, string group)
  {
    Query.Where(cc => cc.DataProvider == dataProvider && cc.Group == group);
  }
}
