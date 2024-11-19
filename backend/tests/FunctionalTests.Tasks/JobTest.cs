using Microsoft.Extensions.DependencyInjection;
using Quartz;
using Quartz.Impl.Matchers;
using RealGimm.FunctionalTests.Tasks;

namespace FunctionalTests.Tasks;

public abstract class JobTest<TJob> : IAsyncLifetime
  where TJob : IJob
{ 
  private readonly ITestHostProvider _hostProvider;

  protected IServiceProvider Services => _hostProvider.GetHost().Services;

  protected JobTest(ITestHostProvider hostProvider)
  {
    _hostProvider = hostProvider;
  }
  
  protected async Task ExecuteJobAsync()
  {
    using var scope = Services.CreateScope();
    
    var scheduler = await scope.ServiceProvider
      .GetRequiredService<ISchedulerFactory>()
      .GetScheduler();

    var jobKey = new JobKey(typeof(TJob).Name);

    var jobListener = new TestsJobListener();
    scheduler.ListenerManager.AddJobListener(jobListener, KeyMatcher<JobKey>.KeyEquals(jobKey));

    var taskCompletionSource = new TaskCompletionSource();
    jobListener.JobWasExecuted += (_, exception) =>
    {
      if (exception is not null)
      {
        taskCompletionSource.SetException(exception);
        return;
      }

      taskCompletionSource.SetResult();
    };

    await scheduler.Start();
    await scheduler.TriggerJob(jobKey);
    await taskCompletionSource.Task;
    await scheduler.Shutdown();
  }

  public virtual Task InitializeAsync() => Task.CompletedTask;

  public virtual Task DisposeAsync() => _hostProvider.ResetTenantDatabaseAsync();
}
