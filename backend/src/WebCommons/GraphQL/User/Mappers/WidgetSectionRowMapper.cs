using RealGimm.Core.IAM.UserAggregate;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons.GraphQL.User.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.WebCommons.GraphQL.User.Mappers;

public sealed class WidgetSectionRowMapper : IMapper<WidgetSectionRowInput, WidgetSectionRow>
{
  private readonly IMapper _mapper;

  public WidgetSectionRowMapper(IMapper mapper)
  {
    _mapper = mapper;
  }

  public async Task<WidgetSectionRow?> MapAsync(
    WidgetSectionRowInput? from,
    WidgetSectionRow? into,
    CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    var widgetSetcionRow = into ?? new WidgetSectionRow() { Id = from.Id.GetValueOrDefault() };
    widgetSetcionRow.SetOrder(from.Order);
    
    await _mapper.UpdateCollectionAsync(from.Widgets, widgetSetcionRow.Widgets, cancellationToken);

    return widgetSetcionRow;
  }
}
