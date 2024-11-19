using RealGimm.Core.Common.CityAggregate;

namespace RealGimm.Plugin.Import.Prop;

public record DefaultLatePropImportWorkspace(
  bool DisableValidation,
  Dictionary<string, int> BillItemTypes,
  Dictionary<string, City> CitiesCache,
  Dictionary<string, int> SubjectsId
);
