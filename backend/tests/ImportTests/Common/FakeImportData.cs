using RealGimm.Plugin.Import.Common.Models;

namespace RealGimm.ImportTests.Common;

internal record FakeImportData(
  IEnumerable<CityDTO> CitiesFromAnag,
  IEnumerable<CityDTO> CitiesFromAsst,
  Dictionary<string, VATRateDTO> VATRates,
  Dictionary<string, BillItemTypeDTO> BillItemTypes);
