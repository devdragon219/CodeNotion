using RealGimm.Core.IAM.UserAggregate;
using RealGimm.WebCommons.GraphQL.User.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.WebCommons.GraphQL.User.Mappers;

public sealed class WidgetConfigMapper : IMapper<WidgetConfigInput, WidgetConfig>
{
  public WidgetConfig? Map(WidgetConfigInput? from, WidgetConfig? into)
  {
    if (from is null)
    {
      return null;
    }

    var widgetConfig = into ?? new WidgetConfig() { Id = from.Id.GetValueOrDefault() };
    widgetConfig.SetOrder(from.Order);
    widgetConfig.SetWidth(from.Width);
    widgetConfig.SetType(from.Type);

    return widgetConfig;
  }

  Task<WidgetConfig?> IMapper<WidgetConfigInput, WidgetConfig>.MapAsync(
    WidgetConfigInput? from,
    WidgetConfig? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
