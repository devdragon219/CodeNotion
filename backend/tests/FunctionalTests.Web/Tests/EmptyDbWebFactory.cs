namespace RealGimm.FunctionalTests.Web.Tests;

public sealed class EmptyDbWebFactory : WebFactory
{
  public EmptyDbWebFactory() : this(options: null)
  {
  }

  private EmptyDbWebFactory(DelegatedApiFactoryOptions? options)
    : base("postgis/postgis:14-3.3-alpine", "rg5_web_empty", seedDefaultData: false, options)
  {
  }

  protected override EmptyDbWebFactory CreateDelegatedApiFactory(DelegatedApiFactoryOptions options)
    => new(options);
}
