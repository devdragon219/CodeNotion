using System.Text.RegularExpressions;
using HotChocolate;
using HotChocolate.Execution;
using Microsoft.Extensions.Hosting;
using RealGimm.TenantCtl;
using Xunit;
using Xunit.Abstractions;

namespace RealGimm.FunctionalTests.TenantCtl.Tests;

[Collection(nameof(DefaultTenantCtlFactoryCollection))]
[TestCaseOrderer(ordererTypeName: "FunctionalTests.TenantCtl.PriorityOrderer", ordererAssemblyName: "FunctionalTests.TenantCtl")]
public sealed class TenantCreation : BaseTenantCtlTest
{
  private readonly ITestOutputHelper _output;

  public TenantCreation(TenantCtlFactory factory, ITestOutputHelper output) : base(factory)
  {
    _output = output;
  }

  [Fact, TestPriority(0)]
  public async Task CreateTenant()
  {
    var tc = new TestConsole(_output);
    using var host = await MakeHost(tc, "add", "tenant1");

    var exitCode = await host.RunCommandLineApplicationAsync();
    Assert.True(tc.OutWritten);
    Assert.False(tc.ErrWritten);
    Assert.Equal(0, exitCode);
  }

  [Fact, TestPriority(1)]
  public async Task ListTenants()
  {
    var tc = new TestConsole(_output);
    using var host = await MakeHost(tc, "list");

    var exitCode = await host.RunCommandLineApplicationAsync();
    Assert.True(tc.OutWritten);
    Assert.Equal(0, exitCode);
  }

  [Fact, TestPriority(2)]
  public async Task CannotCreateTwoTenantsWithSameName()
  {
    var tc = new TestConsole(_output);
    using var host = await MakeHost(tc, "add", "tenant77");

    var exitCode = await host.RunCommandLineApplicationAsync();
    Assert.True(tc.OutWritten);
    Assert.False(tc.ErrWritten);
    Assert.Equal(0, exitCode);

    using var host2 = await MakeHost(tc, "add", "tenant77");

    var exitCode2 = await host2.RunCommandLineApplicationAsync();
    Assert.True(tc.OutWritten);
    Assert.True(tc.ErrWritten);
    Assert.Equal(ErrorResults.E_TENANTEXISTS, exitCode2);
  }

  [Fact, TestPriority(3)]
  public async Task TenantAdminCanLogin()
  {
    var tc = new TestConsole(_output);
    using var host = await MakeHost(tc, "add", "tenant2");

    var username = "admin@tenant2";
    var password = string.Empty;

    tc.AddOutMatcher(new Regex("Administrator login"), log =>
    {
      password = new Regex("password: \\[([^\\]]*)\\]").Match(log).Groups[1].Value;
    });

    var exitCode = await host.RunCommandLineApplicationAsync();

    Assert.True(tc.OutWritten);
    Assert.False(tc.ErrWritten);
    Assert.Equal(0, exitCode);

    var (reqExec, webapp) = await WebBackendHost.StartWebServer(GetWebHostArgs());

    var query = QueryRequestBuilder.New()
      .SetQuery("mutation ($username: String!, $password: String!) { login { login(input: { username: $username, password: $password }) { user { username }, jwt } } }")
      .AddVariableValue("username", username)
      .AddVariableValue("password", password)
      .SetServices(webapp.Services)
      .Create();

    var result = await reqExec.ExecuteAsync(query);
    var jsonResult = result.ToJson();
    Assert.Contains("\"jwt\":", jsonResult);
  }

  [Fact, TestPriority(4)]
  public async Task CreateFixLockAndDeleteTenant()
  {
    var tenantName = "tenantcyclename";
    var tc = new TestConsole(_output);

    using (var host = await MakeHost(tc, "add", tenantName))
    {
      var exitCode = await host.RunCommandLineApplicationAsync();
      Assert.True(tc.OutWritten);
      Assert.False(tc.ErrWritten);
      Assert.Equal(0, exitCode);
    }

    tc.Reset();

    using (var host = await MakeHost(tc, "fix"))
    {
      var exitCode = await host.RunCommandLineApplicationAsync();
      Assert.True(tc.OutWritten);
      Assert.False(tc.ErrWritten);
      Assert.Equal(0, exitCode);
    }

    tc.Reset();

    using (var host = await MakeHost(tc, "lock", tenantName))
    {
      var exitCode = await host.RunCommandLineApplicationAsync();
      Assert.False(tc.ErrWritten);
      Assert.Equal(0, exitCode);
    }

    tc.Reset();

    using (var host = await MakeHost(tc, "list"))
    {
      var tenantStatusRow = string.Empty;

      tc.AddOutMatcher(new Regex(tenantName), log =>
      {
        tenantStatusRow = log;
      });

      var exitCode = await host.RunCommandLineApplicationAsync();
      Assert.True(tc.OutWritten);
      Assert.Equal(0, exitCode);
      Assert.Contains("YES", tenantStatusRow);
    }

    tc.Reset();

    using (var host = await MakeHost(tc, "set-config", tenantName, "0", "cmis-basedir", "test"))
    {
      var exitCode = await host.RunCommandLineApplicationAsync();
      Assert.True(tc.OutWritten);
      Assert.Equal(0, exitCode);
    }

    tc.Reset();

    using (var host = await MakeHost(tc, "delete", tenantName + tenantName))
    {
      var exitCode = await host.RunCommandLineApplicationAsync();
      Assert.Equal(ErrorResults.E_TENANTNOTFOUND, exitCode);
    }

    tc.Reset();

    using (var host = await MakeHost(tc, "delete", tenantName))
    {
      var exitCode = await host.RunCommandLineApplicationAsync();
      Assert.False(tc.ErrWritten);
      Assert.Equal(0, exitCode);
    }

    tc.Reset();

    using (var host = await MakeHost(tc, "list"))
    {
      var tenantStatusRow = string.Empty;

      tc.AddOutMatcher(new Regex(tenantName), log =>
      {
        tenantStatusRow = log;
      });

      var exitCode = await host.RunCommandLineApplicationAsync();
      Assert.True(tc.OutWritten);
      Assert.Equal(0, exitCode);

      Assert.DoesNotContain(" - ", tenantStatusRow);
    }

    //Try to unlock tenant admin, expect no error
    tc.Reset();

    using (var host = await MakeHost(tc, "unlock-admin", tenantName))
    {
      var tenantStatusRow = string.Empty;

      tc.AddOutMatcher(new Regex(tenantName), log =>
      {
        tenantStatusRow = log;
      });

      var exitCode = await host.RunCommandLineApplicationAsync();
      Assert.False(tc.ErrWritten);
      Assert.Equal(0, exitCode);

      // admin was not locked
      Assert.Contains("Unable to unlock account", tenantStatusRow);
    }
  }

  [Fact, TestPriority(5)]
  public async Task CreateAndMakeDemo()
  {
    var tenantName = "tenantcyclename2";
    var tc = new TestConsole(_output);

    using (var host = await MakeHost(tc, "add", tenantName))
    {
      var exitCode = await host.RunCommandLineApplicationAsync();
      Assert.True(tc.OutWritten);
      Assert.False(tc.ErrWritten);
      Assert.Equal(0, exitCode);
    }

    tc.Reset();

    using (var host = await MakeHost(tc, "make-demo", "-s", tenantName))
    {
      var exitCode = await host.RunCommandLineApplicationAsync();
      Assert.False(tc.ErrWritten);
      Assert.Equal(0, exitCode);
    }
  }
}
