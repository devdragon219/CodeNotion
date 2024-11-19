namespace RealGimm.SharedKernel.Interfaces;

public interface IAuditConfigurator
{
  void Configure(IServiceProvider provider);
  void Disable();
}
