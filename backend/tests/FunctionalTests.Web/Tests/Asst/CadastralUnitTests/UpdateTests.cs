using Ardalis.Result;
using HotChocolate.Execution;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate.Specifications;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Web.Asst.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CadastralUnitTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : BaseCadastralUnitMutationTest
{
  public const string UpdateCadastralUnitMutation = $$"""
    mutation($id: Int!, $isVariation: Boolean, $input: {{nameof(CadastralUnitInput)}}!) {
      cadastralUnit {
        updateCadastralUnit(id: $id, isVariation: $isVariation, input: $input) {
          {{ResultFragment}}
        }
      }
    }
    """;

  public UpdateTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_Update()
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

    var cadastralUnitToUpdate = CreateCadastralUnit(id: 1, estateUnit);

    // seeding data

    var subjectRepository = firstScope.ServiceProvider.GetRequiredService<IRepository<Subject>>();
    var cadastralUnitRepository = firstScope.ServiceProvider.GetRequiredService<IRepository<CadastralUnit>>();

    await subjectRepository.AddAsync(managementSubject);
    await cadastralUnitRepository.AddAsync(cadastralUnitToUpdate);

    var input = CreateCadastralUnitInput(estateUnit, shouldCreateExpenses: true, shouldCreateUnavailabilities: true);
    var updateCadastralUnitMutation = QueryRequestBuilder.New()
      .SetQuery(UpdateCadastralUnitMutation)
      .SetVariableValue("id", cadastralUnitToUpdate.Id)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(updateCadastralUnitMutation);

    // Assert
    AssertSuccessGraphQLQueryResult(result);

    using (var scope = Provider.CreateScope())
    {
      var cadastralUnitRepository2 = scope.ServiceProvider.GetRequiredService<IRepository<CadastralUnit>>();

      var updatedCadastralUnit = await cadastralUnitRepository2
        .AsQueryable(new GetByIdSpec<CadastralUnit>(cadastralUnitToUpdate.Id), new CadastralUnitIncludeAllSpec())
        .SingleOrDefaultAsync();

      Assert.NotNull(updatedCadastralUnit);
      AssertHelper.Asst.CadastralUnitEqual(input, updatedCadastralUnit);
    }

    await Verify(result);
  }

  [Fact]
  public async Task Should_MakeVariation()
  {
    // Arrange
    using var firstScope = Provider.CreateScope();
    var usageTypeRepo = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();
    var mainUsageTypeRepo = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateMainUsageType>>();

    var usageType = new EstateUsageTypeFaker().Generate();
    await usageTypeRepo.AddAsync(usageType);
    var mainUsageType = new EstateMainUsageTypeFaker().Generate();
    await mainUsageTypeRepo.AddAsync(mainUsageType);

    var managementSubject = CreateManagementSubject(id: 100);
    var estateUnit = CreateEstateUnit(id: 100,
      CreateEstate(id: 100,
        managementSubject.Id,
        await usageTypeRepo.AsQueryable().FirstAsync(),
        await mainUsageTypeRepo.AsQueryable().FirstAsync()));

    var cadastralUnitToUpdate = CreateCadastralUnit(id: 100, estateUnit);

    // seeding data

    var subjectRepository = firstScope.ServiceProvider.GetRequiredService<IRepository<Subject>>();
    var cadastralUnitRepository = firstScope.ServiceProvider.GetRequiredService<IRepository<CadastralUnit>>();

    await subjectRepository.AddAsync(managementSubject);
    await cadastralUnitRepository.AddAsync(cadastralUnitToUpdate);

    var input = CreateCadastralUnitInput(estateUnit, shouldCreateExpenses: true, shouldCreateUnavailabilities: true) with
    {
      InternalCode = null
    };

    var updateCadastralUnitMutation = QueryRequestBuilder.New()
      .SetQuery(UpdateCadastralUnitMutation)
      .SetVariableValue("id", cadastralUnitToUpdate.Id)
      .SetVariableValue("isVariation", true)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(updateCadastralUnitMutation);

    // Assert
    AssertSuccessGraphQLQueryResult(result);

    using (var scope = Provider.CreateScope())
    {
      var cadastralUnitRepository2 = scope.ServiceProvider.GetRequiredService<IRepository<CadastralUnit>>();

      var updatedCadastralUnit = await cadastralUnitRepository2
        .AsQueryable(new CadastralUnitIncludeAllSpec())
        .OrderByDescending(x => x.Id)
        .FirstOrDefaultAsync();

      Assert.NotNull(updatedCadastralUnit);
      AssertHelper.Asst.CadastralUnitEqual(input, updatedCadastralUnit);
    }

    await Verify(result);
  }

  [Fact]
  public async Task Should_FailMakeVariation_When_InternalCodeIsNotNull()
  {
    // Arrange
    using var firstScope = Provider.CreateScope();
    var usageTypeRepo = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();
    var mainUsageTypeRepo = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateMainUsageType>>();

    var usageType = new EstateUsageTypeFaker().Generate();
    await usageTypeRepo.AddAsync(usageType);
    var mainUsageType = new EstateMainUsageTypeFaker().Generate();
    await mainUsageTypeRepo.AddAsync(mainUsageType);

    var managementSubject = CreateManagementSubject(id: 100);
    var estateUnit = CreateEstateUnit(id: 100,
      CreateEstate(id: 100,
        managementSubject.Id,
        await usageTypeRepo.AsQueryable().FirstAsync(),
        await mainUsageTypeRepo.AsQueryable().FirstAsync()));

    var cadastralUnitToUpdate = CreateCadastralUnit(id: 100, estateUnit);

    // seeding data

    var subjectRepository = firstScope.ServiceProvider.GetRequiredService<IRepository<Subject>>();
    var cadastralUnitRepository = firstScope.ServiceProvider.GetRequiredService<IRepository<CadastralUnit>>();

    await subjectRepository.AddAsync(managementSubject);
    await cadastralUnitRepository.AddAsync(cadastralUnitToUpdate);


    var input = CreateCadastralUnitInput(estateUnit, shouldCreateExpenses: true, shouldCreateUnavailabilities: true);

    var updateCadastralUnitMutation = QueryRequestBuilder.New()
      .SetQuery(UpdateCadastralUnitMutation)
      .SetVariableValue("id", cadastralUnitToUpdate.Id)
      .SetVariableValue("isVariation", true)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(updateCadastralUnitMutation);

    // Assert
    AssertSuccessGraphQLQueryResult(result);

    var resultStatus = result.Data!
      .GetDictionaryValue("cadastralUnit")
      .GetDictionaryValue("updateCadastralUnit")
      .GetValue<string>("status");

    Assert.Equal(ResultStatus.Forbidden, Enum.Parse<ResultStatus>(resultStatus, ignoreCase: true));
  }
}
