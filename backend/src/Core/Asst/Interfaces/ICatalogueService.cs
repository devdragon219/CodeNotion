using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Asst.Interfaces;

public interface ICatalogueService
{
  Task<List<CatalogueOutput>> GetCatalogues(CancellationToken cancellationToken = default);
  string[] GetExcelHeaders();
  Task<FileCacheEntry> ExportToExcel(ICollection<CatalogueOutput> catalogues, CancellationToken cancellationToken = default);
}
