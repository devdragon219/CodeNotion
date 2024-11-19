using Microsoft.Extensions.Logging;
using RealGimm.Core.EventSystem;
using Rebus.Handlers;
using Quartz;

namespace RealGimm.Tasks;

public class RunTaskHandler : IHandleMessages<RunTaskEvent>
{
  public required ILogger<RunTaskHandler> Logger { protected get; init; }
  public required ISchedulerFactory SchedulerFactory { protected get; init; }

  public async Task Handle(RunTaskEvent message)
  {
    var scheduler = await SchedulerFactory.GetScheduler();
    var jobKey = new JobKey(message.JobIdentifier);

    if (!await scheduler.CheckExists(jobKey))
    {
      Logger.LogWarning("Was asked to start job {jobName} but it is not registered in the system.",
        message.JobIdentifier);

      return;
    }

    Logger.LogInformation("Triggering job {jobName} because of explicit request at {dateTime}",
      message.JobIdentifier,
      message.Date);

    await scheduler.TriggerJob(jobKey);
  }

}