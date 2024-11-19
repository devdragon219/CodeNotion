using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Prop.Models;
using RealGimm.FunctionalTests.Web.Fakers.Prop;
using RealGimm.Core.Prop.AdministrationAggregate;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Core.Prop.AdministrationAggregate.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Infrastructure.Asst.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.AdministrationTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($estateId: Int!, $inputs: [{{nameof(AdministrationInput)}}!]!) {
      administration {
        add(estateId: $estateId, inputs: $inputs) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Prop.AdministrationFragment()
          )}}
        }
      }
    }
    """;

  public AddTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_Add()
  {
    await using (var scope = Provider.CreateAsyncScope())
    {
        var subRepo = scope.ServiceProvider.GetRequiredService<IRepository<Subject>>();
        var estateRepo = scope.ServiceProvider.GetRequiredService<IRepository<Estate>>();
        var admRepo = scope.ServiceProvider.GetRequiredService<IRepository<Administration>>();
        var usageTypeRepo = scope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();
        var mainUsageTypeRepo = scope.ServiceProvider.GetRequiredService<IRepository<EstateMainUsageType>>();

        var managementSubject = new ManagementSubjectFaker().Generate();
        await subRepo.AddAsync(managementSubject);

        await usageTypeRepo.AddRangeAsync(new EstateUsageTypeFaker().Generate(2));
        await mainUsageTypeRepo.AddRangeAsync(new EstateMainUsageTypeFaker().Generate(2));

        var estate = new Fakers.Asst.EstateFaker {
            ManagementSubjectId = managementSubject.Id,
            UsageTypes = await usageTypeRepo.AsQueryable().ToListAsync(),
            MainUsageTypes = await mainUsageTypeRepo.AsQueryable().ToListAsync(),
          }.Generate();
        await estateRepo.AddAsync(estate);

        var faker = new AdministrationInputFaker
        {
          Subjects = new[] { managementSubject },
          EstatesIds = new[] { estate.Id }
        };

        var inputs = faker.Generate(1);

        var insertAdministrationMutation = QueryRequestBuilder.New()
          .SetQuery(Mutation)
          .SetVariableValue("inputs", inputs)
          .SetVariableValue("estateId", estate.Id)
          .SetUser(GetAdminClaims())
          .Create();

        var result = await ExecuteGraphQLQueryAsync(insertAdministrationMutation);

        Assert.NotNull(result);
        Assert.True(result.IsSuccess());

        var administrationsIds = result!.Data!
          .GetDictionaryValue("administration")
          .GetDictionaryValue("add")
          .GetListOfDictionariesValue("value")
          .Select(value => value.GetValue<int>("id"));

        var addedAdministrations = await admRepo.AsQueryable(new GetByIdsSpec<Administration>(administrationsIds), new AdministrationIncludeAllSpec()).ToListAsync();

        Assert.Equal(inputs.Count(), addedAdministrations.Count);

        foreach (var (input, administration) in inputs.Zip(addedAdministrations))
        {
          AssertHelper.Prop.AdministrationEqual(input, administration);
        }

        await Verify(result);
      }
    }
  }
