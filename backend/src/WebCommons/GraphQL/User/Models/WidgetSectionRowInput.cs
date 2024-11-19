using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.WebCommons.GraphQL.User.Models;

public class WidgetSectionRowInput : IMaybeIdentifiable
{
  [GraphQLIgnore]
  public int Order { get; set; }

  public int? Id { get; init; }
  public WidgetConfigInput[] Widgets { get; init; } = [];
}
