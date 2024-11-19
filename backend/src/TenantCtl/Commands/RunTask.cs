using McMaster.Extensions.CommandLineUtils;
using Microsoft.Extensions.DependencyInjection;
using Rebus.Bus;
using RealGimm.Core.EventSystem;
using RealGimm.Core;
using Quartz;
using System.Reflection;
using System.ComponentModel;

namespace RealGimm.TenantCtl.Commands;

[Command(Name = "run-task", Description = "Run a task by class name.")]
[HelpOption]
class RunTask
{
  [Argument(0, Description = "The name of the task to run.")]
  public string? Identifier { get; }

  private readonly IServiceProvider _services;

  public RunTask(IServiceProvider svc)
  {
    _services = svc;
  }

  private async Task<int> OnExecuteAsync(CommandLineApplication app, CancellationToken ct)
  {
    if (string.IsNullOrEmpty(Identifier))
    {
      app.Error.WriteLine("Please enter the task identifier.");
      ListAvailableTasks(app);

      return ErrorResults.E_MISSING_PARAMETERS;
    }

    var bus = _services.GetRequiredService<IBus>();

    await bus.Publish(new RunTaskEvent
    {
      JobIdentifier = Identifier
    });

    return 0;
  }

  private static void ListAvailableTasks(CommandLineApplication app)
  {
    var coreAssembly = typeof(AnyTenantJob).Assembly;

    var jobTypes = coreAssembly
      .GetTypes()
      .Where(type => type.IsAssignableTo(typeof(IJob)) && !type.IsAbstract)
      .ToList();

    if (jobTypes.Count == 0)
    {
      return;
    }

    var padding = jobTypes.Max(jt => jt.Name.Length) + 3;

    foreach (var jobType in jobTypes)
    {
      var descriptionAttribute = jobType.GetCustomAttribute<DescriptionAttribute>();

      var className = jobType.Name;
      var description = descriptionAttribute?.Description ?? string.Empty;

      app.Out.WriteLine($"{className.PadRight(padding)}{description}");
    }
  }
}
