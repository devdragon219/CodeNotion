using RealGimm.Plugin.Import.Common;
using RealGimm.Plugin.Import.Common.Models;

namespace RealGimm.ImportTests.Common;

internal sealed class FakeDefaultCommonDataImporter : DefaultCommonDataImporter
{
  public required FakeImportData FakeImportData { get; init; }

  internal override Task<IEnumerable<CityDTO>> GetCitiesFromAnag(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.CitiesFromAnag);

  internal override Task<IEnumerable<CityDTO>> GetCitiesFromAsst(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.CitiesFromAsst);

  internal override Task<Dictionary<string, BillItemTypeDTO>> GetBillItemTypes(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.BillItemTypes);

  internal override Task<Dictionary<string, VATRateDTO>> GetVATRates(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.VATRates);
}
