using HotChocolate.Types;

namespace RealGimm.Core.Taxes.Tables;

[UnionType("TaxConfigMainTableRow")]
public interface ITaxConfigMainTableRow
{
  public int Id { get; }
  public int Year { get; }
}
