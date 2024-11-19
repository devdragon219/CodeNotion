using FunctionalTests.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Shared.Tasks;

namespace RealGimm.FunctionalTests.Tasks.Shared;

[Collection(nameof(EmptyDbCollection))]
public class ExportCacheCleanJobTests : JobTest<ExportCacheCleanJob>
{
  public ExportCacheCleanJobTests(EmptyDbHostProvider host) : base(host)
  {
  }

  [Fact]
  public async Task Should_RunWithoutIssues()
  {
    // Arrange
    var configuration = Services.GetRequiredService<IConfiguration>();

    var filename1 = Path.Combine(configuration.CachePath(), Guid.NewGuid().ToString());
    var filename2 = Path.Combine(configuration.CachePath(), Guid.NewGuid().ToString());

    File.WriteAllText(filename1, filename1);
    File.WriteAllText(filename2, filename2);

    var newDate = DateTime.UtcNow
      .AddDays(-configuration.CacheDurationDays())
      .AddDays(-1);

    File.SetCreationTimeUtc(filename2, newDate);

    // Act
    await ExecuteJobAsync();

    // Assert
    Assert.True(File.Exists(filename1));
    Assert.False(File.Exists(filename2));
  }
}
