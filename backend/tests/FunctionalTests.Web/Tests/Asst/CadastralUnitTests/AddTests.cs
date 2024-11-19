using HotChocolate.Execution;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate.Specifications;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Web.Asst.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CadastralUnitTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : BaseCadastralUnitMutationTest
{
  public const string AddCadastralUnitMutation = $$"""
    mutation($input: {{nameof(CadastralUnitInput)}}!) {
      cadastralUnit {
        addCadastralUnit(input: $input) {
          {{ResultFragment}}
        }
      }
    }
    """;

  public AddTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_AddCadastralUnit()
  {
    // Arrange
    using var firstScope = Provider.CreateScope();
    var usageTypeRepo = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();
    var mainUsageTypeRepo = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateMainUsageType>>();

    var usageType = new EstateUsageTypeFaker().Generate();
    await usageTypeRepo.AddAsync(usageType);
    var mainUsageType = new EstateMainUsageTypeFaker().Generate();
    await mainUsageTypeRepo.AddAsync(mainUsageType);

    var managementSubject = CreateManagementSubject(id: 1);
    var estateUnit = CreateEstateUnit(id: 1,
      CreateEstate(id: 1,
        managementSubject.Id,
        await usageTypeRepo.AsQueryable().FirstAsync(),
        await mainUsageTypeRepo.AsQueryable().FirstAsync()));

    // seeding data

    var subjectRepository = firstScope.ServiceProvider.GetRequiredService<IRepository<Subject>>();
    var estateUnitRepository = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateUnit>>();

    await subjectRepository.AddAsync(managementSubject);
    await estateUnitRepository.AddAsync(estateUnit);


    var input = CreateCadastralUnitInput(estateUnit, shouldCreateExpenses: false, shouldCreateUnavailabilities: false);
    var addCadastralUnitMutation = QueryRequestBuilder.New()
      .SetQuery(AddCadastralUnitMutation)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addCadastralUnitMutation);

    // Assert
    AssertSuccessGraphQLQueryResult(result);
    await Verify(result);

    var cadastralUnitId = result!.Data!
      .GetDictionaryValue("cadastralUnit")
      .GetDictionaryValue("addCadastralUnit")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    using (var scope = Provider.CreateScope())
    {
      var cadastralUnitRepository = scope.ServiceProvider.GetRequiredService<IRepository<CadastralUnit>>();

      var addedCadastralUnit = await cadastralUnitRepository
        .AsQueryable(new GetByIdSpec<CadastralUnit>(cadastralUnitId), new CadastralUnitIncludeAllSpec())
        .SingleOrDefaultAsync();

      Assert.NotNull(addedCadastralUnit);
      AssertHelper.Asst.CadastralUnitEqual(input, addedCadastralUnit);
    }
  }
}
