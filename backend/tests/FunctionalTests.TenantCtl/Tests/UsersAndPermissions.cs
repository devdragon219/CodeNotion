using System.Security.Claims;
using System.Text.RegularExpressions;
using HotChocolate;
using HotChocolate.Execution;
using Microsoft.Extensions.Hosting;
using RealGimm.Core.IAM.UserAggregate;
using Xunit;
using Xunit.Abstractions;

namespace RealGimm.FunctionalTests.TenantCtl.Tests;

[Collection(nameof(DefaultTenantCtlFactoryCollection))]
[TestCaseOrderer(ordererTypeName: "FunctionalTests.TenantCtl.PriorityOrderer", ordererAssemblyName: "FunctionalTests.TenantCtl")]
public class UsersAndPermissions : BaseTenantCtlTest
{
  private readonly ITestOutputHelper _output;

  public UsersAndPermissions(TenantCtlFactory factory, ITestOutputHelper output) : base(factory)
  {
    _output = output;
  }

  [Fact]
  public async Task AdminCreatesBaseUser()
  {
    var tc = new TestConsole(_output);
    using var host = await MakeHost(tc, "add", "perm_tenant_1");

    var adminUsername = "admin@perm.tenant.1";
    var password = string.Empty;
    var tenantId = Guid.Empty;

    tc.AddOutMatcher(new Regex("Administrator login"), log =>
    {
      password = new Regex("password: \\[([^\\]]*)\\]").Match(log).Groups[1].Value;
      tenantId = Guid.Parse(new Regex("tenant: \\[([^\\]]*)\\]").Match(log).Groups[1].Value);
    });

    var exitCode = await host.RunCommandLineApplicationAsync();

    Assert.True(tc.OutWritten);
    Assert.False(tc.ErrWritten);
    Assert.Equal(0, exitCode);

    var (reqExec, webapp) = await WebBackendHost.StartWebServer(GetWebHostArgs());

    var adminLoginMutation = QueryRequestBuilder.New()
      .SetQuery("mutation ($username: String!, $password: String!) { login { login(input: { username: $username, password: $password }) { user { username }, jwt } } }")
      .AddVariableValue("username", adminUsername)
      .AddVariableValue("password", password)
      .SetServices(webapp.Services)
      .Create();

    var result = await reqExec.ExecuteAsync(adminLoginMutation);
    var jsonResult = result.ToJson();
    Assert.Contains("\"jwt\":", jsonResult);

    //Extract JWT for later usage
    var adminJwt = jsonResult.Split("\"jwt\": \"")[1];
    adminJwt = adminJwt.Split("\"")[0];

    var admin = new ClaimsPrincipal();
    admin.AddIdentity(JwtParser.Decode(adminJwt));

    UserDataProvider.Instance.SetTenantId(tenantId);

    //Try listing users, ensure no errors
    var listUserQuery = QueryRequestBuilder.New()
      .SetQuery("query Q { admin { user(userId: 1) { userName } } }")
      .SetUser(admin)
      .SetServices(webapp.Services)
      .Create();

    result = await reqExec.ExecuteAsync(listUserQuery);
    jsonResult = result.ToJson();
    Assert.Contains("\"userName\":", jsonResult);

    //Create new user, ensure no errors
    var endUsername = "basic@example.com";
    var pswNewUser = Guid.NewGuid().ToString("N");
    var addUserMutation = QueryRequestBuilder.New()
      .SetQuery("mutation ($officeAccess: OfficeAccess!, $userName: String!, $enabledSince: DateTime, $pswNewUser: String!, $pswNewUserC: String!) { admin { addUser(userInput: { officeAccess: $officeAccess, userName: $userName, firstName: \"First Name\", lastName: \"Last Name\", type: INTERNAL, status: ACTIVE, enabledSince: $enabledSince, newPassword: $pswNewUser, passwordConfirmation: $pswNewUserC }) { value { userName } } } }")
      .AddVariableValue("userName", endUsername)
      .AddVariableValue("enabledSince", DateTime.Now.ToString("yyyy-MM-dd"))
      .AddVariableValue("pswNewUser", pswNewUser)
      .AddVariableValue("pswNewUserC", pswNewUser)
      .AddVariableValue("officeAccess", OfficeAccess.Both)
      .SetUser(admin)
      .SetServices(webapp.Services)
      .Create();

    result = await reqExec.ExecuteAsync(addUserMutation);
    jsonResult = result.ToJson();
    Assert.Contains("\"userName\":", jsonResult);

    //Add new user to base group, ensure no errors
    var addUserToGroupMutation = QueryRequestBuilder.New()
      .SetQuery("mutation Z { admin { addUserToGroup(userId: 2, groupId: 2) } }")
      .SetUser(admin)
      .SetServices(webapp.Services)
      .Create();

    result = await reqExec.ExecuteAsync(addUserToGroupMutation);
    jsonResult = result.ToJson();
    Assert.DoesNotContain("\"errors\":", jsonResult);

    //Set user password
    var endPassword = Guid.NewGuid().ToString("N");
    var setUserPassword = QueryRequestBuilder.New()
      .SetQuery("mutation Z($newPassword: String!) { admin { setPasswordToUser(userId: 2, newPassword: $newPassword) } }")
      .SetUser(admin)
      .SetVariableValue("newPassword", endPassword)
      .SetServices(webapp.Services)
      .Create();

    result = await reqExec.ExecuteAsync(setUserPassword);
    jsonResult = result.ToJson();
    Assert.DoesNotContain("\"errors\":", jsonResult);

    //Try login with end user credentials
    var enduserLoginMutation = QueryRequestBuilder.New()
      .SetQuery("mutation ($username: String!, $password: String!) { login { login(input: { username: $username, password: $password }) { user { username }, jwt } } }")
      .AddVariableValue("username", endUsername)
      .AddVariableValue("password", endPassword)
      .SetServices(webapp.Services)
      .Create();

    result = await reqExec.ExecuteAsync(enduserLoginMutation);
    jsonResult = result.ToJson();
    Assert.Contains("\"jwt\":", jsonResult);

    //Extract JWT for later usage
    var enduserJwt = jsonResult.Split("\"jwt\": \"")[1];
    enduserJwt = enduserJwt.Split("\"")[0];

    var endUser = new ClaimsPrincipal();
    endUser.AddIdentity(JwtParser.Decode(enduserJwt));

    //Try listing users, ensure errors
    var listUserQuery2 = QueryRequestBuilder.New()
      .SetQuery("query Q { admin { user(userId: 1) { userName } } }")
      .SetUser(endUser)
      .SetServices(webapp.Services)
      .Create();

    result = await reqExec.ExecuteAsync(listUserQuery2);
    jsonResult = result.ToJson();
    Assert.DoesNotContain("\"userName\":", jsonResult);
    Assert.Contains("\"errors\":", jsonResult);
    Assert.Contains("AUTH_", jsonResult);
  }
}
