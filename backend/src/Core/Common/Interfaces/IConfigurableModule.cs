using RealGimm.Core.Common.ConfigAggregate;

namespace RealGimm.Core.Common.Interfaces;

public interface IConfigurableModule
{
  string[] ConfigurationParameters { get; }
  ConfigFunction Function { get; }
}