using RealGimm.Plugin.Import.Prop.Models;

namespace RealGimm.ImportTests.Prop;

internal record FakeImportData(
  Dictionary<string, ContractTypeDTO> ContractTypes,
  Dictionary<string, CounterpartDTO[]> CounterpartsByContract,
  Dictionary<string, LocatedUnitDTO[]> LocatedUnitsByContract,
  Dictionary<string, TransactorDTO[]> TransactorsByContract,
  IEnumerable<AdministrationDTO> AdministrationsFull,
  Dictionary<string, RecurringCostDTO[]> RecurringCostsByContract,
  IEnumerable<ContractDTO> Contracts,
  Dictionary<string, OneshotCostDTO[]> OneshotCostsByContract,
  Dictionary<string, RatePlanDTO[]> RatePlansByContract,
  Dictionary<string, SecurityDepositDTO[]> SecurityDepositsByContract,
  Dictionary<string, string> Sublocations);
