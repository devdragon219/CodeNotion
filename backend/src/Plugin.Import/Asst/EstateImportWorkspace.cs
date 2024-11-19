using RealGimm.Core.Asst.CadastralCategoryAggregate;
using RealGimm.Core.Asst.CadastralLandCategoryAggregate;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Plugin.Import.Asst.Models;

namespace RealGimm.Plugin.Import.Asst;

public record EstateImportWorkspace(
  bool DisableValidation,
  Dictionary<string, City> CitiesCache,
  Dictionary<string, IEnumerable<AddressDTO>> EstateAddresses,
  Dictionary<string, int> ManagementSubjectCodesIds,
  Dictionary<string, int> SubjectIds,
  Dictionary<string, int> CompanyGroupMembersIds,
  Dictionary<string, SimpleCodeDTO> EstateBuildingTypes,
  Dictionary<string, SimpleCodeDTO> EstateOwnershipTypes,
  Dictionary<string, EstateSubUnitDTO[]> EstateSubUnits,
  Dictionary<string, string> EstateUnitNotes,
  Dictionary<string, int> UsageMacroTypes,
  Dictionary<string, int> UsageTypes,
  //First element of the array is the alive estate, after that all thedeleted ones
  Dictionary<string, int[]> EstatesByInternalCode,
  //First element of the array is the alive estate unit, after that all the deleted ones
  Dictionary<string, int[]> EstateUnitsByInternalCode,
  Dictionary<string, FloorDTO> Floors,
  Dictionary<string, int> FunctionAreas,
  Dictionary<string, string[]> FloorsByEstate,
  Dictionary<string, StairDTO[]> StairsByEstate,
  Dictionary<string, EstateUnitOriginActDTO> EstateUnitOriginActs,
  Dictionary<string, CadastralCategory> CadastralCategoriesByCode,
  Dictionary<string, CadastralLandCategory> CadastralLandCategoriesByDescription
)
{
  public Dictionary<string, string[]>? EstateSourceCodeEquivalences { get; set; }
  public Dictionary<string, string[]>? EstateUnitSourceCodeEquivalences { get; set; }
}
