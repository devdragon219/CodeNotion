using HotChocolate;

namespace RealGimm.Core.IAM.UserAggregate;

public sealed class WidgetConfig : EntityBase
{
  [GraphQLIgnore]
  public int Order { get; private set; }

  public int Width { get; private set; }
  public string Type { get; private set; } = default!;

  public void SetOrder(int order) => Order = order;

  public void SetWidth(int width) => Width = width;

  public void SetType(string type) => Type = type;
}
