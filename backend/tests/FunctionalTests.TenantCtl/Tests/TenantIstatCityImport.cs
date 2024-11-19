using System.Security.Claims;
using System.Text.RegularExpressions;
using HotChocolate;
using HotChocolate.Execution;
using Microsoft.Extensions.Hosting;
using RealGimm.Core;
using Xunit;
using Xunit.Abstractions;

namespace RealGimm.FunctionalTests.TenantCtl.Tests;

[Collection(nameof(DefaultTenantCtlFactoryCollection))]
[TestCaseOrderer(ordererTypeName: "FunctionalTests.TenantCtl.PriorityOrderer", ordererAssemblyName: "FunctionalTests.TenantCtl")]
public class TenantIstatCityImport : BaseTenantCtlTest
{
  private readonly ITestOutputHelper _output;

  public TenantIstatCityImport(TenantCtlFactory factory, ITestOutputHelper output) : base(factory)
  {
    _output = output;
  }

  [Fact]
  public async Task AdminCreatesBaseUser()
  {
    var tc = new TestConsole(_output);
    using var host = await MakeHost(tc, "add", "-c", CountryISO3.ITA, "city_tenant_1");

    var adminUsername = "admin@city.tenant.1";
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

    //Try listing cities, ensure a city appears
    var listUserQuery = QueryRequestBuilder.New()
      .SetQuery("query Q { city { city(cityId: 1) { name } } }")
      .SetUser(admin)
      .SetServices(webapp.Services)
      .Create();

    result = await reqExec.ExecuteAsync(listUserQuery);
    jsonResult = result.ToJson();
    Assert.Contains("\"name\":", jsonResult);
  }
}
