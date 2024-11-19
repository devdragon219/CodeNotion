using HotChocolate.Types;

namespace RealGimm.Core.Taxes.SubTables;

[UnionType("TaxConfigSubTableRow")]
public interface ITaxConfigSubTableRow
{
  int Id { get; }
}
