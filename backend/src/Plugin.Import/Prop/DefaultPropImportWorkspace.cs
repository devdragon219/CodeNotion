using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Plugin.Import.Prop.Models;

namespace RealGimm.Plugin.Import.Prop;

public record DefaultPropImportWorkspace(
  bool DisableValidation,
  Dictionary<string, int> BillItemTypes,
  Dictionary<string, City> CitiesCache,
  Dictionary<string, int> ContractTypes,
  Dictionary<string, int> ManagementSubjectId,
  Dictionary<string, int> SubjectsId,
  Dictionary<string, int> EstateUnitIds,
  Dictionary<string, int> EstateSubUnitIds,
  Dictionary<string, Address[]> SubjectAddresses,
  Dictionary<string, CounterpartDTO[]> ContractCounterparts,
  Dictionary<string, LocatedUnitDTO[]> ContractUnits,
  Dictionary<string, TransactorDTO[]> ContractTransactors,
  Dictionary<int, int> EstateUnitBySubUnitId,
  Dictionary<string, int> BankAccountIds,
  Dictionary<string, int> EstateIds,
  Dictionary<string, RecurringCostDTO[]> RecurringCostsByContract,
  Dictionary<string, int> VatRateIds,
  Dictionary<string, OneshotCostDTO[]> OneshotCostsByContract,
  Dictionary<string, SecurityDepositDTO[]> SecurityDepositsByContract,
  Dictionary<string, RatePlanDTO[]> RatePlansByContract,
  Dictionary<string, string> Sublocations
);
