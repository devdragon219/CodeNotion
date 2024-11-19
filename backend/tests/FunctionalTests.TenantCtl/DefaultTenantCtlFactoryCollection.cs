using Xunit;

namespace RealGimm.FunctionalTests.TenantCtl;

/// <summary>
/// <para>
/// This class has no code, and is never created.
/// </para>
/// <para>
/// Its purpose is simply to be the place to apply [<see cref="CollectionDefinitionAttribute"/>]
/// and all the <see cref="ICollectionFixture{TFixture}"/> interfaces.
/// </para>
/// <see href="https://xunit.net/docs/shared-context.html"/>
/// </summary>
[CollectionDefinition(nameof(DefaultTenantCtlFactoryCollection))]
public class DefaultTenantCtlFactoryCollection : ICollectionFixture<TenantCtlFactory>
{
}
