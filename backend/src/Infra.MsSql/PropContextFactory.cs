using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using RealGimm.Infrastructure.Prop.Data;

namespace RealGimm.Infra.MsSql;

public class PropContextFactory : IDesignTimeDbContextFactory<PropDbContext>
{
  public PropDbContext CreateDbContext(string[] args)
  {
    var configuration = new ConfigurationBuilder()
      .AddCommandLine(args)
      .AddInMemoryCollection([
        new KeyValuePair<string, string?>("DatabaseProvider", "MsSqlServer")
      ])
      .Build();

    return new PropDbContext(configuration, null, null, null);
  }
}
