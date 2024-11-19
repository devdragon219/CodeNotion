namespace RealGimm.Web.Common.Models;

public record TaxConfigSubValueRowInput
{
  public string? SubTable { get; init; }
  [GraphQLIgnore]
  public Dictionary<string, string> ColumnMappings { get; init; } = [];
  public TaxConfigSubValueColumnInput[] ColumnValues { get; init; } = [];
}
