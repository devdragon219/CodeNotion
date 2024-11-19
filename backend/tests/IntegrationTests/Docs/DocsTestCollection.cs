using RealGimm.IntegrationTests.Docs.Data;
using Xunit;

namespace RealGimm.IntegrationTests.Docs;

[CollectionDefinition(nameof(DocsTestCollection))]
public class DocsTestCollection : ICollectionFixture<CmisRepoFixture>
{
}