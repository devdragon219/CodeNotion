using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using RealGimm.Infrastructure.Anag.Data;

namespace RealGimm.Infra.PgSql;

public class AnagContextFactory : IDesignTimeDbContextFactory<AnagDbContext>
{
  public AnagDbContext CreateDbContext(string[] args)
  {
    var configuration = new ConfigurationBuilder()
      .AddCommandLine(args)
      .AddInMemoryCollection([
        new KeyValuePair<string, string?>("DatabaseProvider", "PostgreSQL")
      ])
      .Build();

    return new AnagDbContext(configuration, null, null, null);
  }
}
