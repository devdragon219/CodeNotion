using RealGimm.Core.Common.ConfigAggregate;
using RealGimm.Core.Common.Interfaces;

namespace RealGimm.Core.Prop.Services;

public sealed class SepaXmlExportConfigurableModule : IConfigurableModule
{
  public const string GroupingPerMainCounterpartSubjectParameter = "grouping-per-main-counterpart-subject";

  public string[] ConfigurationParameters => [GroupingPerMainCounterpartSubjectParameter];
  public ConfigFunction Function => ConfigFunction.SepaXmlExport;
}
