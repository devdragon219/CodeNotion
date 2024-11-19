using RealGimm.SharedKernel;

namespace RealGimm.Core.Docs.Interfaces;

public interface IEstatePortfolioService
{
  Task<Guid?> ExportToFile(int? preferredLCID, int estateId, string[] cmisIds, CancellationToken cancellationToken = default);
}
