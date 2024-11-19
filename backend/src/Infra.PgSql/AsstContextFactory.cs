using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using RealGimm.Infrastructure.Asst.Data;

namespace RealGimm.Infra.PgSql;

public class AsstContextFactory : IDesignTimeDbContextFactory<AsstDbContext>
{
  public AsstDbContext CreateDbContext(string[] args)
  {
    var configuration = new ConfigurationBuilder()
      .AddCommandLine(args)
      .AddInMemoryCollection([
        new KeyValuePair<string, string?>("DatabaseProvider", "PostgreSQL")
      ])
      .Build();

    return new AsstDbContext(configuration, null, null, null);
  }
}
