using RealGimm.Core.IAM;
using RealGimm.Web.Admin.Models;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.IAM.GroupAggregate;
using HotChocolate.Execution;
using RealGimm.FunctionalTests.Web.Extensions;
using HotChocolate.Execution.Processing;
using RealGimm.Core;

namespace RealGimm.FunctionalTests.Web.Tests.Admin.AdminTests.GroupTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateGroupTest : EmptyDbWebTest
{
  public UpdateGroupTest(EmptyDbWebFactory factory) : base(factory)
  {
  }

  public const string UpdateGroupMutation = """
    mutation($groupId: Int!, $groupInput: AdminGroupInput!) {
      admin {
        updateGroup(
            groupId: $groupId
            groupInput: $groupInput
          ) {
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
  public async Task Should_UpdateGroup()
  {
    var groupRepo = Provider.GetRequiredService<IRepository<Group>>();
    var newGroup = CreateGroup("InsTestGroup_Name", "InsTestGroup_Description");

    var insertionResult = await groupRepo.AddAsync(newGroup);

    var groupFeatures = CreateGroupFeatures();
    AdminGroupInput adminGroupInput = new("UpdatedName", "UpdatedDescription", groupFeatures);

    var updateGroupMutation = QueryRequestBuilder.New()
      .SetQuery(UpdateGroupMutation)
      .SetVariableValue("groupId", insertionResult.Id)
      .SetVariableValue("groupInput", adminGroupInput)
      .SetUser(GetAdminClaims())
      .Create();

    var result = await ExecuteGraphQLQueryAsync(updateGroupMutation);
    AssertSuccessGraphQLQueryResult(result);

    await Verify(result);

    var groupResult = result!.Data!
      .GetDictionaryValue("admin")
      .GetDictionaryValue("updateGroup")
      .GetDictionaryValue("value");

    var updatedGroupName = groupResult.GetValue<string>("name");
    var updatedGroupDescription = groupResult.GetValue<string>("description");
    var updateGroupFeatures = groupResult.GetValue<ListResult>("features");

    Assert.NotEqual(newGroup.Name, updatedGroupName);
    Assert.NotEqual(newGroup.Description, updatedGroupDescription);
    Assert.False(newGroup.Features.Count == updateGroupFeatures.Count);
  }


  private static Group CreateGroup(string name, string description)
  {
    Group newGroup = new(name, description);
    newGroup.SetFeature(Features.ANAG_SUBJECT_BASE, false, false, false, false);
    newGroup.SetFeature(Features.ANAG_SUBJECT_CATEGORY, true, false, true, false);
    newGroup.SetFeature(Features.ASST_ESTATEUNIT_BASE, false, false, true, false);

    return newGroup;
  }

  private AdminGroupFeatureInput[] CreateGroupFeatures()
  {
    AdminGroupFeatureInput f_subBase = new(Features.ANAG_SUBJECT_BASE, false, true, true, true),
                           f_estateUnitBase = new(Features.ASST_ESTATEUNIT_BASE, false, false, true, false);

    return new AdminGroupFeatureInput[] { f_subBase, f_estateUnitBase };
  }
}
