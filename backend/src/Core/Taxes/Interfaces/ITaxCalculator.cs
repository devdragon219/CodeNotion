using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Taxes;

namespace RealGimm.Core.Taxes.Interfaces;

public interface ITaxCalculator
{
  Guid Identifier { get; }
  string Description { get; }
  Task<ITaxConfiguration> GetConfigurationAsync();
  Task FixDataSeedAsync();
  Task<bool> CheckApplicabilityAsync(CadastralUnit unit);
  Task<ConfigSection> GetCadastralUnitFormAsync(CadastralUnit unit);
  Task<bool> UpdateAsync(CadastralUnit unit, CancellationToken cancellationToken);
  Task<int> UpdateBatchAsync(IEnumerable<CadastralUnit> units, CancellationToken cancellationToken);
  Task UpdateToNewYearAsync(CancellationToken cancellationToken);
}
