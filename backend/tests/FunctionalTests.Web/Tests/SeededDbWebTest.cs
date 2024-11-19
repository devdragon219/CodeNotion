using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using System.Security.Claims;
using Autofac;
using HotChocolate.Execution;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;

namespace RealGimm.FunctionalTests.Web.Tests;

public abstract class SeededDbWebTest : IAsyncLifetime
{
  private readonly SeededDbWebFactory _factory;
  private readonly bool _isNewFactory;
  private readonly IRequestExecutorResolver _graphQLRequestExecutorResolver;

  protected readonly IServiceProvider Provider;
  protected readonly HttpClient HttpClient;

  public SeededDbWebTest(SeededDbWebFactory factory)
  {
    _factory = ConfigureFactory(factory, out _isNewFactory);

    Provider = _factory.Services.CreateScope().ServiceProvider;
    HttpClient = _factory.HttpClient;
    _graphQLRequestExecutorResolver = Require<IRequestExecutorResolver>();
  }

  public virtual async Task InitializeAsync()
  {
    if (_isNewFactory)
    {
      await _factory.InitializeAsync();
    }
  }

  public virtual async Task DisposeAsync()
  {
    if (_isNewFactory)
    {
      await _factory.DisposeAsync();
      await ((IAsyncDisposable)_factory).DisposeAsync();
    }
  }

  protected TService Require<TService>()
    where TService : notnull
    => Provider.GetRequiredService<TService>();

  protected ClaimsPrincipal GetAdminClaims()
    => Require<UserIdentity>().GetDefaultUserClaims();

  protected string GetAdminJwt()
    => Require<UserIdentity>().GetDefaultUserJwt();

  protected async Task<IQueryResult?> ExecuteGraphQLQueryAsync(IQueryRequest query)
  {
    var executor = await _graphQLRequestExecutorResolver.GetRequestExecutorAsync();
    var result = await executor.ExecuteAsync(query);

    return result?.ExpectQueryResult();
  }

  protected static void AssertSuccessGraphQLQueryResult([NotNull] IQueryResult? result)
  {
    if (result?.Errors is not null && result.Errors.Any())
    {
      foreach (var error in result.Errors)
      {
        Console.WriteLine("GraphQL Error: " + error.Message);
        if (error.Exception is not null)
        {
          Console.WriteLine("  from Exception: " + error.Exception.ToString());
        }
      }
    }
    
    Assert.NotNull(result);
    Assert.NotNull(result.Data);
    Assert.Null(result.Errors);
  }

  protected virtual void ConfigureTestServices(IServiceCollection services)
  {
  }

  protected virtual void ConfigureTestsContainer(ContainerBuilder containerBuilder)
  {
  }

  private SeededDbWebFactory ConfigureFactory(SeededDbWebFactory factory, out bool isNewFactory)
  {
    var configureTestsServicesMethod = GetType().GetMethod(nameof(ConfigureTestServices), BindingFlags.NonPublic | BindingFlags.Instance)!;
    var configureTestsContainerMethod = GetType().GetMethod(nameof(ConfigureTestsContainer), BindingFlags.NonPublic | BindingFlags.Instance)!;

    // checking if ConfigureTestServices or ConfigureTestsContainer were overrided
    if (configureTestsServicesMethod.GetBaseDefinition().DeclaringType != configureTestsServicesMethod.DeclaringType ||
        configureTestsContainerMethod.GetBaseDefinition().DeclaringType != configureTestsContainerMethod.DeclaringType)
    {
      isNewFactory = true;

      return (SeededDbWebFactory)factory.WithWebHost(host =>
      {
        host.ConfigureTestServices(ConfigureTestServices);
        host.ConfigureTestContainer<ContainerBuilder>(ConfigureTestsContainer);
      });
    }

    isNewFactory = false;
    return factory;
  }
}
