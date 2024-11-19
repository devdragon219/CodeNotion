using HotChocolate.Execution;
using RealGimm.Core.IAM;
using RealGimm.Web.Admin.Models;
using Xunit.Abstractions;
using RealGimm.FunctionalTests.Web.Extensions;
using Microsoft.Extensions.DependencyInjection;
using UAgg = RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.IAM.GroupAggregate;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Common;
using Microsoft.AspNetCore.Identity;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.IAM.UserAggregate.Specifications;
using HotChocolate.Execution.Processing;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;

namespace RealGimm.FunctionalTests.Web.Tests.Admin.AdminTests.UserTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddUserTest : EmptyDbWebTest
{
  private readonly ITestOutputHelper _output;
  private readonly PasswordHasher<object> _passwordHasher = new();

  public AddUserTest(EmptyDbWebFactory factory, ITestOutputHelper output) : base(factory)
  {
    _output = output;
  }

  public const string AddUserMutation = """
    mutation($userInput: AdminUserInput!) {
      admin {
        addUser(userInput: $userInput) {
          isSuccess
          status
          value {
            userName
                type
                status
                preferredLanguageCode
                firstName
                lastName
                suspensionReason
                creationDate
                ceasedDate
                lastPasswordUpdated
                lastLoggedIn
                lastLogInAttempt
                lockedSince
                lockedUntil
                enabledSince
                deletionDate
                subjects
                orgUnits
                id
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
  public async Task Should_AddUser() {

    int insertedUserId;
    string firstName, lastName;
    ListResult orgUnits, subjects;


    using (var scope = Provider.CreateScope())
    {
      // orgUnits and subjects creation
      var groupRepo = scope.ServiceProvider.GetRequiredService<IRepository<Group>>();
      var subjectRepo = scope.ServiceProvider.GetRequiredService<IRepository<Subject>>();
      var orgUnitRepo = scope.ServiceProvider.GetRequiredService<IRepository<OrgUnit>>();

      var demoSub1 = await subjectRepo.AddAsync(CreateManagementSubject(id: 1));
      var demoSub2 = await subjectRepo.AddAsync(CreateManagementSubject(id: 2, name: "DemoSubject2", manCode: "zYY8fv5A6J8S", intCode: "3zutBvyimBzA"));
      var demoSub3 = await subjectRepo.AddAsync(CreateManagementSubject(id: 3, name: "DemoSubject3", manCode: "cESWT2hT9aVt", intCode: "7omCjK1BYmAU"));

      var ouDemo1 = await orgUnitRepo.AddAsync(CreateOrgUnit(id: 1, parentSubject: demoSub1));
      var ouDemo2 = await orgUnitRepo.AddAsync(CreateOrgUnit(id: 2, name: "DemoOrgUnit2", intCode: "TtbgNi4oHRf7", extCode: "ZZWzSIqZT66D", parentSubject: demoSub2));

      // group creation
      var demoGroup = await groupRepo.AddAsync(CreateGroup(name: "DemoGroup", description: "Demo group"));

      var adminUserInput = CreateAdminUserInput(new int[] { 1, 2, 3 }, new int[] { 1, 2 });

      var mutationQueryBuild = QueryRequestBuilder.New()
        .SetQuery(AddUserMutation)
        .SetVariableValue("userInput", adminUserInput)
        .SetUser(GetAdminClaims())
        .Create();

      var result = await ExecuteGraphQLQueryAsync(mutationQueryBuild);

      AssertSuccessGraphQLQueryResult(result);
      await Verify(result);

      var userResult = result!.Data!
      .GetDictionaryValue("admin")
      .GetDictionaryValue("addUser")
      .GetDictionaryValue("value");

      insertedUserId = userResult.GetValue<int>("id");

      orgUnits = userResult.GetValue<ListResult>("orgUnits");
      subjects = userResult.GetValue<ListResult>("subjects");

      firstName = userResult.GetValue<string>("firstName");
      lastName = userResult.GetValue<string>("lastName");
    }

    using (var scope = Provider.CreateScope())
    {
      var userRepo = scope.ServiceProvider.GetRequiredService<IRepository<UAgg.User>>();
      
      var updatedUser = await userRepo
        .AsQueryable(new GetByIdSpec<User>(insertedUserId), new UserIncludeAllSpec())
        .FirstOrDefaultAsync();

      Assert.NotNull(updatedUser);

      Assert.Equal(updatedUser.FirstName, firstName);
      Assert.Equal(updatedUser.LastName, lastName);

      Assert.NotNull(updatedUser.OrgUnits);
      Assert.Equal(updatedUser.OrgUnits.Count(), orgUnits.Count());

      Assert.NotNull(updatedUser.Subjects);
      Assert.Equal(updatedUser.Subjects.Count(), subjects.Count());
    }
  }

  private static ManagementSubject CreateManagementSubject(int id, string name = "DemoSubject1", string manCode = "UzZ5abxzBGQP", string intCode = "ACwS6cPv35RR")
  {
    var subject = new ManagementSubject();
    subject.SetFullName(name);
    subject.SetManagementCode(manCode);
    subject.SetBaseCountryTaxIdCode("06363391001");
    subject.SetEntryStatus(EntryStatus.IncompleteDraft, closureDate: null);
    subject.SetInternalCode(intCode);
    subject.AddSelfManagementRelation();

    subject.Id = id;

    return subject;
  }

  private static OrgUnit CreateOrgUnit(int id, Subject parentSubject, string name = "DemoOrgUnit1", string intCode = "iKL1GXORWDR0", string extCode = "mBvGURbDgWMR")
  {
    var orgUnit = new OrgUnit();
    orgUnit.SetType(OrgUnitType.ManagementHierarchy);
    orgUnit.SetName(name);
    orgUnit.SetInternalCode(intCode);
    orgUnit.SetExternalCode(extCode);
    orgUnit.Id = id;

    orgUnit.SetParentSubject(parentSubject);
    return orgUnit;
  }

  private static Group CreateGroup(string name, string description)
  {
    Group newGroup = new(name, description);
    newGroup.SetFeature(Features.ANAG_SUBJECT_BASE, true, false, false, false);
    newGroup.SetFeature(Features.ANAG_SUBJECT_CATEGORY, true, false, false, false);
    newGroup.SetFeature(Features.ASST_ESTATEUNIT_BASE, true, true, true, true);

    return newGroup;
  }

  private static AdminUserInput CreateAdminUserInput(int[] subjects, int[] orgUnits)
  {
    var userEmail = new AdminContactInput(null, ContactInfoType.EMail, null, "demouser1@sample.com", null);
    var userPhone = new AdminContactInput(null, ContactInfoType.MobilePhone, null, "+1525294732", null);

    AdminUserInput input = new(
      "SampleUser",
      "Demo1Add",
      "demouser1add@sample.com",
      UserType.Internal,
      OfficeAccess.Both,
      null,
      UserStatus.Active,
      null,
      null,
      DateTime.Parse("2023-11-10"),
      null,
      null,
      subjects,
      orgUnits,
      [userEmail, userPhone],
      "5E6KVuBJhlN5AIJNx9!",
      "5E6KVuBJhlN5AIJNx9!");

    return input;
  }
}
