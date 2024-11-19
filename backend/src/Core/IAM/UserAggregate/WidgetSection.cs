using HotChocolate;

namespace RealGimm.Core.IAM.UserAggregate;

public class WidgetSection : EntityBase
{
  [GraphQLIgnore]
  public int Order { get; private set; }

  public string? Title { get; private set; }
  public string? BackgroundColor { get; private set; }
  public NullSafeCollection<WidgetSectionRow> Rows { get; private set; } = [];

  public void SetOrder(int order) => Order = order;

  public void SetTitle(string? title) => Title = title;

  public void SetBackgroundColor(string? backgroundColor) => BackgroundColor = backgroundColor;
}
