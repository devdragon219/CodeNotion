namespace RealGimm.FunctionalTests.Tasks;

[CollectionDefinition(nameof(EmptyDbCollection))]
public class EmptyDbCollection : ICollectionFixture<EmptyDbHostProvider>
{
}
