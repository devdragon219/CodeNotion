using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using RealGimm.Core.Mtnt.Interfaces;

namespace RealGimm.Core.Fclt;

public class FcltDataSeeder : IModuleDataSeeder
{
  private readonly ILogger<FcltDataSeeder> _logger;
  private readonly IStringLocalizer _localizer;

  public FcltDataSeeder(
    ILogger<FcltDataSeeder> logger,
    IStringLocalizer localizer)
  {
    _logger = logger;
    _localizer = localizer;
  }

  public Task InitializeAsync() => Task.CompletedTask;

  public Task UpdateAsync() => Task.CompletedTask;
}
