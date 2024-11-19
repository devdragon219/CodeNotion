using Microsoft.EntityFrameworkCore;

namespace RealGimm.Infrastructure;

public interface IMigrationScript
{
  void OnPreUp(DbContext context, IServiceProvider serviceProvider);
  void OnPostUp(DbContext context, IServiceProvider serviceProvider);
}

public interface IMigrationScript<TMigration> : IMigrationScript
{
}
