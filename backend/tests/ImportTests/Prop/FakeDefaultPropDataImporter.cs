using RealGimm.Plugin.Import.Prop;
using RealGimm.Plugin.Import.Prop.Models;

namespace RealGimm.ImportTests.Prop;

internal sealed class FakeDefaultPropDataImporter : DefaultPropDataImporter
{
  public required FakeImportData FakeImportData { get; init; }

  internal override Task<Dictionary<string, ContractTypeDTO>> ContractTypes(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.ContractTypes);

  internal override Task<Dictionary<string, CounterpartDTO[]>> CounterpartsByContract(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.CounterpartsByContract);

  internal override Task<Dictionary<string, LocatedUnitDTO[]>> LocatedUnitsByContract(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.LocatedUnitsByContract);

  internal override Task<IEnumerable<ContractDTO>> Contracts(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.Contracts);

  internal override Task<Dictionary<string, TransactorDTO[]>> TransactorsByContract(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.TransactorsByContract);
  
  internal override Task<IEnumerable<AdministrationDTO>> AdministrationsFull(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.AdministrationsFull);

  internal override Task<Dictionary<string, RecurringCostDTO[]>> RecurringCostsByContract(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.RecurringCostsByContract);

  internal override Task<Dictionary<string, OneshotCostDTO[]>> OneshotCostsByContract(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.OneshotCostsByContract);

  internal override Task<Dictionary<string, RatePlanDTO[]>> RatePlansByContract(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.RatePlansByContract);

  internal override Task<Dictionary<string, SecurityDepositDTO[]>> SecurityDepositsByContract(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.SecurityDepositsByContract);

  internal override Task<Dictionary<string, string>> GetSublocations(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.Sublocations);
}
