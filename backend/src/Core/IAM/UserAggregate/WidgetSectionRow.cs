using HotChocolate;

namespace RealGimm.Core.IAM.UserAggregate;

public class WidgetSectionRow : EntityBase
{
  [GraphQLIgnore]
  public int Order { get; private set; }

  public NullSafeCollection<WidgetConfig> Widgets { get; private set; } = [];

  public void SetOrder(int order) => Order = order;
}
