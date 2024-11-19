namespace RealGimm.SharedKernel.Interfaces;

public interface IUpstreamDataImporter
{
  Task PerformUpstreamUpdate(CancellationToken cancellationToken);
  int ExecutionOrder { get; }
}
