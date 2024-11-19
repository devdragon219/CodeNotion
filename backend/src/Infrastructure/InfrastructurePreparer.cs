using RealGimm.Infrastructure.Mtnt.Data;
using RealGimm.SharedKernel.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.Infrastructure;

public class InfrastructurePreparer : IInfrastructurePreparer
{
  private readonly MigrationService _migrationService;
  private readonly MtntDbContext _mtnt;

  public InfrastructurePreparer(MtntDbContext mtnt, MigrationService migrationService)
  {
    _migrationService = migrationService;
    _mtnt = mtnt;
  }

  public async Task PrepareAsync(CancellationToken cancellationToken = default)
  {
    if (_mtnt.Database.IsInMemory())
    {
      await _mtnt.Database.EnsureCreatedAsync(cancellationToken);
      return;
    }
    
    await _migrationService.Setup(_mtnt);
    await _migrationService.Migrate(_mtnt, cancellationToken);
  }
}
