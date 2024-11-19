using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using RealGimm.Infrastructure.Asst.Data;

namespace RealGimm.Infra.MsSql;

public class AsstContextFactory : IDesignTimeDbContextFactory<AsstDbContext>
{
  public AsstDbContext CreateDbContext(string[] args)
  {
    var configuration = new ConfigurationBuilder()
      .AddCommandLine(args)
      .AddInMemoryCollection([
        new KeyValuePair<string, string?>("DatabaseProvider", "MsSqlServer")
      ])
      .Build();

    return new AsstDbContext(configuration, null, null, null);
  }
}
