using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.WebCommons.GraphQL.User.Models;

public class WidgetSectionInput : IMaybeIdentifiable
{
  [GraphQLIgnore]
  public int Order { get; set; }

  public int? Id { get; init; }
  public string? Title { get; init; }
  public string? BackgroundColor { get; init; }
  public WidgetSectionRowInput[] Rows { get; init; } = [];
}
