using RealGimm.Core.Taxes.SubTables;
using RealGimm.Core.Taxes.Tables;

namespace RealGimm.Web.Common.Models;

public record TaxConfigValueBundle(
  TaxCalculator Calculator,
  ITaxConfigMainTableRow MainValue,
  Dictionary<string, ITaxConfigSubTableRow[]> AllSubTableValues);
