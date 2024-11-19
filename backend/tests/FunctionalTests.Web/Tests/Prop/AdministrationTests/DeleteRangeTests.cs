using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Prop.AdministrationAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Infrastructure.Prop.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.AdministrationTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      administration {
        deleteRange(ids: $ids) {
          {{GraphQLHelper.ResultFragment()}}
        }
      }
    }
    """;

  public DeleteRangeTests(EmptyDbWebFactory factory) : base(factory)
  {
  }


  [Fact]
  public async Task Should_DeleteRange()
  {
    // Arrange
    Administration[] administrationsToKeep;
    Administration[] administrationsToDelete;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var subject = await scope.ServiceProvider
        .GetRequiredService<IRepository<Subject>>()
        .AddAsync(new ManagementSubjectFaker().Generate());

      var usageTypes = await scope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>()
        .AddRangeAsync(new EstateUsageTypeFaker().Generate(2));

      var mainUsageTypes = await scope.ServiceProvider.GetRequiredService<IRepository<EstateMainUsageType>>()
        .AddRangeAsync(new EstateMainUsageTypeFaker().Generate(2));

      var estates = await scope.ServiceProvider
        .GetRequiredService<IRepository<Estate>>()
        .AddRangeAsync(new Fakers.Asst.EstateFaker {
            ManagementSubjectId = subject.Id,
            UsageTypes = usageTypes,
            MainUsageTypes = mainUsageTypes
          }.Generate(1));

      var faker = new AdministrationFaker
      {
        Subjects = new[] { subject },
        EstatesIds = estates.Select(estate => estate.Id)
      };
      
      administrationsToKeep = faker.Generate(2).ToArray();
      administrationsToDelete = faker.Generate(2).ToArray();

      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Administration>>();
      await repository.AddRangeAsync(administrationsToKeep);
      await repository.AddRangeAsync(administrationsToDelete);
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", administrationsToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Administration>>();

      var remainingAdministrations = await repository.ListAsync();
      Assert.True(administrationsToKeep.Zip(remainingAdministrations).All(pair => pair.First.Id == pair.Second.Id));
    }
  }
}
