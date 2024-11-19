namespace RealGimm.Infrastructure;

public interface IDatabaseDependentConfiguration
{
  SupportedDbDialect DbDialect { get; set; }
}
