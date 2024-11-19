using RealGimm.Plugin.Import.Asst;
using RealGimm.Plugin.Import.Asst.Models;

namespace RealGimm.ImportTests.Asst;

internal sealed class FakeDefaultAsstDataImporter : DefaultAsstDataImporter
{
  public required FakeImportData FakeImportData { get; init; }

  internal override Task<Dictionary<string, IEnumerable<AddressDTO>>> EstateAddresses(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.EstateAddresses);

  internal override Task<Dictionary<string, SimpleCodeDTO>> EstateBuildingTypes(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.EstateBuildingTypes);

  internal override Task<Dictionary<string, SimpleCodeDTO>> EstateOwnershipTypes(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.EstateOwnershipTypes);

  internal override Task<Dictionary<string, SimpleCodeDTO>> UsageMacroTypes(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.UsageMacroTypes);

  internal override Task<Dictionary<string, SimpleCodeDTO>> UsageTypes(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.UsageTypes);

  internal override Task<Dictionary<string, EstateSubUnitDTO[]>> EstateSubUnitsByUnit(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.EstateSubUnitsByUnit);

  internal override Task<Dictionary<string, string>> EstateUnitNotes(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.EstateUnitNotes);

  internal override Task<(
    IEnumerable<EstateDTO> Estates,
    Dictionary<string, string[]> Equivalences)> Estates(CancellationToken cancellationToken)
    => Task.FromResult(
      (FakeImportData.Estates,
      FakeImportData.Estates.ToDictionary(e => e.InternalCode!, e => new[] { e.InternalCode! }))
      );

  internal override Task<(
    IEnumerable<EstateUnitDTO> EstateUnits,
    Dictionary<string, string[]> ExternalIdEquivalences
    )> EstateUnits(
      Dictionary<string, string[]>? estateEquivalences,
      CancellationToken cancellationToken)
    => Task.FromResult(
      (FakeImportData.EstateUnits,
      FakeImportData.EstateUnits.ToDictionary(eu => eu.Id, eu => new[] { eu.Id }))
    );

  internal override Task<Dictionary<string, FloorDTO>> AllFloors(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.AllFloors);

  internal override Task<Dictionary<string, string[]>> FloorsByEstate(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.FloorsByEstate);

  internal override Task<Dictionary<string, StairDTO[]>> StairsByEstate(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.StairsByEstate);

  internal override Task<Dictionary<string, EstateUnitOriginActDTO>> EstateUnitOriginActs(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.EstateUnitOriginActs);

  internal override Task<Dictionary<string, FunctionAreaDTO>> AllFunctionAreas(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.AllFunctionAreas);

  internal override Task<Dictionary<string, EstateUnitSurfaceDTO[]>> EstateUnitSurfaces(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.EstateUnitSurfaces);

  internal override Task<Dictionary<string, CadastralUnitDTO>> CadastralUnits(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.CadastralUnits);

  internal override Task<Dictionary<string, CadastralCoordinateDTO[]>> CadastralCoordinates(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.CadastralCoordinates);
}
