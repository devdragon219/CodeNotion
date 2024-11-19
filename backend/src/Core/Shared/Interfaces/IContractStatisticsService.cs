using RealGimm.Core.Prop.ContractAggregate.Models;

namespace RealGimm.Core.Shared.Interfaces;

public interface IContractStatisticsService
{
  Task<ContractStatisticsOutput> GetCurrentStatisticsAsync(CancellationToken cancellationToken);

  Task<(Dictionary<int, int[]> Daily, Dictionary<int, int[]> Monthly)> GetCommittedEstateUnitsAsync(CancellationToken cancellationToken);
}
