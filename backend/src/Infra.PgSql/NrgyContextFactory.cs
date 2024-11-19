using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using RealGimm.Infrastructure.Nrgy.Data;

namespace RealGimm.Infra.PgSql;

public class NrgyContextFactory : IDesignTimeDbContextFactory<NrgyDbContext>
{
  public NrgyDbContext CreateDbContext(string[] args)
  {
    var configuration = new ConfigurationBuilder()
      .AddCommandLine(args)
      .AddInMemoryCollection([
        new KeyValuePair<string, string?>("DatabaseProvider", "PostgreSQL")
      ])
      .Build();

    return new NrgyDbContext(configuration, null, null, null);
  }
}
