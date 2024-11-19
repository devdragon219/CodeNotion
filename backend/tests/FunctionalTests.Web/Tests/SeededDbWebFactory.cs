namespace RealGimm.FunctionalTests.Web.Tests;

public sealed class SeededDbWebFactory : WebFactory
{
  public SeededDbWebFactory() : this(options: null)
  {
  }

  private SeededDbWebFactory(DelegatedApiFactoryOptions? options)
    : base("postgis/postgis:14-3.3-alpine", "rg5_web_seeded", seedDefaultData: true, options)
  {
  }

  protected override SeededDbWebFactory CreateDelegatedApiFactory(DelegatedApiFactoryOptions options)
    => new(options);
}
