using HotChocolate.Execution;
using RealGimm.Core.IAM;
using RealGimm.Web.Admin.Models;
using Xunit.Abstractions;
using RealGimm.FunctionalTests.Web.Extensions;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.IAM.GroupAggregate;
using RealGimm.Core.IAM.GroupAggregate.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;

namespace RealGimm.FunctionalTests.Web.Tests.Admin.AdminTests.GroupTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddGroupTest : EmptyDbWebTest
{
  
  private readonly ITestOutputHelper _output;

  public AddGroupTest(EmptyDbWebFactory factory, ITestOutputHelper output) : base(factory)
  {
    _output = output;
  }

  public const string AddGroupMutation = """
    mutation($groupInput: AdminGroupInput!) {
      admin {
        addGroup(groupInput: $groupInput) {
          isSuccess
          status
          value {
            name
            description
            id
            features {
              feature
              groupId
              canRead
              canCreate
              canUpdate
              canDelete
            }
          }
          validationErrors {
            identifier
            errorMessage
            errorCode
            severity
          }
        }
      }
    }
    """;


  [Fact]
  public async Task Should_AddGroup()
  {
    var groupRepo = Provider.GetRequiredService<IRepository<Group>>();

    var groupFeatures = CreateGroupFeatures();

    AdminGroupInput adminGroupInput = new("TestGroupName", "TestGroupDescription", groupFeatures);

    var addGroupMutation = QueryRequestBuilder.New()
      .SetQuery(AddGroupMutation)
      .SetVariableValue("groupInput", adminGroupInput)
      .SetUser(GetAdminClaims())
      .Create();

    var result = await ExecuteGraphQLQueryAsync(addGroupMutation);
    AssertSuccessGraphQLQueryResult(result);

    await Verify(result);

    var groupId = result!.Data!
      .GetDictionaryValue("admin")
      .GetDictionaryValue("addGroup")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    var addedGroup = await groupRepo
      .AsQueryable(new GetByIdSpec<Group>(groupId), new GroupIncludeAllSpec())
      .FirstOrDefaultAsync();

    Assert.NotNull(addedGroup);

    AssertHelper.Equal(adminGroupInput, addedGroup, AssertGroupEqual);
  }

  private AdminGroupFeatureInput[] CreateGroupFeatures()
  {
    AdminGroupFeatureInput f_subBase = new(Features.ANAG_SUBJECT_BASE, false, true, true, true),
                           f_subCategory = new(Features.ANAG_SUBJECT_CATEGORY, true, false, true, false),
                           f_estateUnitBase = new(Features.ASST_ESTATEUNIT_BASE, false, false, true, false);

    return new AdminGroupFeatureInput[] { f_subBase, f_subCategory, f_estateUnitBase };
  }

  private void AssertGroupEqual(AdminGroupInput adminGroupInput, Group group)
  {
    Assert.Equal(adminGroupInput.Name, group.Name);
    Assert.Equal(adminGroupInput.Description, group.Description);
      

    if(adminGroupInput.Features is not null && group.Features is not null)
    {
      var inputFeatures = adminGroupInput.Features.Select(e => e.Feature);
      var groupFeatures = group.Features.Select(e => e.Feature);

      Assert.True(inputFeatures.All(groupFeatures.Contains));
    }

  }
}
