using System.Reflection;
using Microsoft.Extensions.Configuration;
using Quartz;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Tasks;

public static class ServiceCollectionExtensions
{
  public static void AddScheduledJobAndTrigger(
    this IServiceCollectionQuartzConfigurator quartz,
    Type jobType,
    IConfiguration config)
  {
    string jobName = jobType.Name;

    // Try and load the schedule from configuration
    var configKey = $"Jobs:{jobName}";
    var cronSchedule = config[configKey];

    // Some minor validation
    if (string.IsNullOrEmpty(cronSchedule))
    {
      var defaultSchedule = jobType.GetCustomAttribute<DefaultCronScheduleAttribute>();
      if (defaultSchedule is not null)
      {
        cronSchedule = defaultSchedule.DefaultSchedule;
      }
      else
      {
        throw new InvalidOperationException($"No Quartz.NET Cron schedule found for job in configuration at {configKey}");
      }
    }

    // register the job
    var jobKey = new JobKey(jobName);
    Action<IJobConfigurator> jobConfig = job => job.WithIdentity(jobKey);

    // quartz.AddJob<TJob>(jobConfig);
    typeof(Quartz.ServiceCollectionExtensions)
      .GetMethod(
        nameof(Quartz.ServiceCollectionExtensions.AddJob),
        new[] { typeof(IServiceCollectionQuartzConfigurator), typeof(Action<IJobConfigurator>) })!
      .MakeGenericMethod(jobType)
      .Invoke(null, new object[] { quartz, jobConfig });

    quartz.AddTrigger(opts => opts
      .ForJob(jobKey)
      .WithIdentity(jobName + "-trigger")
      .WithCronSchedule(cronSchedule));
  }

  public static void AddEndlessJobAndTrigger(
    this IServiceCollectionQuartzConfigurator quartz,
    Type jobType,
    IConfiguration config)
  {
    var jobName = jobType.Name;
    Action<IJobConfigurator> jobConfig = job => job.WithIdentity(jobName);

    // quartz.AddJob<TJob>(jobConfig);
    typeof(Quartz.ServiceCollectionExtensions)
      .GetMethod(
        nameof(Quartz.ServiceCollectionExtensions.AddJob),
        [typeof(IServiceCollectionQuartzConfigurator), typeof(Action<IJobConfigurator>)])!
      .MakeGenericMethod(jobType)
      .Invoke(null, [quartz, jobConfig]);

    quartz.AddTrigger(trigger => trigger
      .ForJob(jobName)
      .WithIdentity(jobName + "-trigger")
      .StartNow());
  }
}
