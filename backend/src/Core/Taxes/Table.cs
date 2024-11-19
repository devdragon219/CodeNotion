namespace RealGimm.Core.Taxes;

public record Table(
  string Code,
  RateAreaType Grouping,
  Column[] Columns,
  IEnumerable<string> Parameters,
  bool CanAddRemoveRows);
