namespace RealGimm.SharedKernel.Interfaces;

public interface IInfrastructurePreparer
{
  Task PrepareAsync(CancellationToken cancellationToken = default);
}
