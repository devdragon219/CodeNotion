using Microsoft.Extensions.Logging;
using RealGimm.Core.Mtnt.Interfaces;

namespace RealGimm.Core.Econ;

public class EconDataSeeder : IModuleDataSeeder
{
  private readonly ILogger<EconDataSeeder> _log;

  public EconDataSeeder(ILogger<EconDataSeeder> log)
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
