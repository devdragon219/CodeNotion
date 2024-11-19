namespace RealGimm.SharedKernel.Interfaces;

public interface ITenantPreparer
{
  Task PrepareAsync(CancellationToken cancellationToken);
  Task FillWithDemoDataAsync(bool shortData, CancellationToken cancellationToken);
}
