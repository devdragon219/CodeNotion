using RealGimm.Core.IAM.UserAggregate;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons.GraphQL.User.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.WebCommons.GraphQL.User.Mappers;

public sealed class WidgetSectionMapper : IMapper<WidgetSectionInput, WidgetSection>
{
  private readonly IMapper _mapper;

  public WidgetSectionMapper(IMapper mapper)
  {
    _mapper = mapper;
  }

  public async Task<WidgetSection?> MapAsync(WidgetSectionInput? from, WidgetSection? into, CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    var widgetSection = into ?? new WidgetSection() { Id = from.Id.GetValueOrDefault() };
    widgetSection.SetOrder(from.Order);
    widgetSection.SetTitle(from.Title);
    widgetSection.SetBackgroundColor(from.BackgroundColor);
    
    await _mapper.UpdateCollectionAsync(from.Rows, widgetSection.Rows, cancellationToken);

    return widgetSection;
  }
}
