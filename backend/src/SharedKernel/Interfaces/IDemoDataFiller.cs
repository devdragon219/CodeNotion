using System.Reflection.Metadata;

namespace RealGimm.SharedKernel.Interfaces;

public interface IDemoDataFiller
{
  Task FillAsync(bool shortData, CancellationToken cancellationToken);
  int ExecutionOrder { get; }
}