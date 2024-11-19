using RealGimm.Plugin.Import.Asst.Models;

namespace RealGimm.ImportTests.Asst;

internal record FakeImportData(
  Dictionary<string, IEnumerable<AddressDTO>> EstateAddresses,
  Dictionary<string, SimpleCodeDTO> EstateBuildingTypes,
  Dictionary<string, SimpleCodeDTO> EstateOwnershipTypes,
  Dictionary<string, SimpleCodeDTO> UsageMacroTypes,
  Dictionary<string, SimpleCodeDTO> UsageTypes,
  Dictionary<string, EstateSubUnitDTO[]> EstateSubUnitsByUnit,
  Dictionary<string, string> EstateUnitNotes,
  IEnumerable<EstateDTO> Estates,
  IEnumerable<EstateUnitDTO> EstateUnits,
  Dictionary<string, FloorDTO> AllFloors,
  Dictionary<string, string[]> FloorsByEstate,
  Dictionary<string, StairDTO[]> StairsByEstate,
  Dictionary<string, EstateUnitOriginActDTO> EstateUnitOriginActs,
  Dictionary<string, FunctionAreaDTO> AllFunctionAreas,
  Dictionary<string, EstateUnitSurfaceDTO[]> EstateUnitSurfaces,
  Dictionary<string, CadastralUnitDTO> CadastralUnits,
  Dictionary<string, CadastralCoordinateDTO[]> CadastralCoordinates
);
