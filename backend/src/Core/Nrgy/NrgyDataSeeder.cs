using Microsoft.Extensions.Logging;
using RealGimm.Core.Mtnt.Interfaces;

namespace RealGimm.Core.Nrgy;

public class NrgyDataSeeder : IModuleDataSeeder
{
  private readonly ILogger<NrgyDataSeeder> _log;

  public NrgyDataSeeder(ILogger<NrgyDataSeeder> log)
  {
    _log = log;
  }

  public Task InitializeAsync()
  {
    return Task.CompletedTask;
  }

  public Task UpdateAsync()
  {
    return Task.CompletedTask;
  }
}
