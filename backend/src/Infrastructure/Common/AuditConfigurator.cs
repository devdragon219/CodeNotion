using RealGimm.SharedKernel.Interfaces;
using Audit.Core;
using RealGimm.Core.Common.AuditLogAggregate;
using Microsoft.Extensions.Configuration;
using Audit.EntityFramework;

namespace RealGimm.Infrastructure.Common;

public class AuditConfigurator : IAuditConfigurator
{
  public void Configure(IServiceProvider provider)
  {
    var config = provider.GetService(typeof(IConfiguration)) as IConfiguration;

    Audit.Core.Configuration.Setup()
      .UseEntityFramework(ef => ef
        .UseDbContext(ev =>
        {
          var originalDbContext = (TrackableDbContext)ev.EntityFrameworkEvent.GetDbContext();
          return new Data.CommonDbContext(config, originalDbContext.UserDataProvider, null, null, originalDbContext.Tenant);
        })
        .DisposeDbContext()
        .AuditTypeMapper(t => typeof(AuditLog))
        .AuditEntityAction<AuditLog>((evt, entry, entity) =>
        {
          var userDataProvider = ((TrackableDbContext)evt.GetEntityFrameworkEvent().GetDbContext()).UserDataProvider;

          if(userDataProvider is null || userDataProvider.TenantId == Guid.Empty)
          {
            return Task.FromResult(false);
          }

          //Remove unchanged values from changes, if any
          if (entry.Changes is not null)
          {
            foreach (var change in entry.Changes.ToList())
            {
              if (change.NewValue is null
                && change.OriginalValue is null)
              {
                entry.Changes.Remove(change);
                continue;
              }
              if (change.NewValue != null
                && change.OriginalValue != null)
              {
                if (change.NewValue.Equals(change.OriginalValue))
                {
                  entry.Changes.Remove(change);
                  continue;
                }

                if (change.NewValue.GetType().IsArray)
                {
                  var newValue = (change.NewValue as Array)!.Cast<object>();
                  var originalValue = (change.OriginalValue as Array)!.Cast<object>();

                  if (newValue.SequenceEqual(originalValue))
                  {
                    entry.Changes.Remove(change);
                    continue;
                  }
                }
              }
            }
          }

          entity.AuditData = entry.ToJson();
          entity.AuditDate = DateTime.UtcNow;
          entity.AuditUser = userDataProvider?.Username ?? string.Empty;
          entity.EntityType = entry.EntityType.Name;
          entity.Action = entry.Action;
          entity.TablePk = entry.PrimaryKey.First().Value.ToString() ?? string.Empty;

          return Task.FromResult(true);
        })
        .IgnoreMatchedProperties(true));
  }

  public void Disable()
  {
    Audit.Core.Configuration.AuditDisabled = true;
  }
}
