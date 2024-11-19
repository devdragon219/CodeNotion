using Quartz;

namespace FunctionalTests.Tasks;

public class TestsJobListener : IJobListener
{
  public string Name => nameof(TestsJobListener);
  public event Action<IJobExecutionContext, JobExecutionException?>? JobWasExecuted;

  Task IJobListener.JobExecutionVetoed(IJobExecutionContext context, CancellationToken cancellationToken)
    => Task.CompletedTask;

  Task IJobListener.JobToBeExecuted(IJobExecutionContext context, CancellationToken cancellationToken)
    => Task.CompletedTask;

  Task IJobListener.JobWasExecuted(IJobExecutionContext context, JobExecutionException? jobException, CancellationToken cancellationToken)
  {
    JobWasExecuted!.Invoke(context, jobException);

    return Task.CompletedTask;
  }
}
