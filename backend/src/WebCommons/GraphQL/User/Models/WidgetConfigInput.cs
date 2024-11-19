using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.WebCommons.GraphQL.User.Models;

public class WidgetConfigInput : IMaybeIdentifiable
{
  [GraphQLIgnore]
  public int Order { get; set; }

  public int? Id { get; init; }
  public required int Width { get; init; }
  public required string Type { get; init; }
}
