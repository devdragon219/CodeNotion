using System.Reflection;
using System.Text;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Localization;
using Microsoft.IdentityModel.Tokens;
using RealGimm.Core.IAM;
using RealGimm.Core.Resources;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;
using Serilog;
using Rebus.TestHelpers;
using RealGimm.SharedKernel.Attributes;
using Rebus.Bus;
using System.Security.Claims;
using Community.Microsoft.Extensions.Caching.PostgreSql;
using RealGimm.Core.EventSystem;
using System.Net;
using PdfSharp.Fonts;
using IPNetwork = Microsoft.AspNetCore.HttpOverrides.IPNetwork;
using RealGimm.WebCommons.Mapping;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Http;
using RealGimm.WebCommons.HostBuilderConfiguration;
using Microsoft.AspNetCore.Authentication.Cookies;
using RealGimm.WebCommons.GraphQL.User;

namespace RealGimm.WebCommons;

public static class HostBuilder
{
  public static WebApplicationBuilder CreateHostBuilder(
    string[] args,
    Assembly webContainerAssembly,
    string jwtIssuer,
    string jwtAudience,
    bool skipConnections = false)
  {
    var config = new ConfigurationBuilder()
      .SetBasePath(Directory.GetCurrentDirectory())
      .AddJsonFile("./appsettings.json")
      .AddEnvironmentVariables()
      .AddCommandLine(args)
      .Build();

    var builder = WebApplication.CreateBuilder(args);

    builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());

    builder.WebHost.ConfigureKestrel(options =>
    {
      options.Limits.MaxRequestBodySize = Constants.MAX_REQUEST_BODY_SIZE;
    });

    var infraAssembly = Assembly.LoadFrom(_infrastructureAssembly.Value);
    var customizationAssembly = LoadInfrastructureCustomizationAssembly();

    builder.Host.ConfigureContainer<ContainerBuilder>((hb, containerBuilder) =>
    {
      containerBuilder.Properties.Add(
        RuntimeEnv.ENV,
        ((IHostApplicationBuilder)builder).Environment.IsDevelopment()
          ? RuntimeEnv.DEV
          : RuntimeEnv.PROD);

      containerBuilder.RegisterInstance<IConfiguration>(config);
      containerBuilder
        .RegisterType(typeof(UserDataProvider))
        .As(typeof(IUserDataProvider))
        .InstancePerLifetimeScope();

      containerBuilder.RegisterAssemblyModules(typeof(IAMCoreModule).Assembly);
      containerBuilder.RegisterAssemblyModules(infraAssembly);
      containerBuilder.RegisterPlugins();

      var webCommonsAssembly = typeof(HostBuilder).Assembly;

      containerBuilder.RegisterAssemblyTypes(webContainerAssembly, webCommonsAssembly)
        .AsClosedTypesOf(typeof(IMapper<,>))
        .InstancePerLifetimeScope();

      containerBuilder.RegisterAssemblyTypes(webContainerAssembly, webCommonsAssembly)
        .AsClosedTypesOf(typeof(BatchDataLoader<,>))
        .InstancePerLifetimeScope();

      containerBuilder.RegisterAssemblyTypes(webContainerAssembly, webCommonsAssembly)
        .AsClosedTypesOf(typeof(GroupedDataLoader<,>))
        .InstancePerLifetimeScope();

      containerBuilder.RegisterType<Mapper>()
        .As<IMapper>()
        .InstancePerLifetimeScope();

      if (skipConnections)
      {
        containerBuilder.RegisterType<FakeBus>()
          .As<IBus>()
          .InstancePerLifetimeScope();
      }

      containerBuilder.RegisterGeneric(typeof(RepositoryWebWrapper<>))
        .InstancePerLifetimeScope();

      if (customizationAssembly is not null)
      {
        containerBuilder.RegisterAssemblyModules(customizationAssembly);
      }
    }).ConfigureServices(svc =>
    {
      svc.AddSerilog((_, config) =>
      {
        var minimumLevel = builder.Configuration.GetValue(
          "Serilog.MinimumLevel",
          "Information")!;

        config.WriteTo.Console(Enum.Parse<Serilog.Events.LogEventLevel>(minimumLevel));
        config.MinimumLevel.Override(
          "Microsoft.AspNetCore",
          Serilog.Events.LogEventLevel.Warning);
      });

      if (!skipConnections)
      {
        var webHandlers = typeof(IAMCoreModule).Assembly
          .GetTypes()
          .Concat(infraAssembly.GetTypes())
          .Concat(customizationAssembly?.GetTypes() ?? [])
          .Where(type => !type.IsAbstract && type.GetCustomAttribute<WebEventHandlerAttribute>() is not null)
          .Where(bh => bh.BaseType is not null && bh.BaseType.IsGenericType)
          .ToArray();

        var rebusConfiguratorType = infraAssembly
          .GetTypes()
          .FirstOrDefault(t => typeof(IRebusConfigurator).IsAssignableFrom(t)
            && !t.IsInterface
            && !t.IsAbstract);

        if (rebusConfiguratorType is not null)
        {
          var rebusConfigurator = (IRebusConfigurator?)Activator.CreateInstance(rebusConfiguratorType);

          rebusConfigurator?.ConfigureRGRebus(
            svc,
            builder.Configuration,
            MessageQueues.WEB_QUEUE_NAME,
            webHandlers);
        }

        svc.AddDistributedPostgreSqlCache(setup =>
        {
          setup.ConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");
          setup.SchemaName = "caching";
          setup.TableName = "CacheItems";
        });
      }

      svc
        .AddCors()
        .AddHttpContextAccessor()
        .AddMemoryCache()
        .AddHttpClient();
    });

    builder.Services.Configure<ForwardedHeadersOptions>(o =>
    {
      o.ForwardedHeaders = ForwardedHeaders.XForwardedFor
        | ForwardedHeaders.XForwardedProto;


      var net1 = IPAddress.Parse("172.16.0.0");
      var net2 = IPAddress.Parse("192.168.0.0");

      o.KnownNetworks.Add(new IPNetwork(net1, 12));
      o.KnownNetworks.Add(new IPNetwork(net1.MapToIPv6(), 108));
      o.KnownNetworks.Add(new IPNetwork(net2, 16));
      o.KnownNetworks.Add(new IPNetwork(net2.MapToIPv6(), 112));
    });

    builder.Services.Configure<RequestLocalizationOptions>(o =>
    {
      var supportedCultures = JsonStringLocalizer.SupportedCultures();
      o.SetDefaultCulture("it")
        .AddSupportedCultures(supportedCultures)
        .AddSupportedUICultures(supportedCultures);
    })
      .AddLocalization()
      .AddSingleton<IStringLocalizer, JsonStringLocalizer>()
      .AddSingleton<IStringLocalizerFactory, JsonStringLocalizerFactory>();

    builder.Services
      .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
      .AddJwtBearer(options =>
      {
        options.TokenValidationParameters = new TokenValidationParameters
        {
          ValidIssuer = jwtIssuer,
          ValidAudience = jwtAudience,
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(
              builder.Configuration[Jwt.CONF_SIGNING_KEY] ?? string.Empty
            )
          ),
          NameClaimType = ClaimTypes.NameIdentifier
        };
      })
      .AddCookie(options =>
      {
        options.Cookie.HttpOnly = true;
        options.Cookie.IsEssential = true;
        options.Cookie.SecurePolicy =
          builder.Environment.IsDevelopment()
          ? CookieSecurePolicy.None
          : CookieSecurePolicy.Always;
        options.Cookie.Name = Jwt.COOKIE_NAME;
      });

    builder.Services.AddAuthorizationBuilder()
      .AddPolicy(QueriesBase.FILE_DOWNLOAD_POLICY, p => p
            .RequireAuthenticatedUser()
            .AddAuthenticationSchemes(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme));

    if (!((IHostApplicationBuilder)builder).Environment.IsDevelopment())
    {
      builder.Services.ConfigureRGRateLimiting();

      builder.ConfigureRGTelemetry();
    }

    return builder;
  }

  private static readonly Lazy<string> _infrastructureAssembly = new(() =>
  {
    var assemblyPath = System.IO.Path.Combine(
      System.IO.Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location) ?? ".",
      "RealGimm.Infrastructure.dll");

    if (!File.Exists(assemblyPath))
    {
      throw new FileNotFoundException("Unable to find RealGimm.Infrastructure.dll in path");
    }

    return assemblyPath;
  });

  private static Assembly? LoadInfrastructureCustomizationAssembly()
  {
    var assemblyPath = System.IO.Path.Combine(
      System.IO.Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location) ?? ".",
      "RealGimm.Infrastructure.Customization.dll");

    if (!File.Exists(assemblyPath))
    {
      return null;
    }

    return Assembly.LoadFrom(assemblyPath);
  }

  public static WebApplication MapWebApplication(WebApplication app)
  {
    app.UseAuthentication();
    app.UseAuthorization();
    app.UseRequestLocalization();

    if (!app.Environment.IsDevelopment())
    {
      app.UseRateLimiter();

      app.UseForwardedHeaders(new ForwardedHeadersOptions
      {
        ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
      });

      app.UseRGMetricsScrapingEndpoint();
    }

    // Configure auditing
    using (var scope = app.Services.CreateScope())
    {
      var services = scope.ServiceProvider;
      var auditConfigurator = services.GetRequiredService<IAuditConfigurator>();
      auditConfigurator?.Configure(services);
    }

    GlobalFontSettings.FontResolver ??= new FontResolver();

    app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

    return app;
  }
}
