using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using RealGimm.Infrastructure.Mtnt.Data;

namespace RealGimm.Infra.PgSql;

public class MtntContextFactory : IDesignTimeDbContextFactory<MtntDbContext>
{
  public MtntDbContext CreateDbContext(string[] args)
  {
    var configuration = new ConfigurationBuilder()
      .AddCommandLine(args)
      .AddInMemoryCollection([
        new KeyValuePair<string, string?>("DatabaseProvider", "PostgreSQL")
      ])
      .Build();

    return new MtntDbContext(configuration, null, null);
  }
}
