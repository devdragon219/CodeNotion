using HotChocolate.Execution;
using RealGimm.Core.IAM;
using RealGimm.Web.Admin.Models;
using Xunit.Abstractions;
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
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;

namespace RealGimm.FunctionalTests.Web.Tests.Admin.AdminTests.UserTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateUserTest : EmptyDbWebTest
{
  private readonly ITestOutputHelper _output;
  private readonly PasswordHasher<object> _passwordHasher = new();

  public UpdateUserTest(EmptyDbWebFactory factory, ITestOutputHelper output) : base(factory)
  {
    _output = output;
  }

  public const string UpdateUserMutation = """
    mutation($userId: Int!, $userInput: AdminUserInput!) {
      admin {
        updateUser(userId: $userId, userInput: $userInput) {
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
  public async Task Should_UpdateUser()
  {
    // user creation
    var newUser = new UAgg.User("demouser1@sample.com", UAgg.UserType.Internal, null);

    newUser.SetName("User", "Demo1");

    // contacts associations
    var userEmail = new UAgg.Contact(ContactType.Main, "demouser1@sample.com", ContactInfoType.EMail);
    userEmail.SetNotes("Main email");
    newUser.AddContact(userEmail);

    var userPhone = new UAgg.Contact(ContactType.Main, "newContact", ContactInfoType.MobilePhone);
    newUser.AddContact(userPhone);

    using (var scope = Provider.CreateScope())
    {
      // orgUnits and subjects association
      var groupRepo = scope.ServiceProvider.GetRequiredService<IRepository<Group>>();
      var userRepo = scope.ServiceProvider.GetRequiredService<IRepository<UAgg.User>>();
      var subjectRepo = scope.ServiceProvider.GetRequiredService<IRepository<Subject>>();
      var orgUnitRepo = scope.ServiceProvider.GetRequiredService<IRepository<OrgUnit>>();

      var demoSub1 = await subjectRepo.AddAsync(CreateManagementSubject(id: 1));
      var demoSub2 = await subjectRepo.AddAsync(CreateManagementSubject(id: 2, name: "DemoSubject2", manCode: "zYY8fv5A6J8S", intCode: "3zutBvyimBzA"));
      var demoSub3 = await subjectRepo.AddAsync(CreateManagementSubject(id: 3, name: "DemoSubject3", manCode: "cESWT2hT9aVt", intCode: "7omCjK1BYmAU"));

      var ouDemo1 = await orgUnitRepo.AddAsync(CreateOrgUnit(id: 1, parentSubject: demoSub1));
      var ouDemo2 = await orgUnitRepo.AddAsync(CreateOrgUnit(id: 2, name: "DemoOrgUnit2", intCode: "TtbgNi4oHRf7", extCode: "ZZWzSIqZT66D", parentSubject: demoSub2));

      newUser.SetSubjectsAndOrgUnits(new int[] { 1, 2 }, new int[] { 1, 2 });

      // group association
      var demoGroup = await groupRepo.AddAsync(CreateGroup(name: "DemoGroup", description: "Demo group"));
      newUser.AddGroup(demoGroup);

      var hashedNewPassword = _passwordHasher.HashPassword(new object(), "pZt@p4W_ZwJVn3!");
      newUser.SetPassword(hashedNewPassword);

      var insertionResult = await userRepo.AddAsync(newUser);
      newUser.Id = insertionResult.Id;

      var adminUserInput = CreateAdminUserInput(new int[] { 3 });

      var mutationQueryBuild = QueryRequestBuilder.New()
        .SetQuery(UpdateUserMutation)
        .SetVariableValue("userId", insertionResult.Id)
        .SetVariableValue("userInput", adminUserInput)
        .SetUser(GetAdminClaims())
        .Create();

      var result = await ExecuteGraphQLQueryAsync(mutationQueryBuild);

      AssertSuccessGraphQLQueryResult(result);
      await Verify(result);
    }

    using (var scope = Provider.CreateScope())
    {
      var userRepo = scope.ServiceProvider.GetRequiredService<IRepository<UAgg.User>>();
      
      var updatedUser = await userRepo
        .AsQueryable(new GetByIdSpec<User>(newUser.Id), new UserIncludeAllSpec())
        .FirstOrDefaultAsync();

      Assert.NotNull(updatedUser);

      AssertUserEqual(newUser, updatedUser);
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

  private static AdminUserInput CreateAdminUserInput(int[] subjects)
  {
    AdminUserInput input = new(
      "ChangedName", 
      "Demo1", 
      "demouser1@sample.com",
      UserType.ExternalSupplier,
      OfficeAccess.Both,
      null, 
      UserStatus.Active, 
      null, 
      null, 
      DateTime.Parse("2023-11-10"), 
      null,
      null,
      subjects,
      null,
      null,
      null,
      null);

    return input;
  }

  private void AssertUserEqual(UAgg.User insertedUser, UAgg.User updatedUser)
  {
    Assert.Equal(insertedUser.Status, updatedUser.Status);
    Assert.Equal(insertedUser.UserName, updatedUser.UserName);
    Assert.Equal(insertedUser.LastName, updatedUser.LastName);

    Assert.NotEqual(insertedUser.Type, updatedUser.Type);
    Assert.NotEqual(insertedUser.FirstName, updatedUser.FirstName);

    Assert.True(updatedUser.Contacts is null || !updatedUser.Contacts.Any());
    Assert.True(updatedUser.OrgUnits is null || !updatedUser.OrgUnits.Any());
    Assert.False(updatedUser.Subjects is null || !updatedUser.Subjects.Any());
  }
}



