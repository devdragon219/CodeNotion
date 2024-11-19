namespace RealGimm.Web.Common.Models;

public record TaxConfigInput
{
  public TaxConfigSubValueRowInput[]? SubValues { get; init; }
  public TaxConfigSubValueColumnInput[]? ColumnValues { get; init; }
}
