namespace RealGimm.SharedKernel.Interfaces;

public interface ISingleTenantHandler
{
  bool CanHandle { get; }
  Task<bool> HandleSingleTenant(CancellationToken token = default);
}
