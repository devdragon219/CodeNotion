using System.Reflection;
using Autofac;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.WebFrontOffice;
using RealGimm.WebFrontOffice.HostBuilderConfiguration;

var justGenerateSchema = args.Any(a => a == "--generate-schema");

var builder = RealGimm.WebCommons.HostBuilder
  .CreateHostBuilder(
    args,
    Assembly.GetExecutingAssembly(),
    Auth.ISSUER,
    Auth.AUDIENCE,
    justGenerateSchema);

builder.Host.ConfigureContainer<ContainerBuilder>(containerBuilder =>
    {
      containerBuilder.RegisterType<Auth>()
        .As<IAuthSettingsProvider>()
        .InstancePerLifetimeScope();
    });

builder.Services.AddAuthorizationBuilder();

builder.Services.ConfigureRGGraphQL();

var app = RealGimm.WebCommons.HostBuilder.MapWebApplication(builder.Build());

app.MapRGGraphQL();

// If we're just saving the GraphQL schema to a file, don't run the application or seed the DB
if (justGenerateSchema)
{
  using var scope = app.Services.CreateScope();
  var services = scope.ServiceProvider;
  SchemaGeneration.JustGenerateSchema(
    scope.ServiceProvider,
    args,
    "RealGimm.WebFrontOffice.schema.graphql");
  return;
}

// Prepare infrastructure as needed
using (var scope = app.Services.CreateScope())
{
  var services = scope.ServiceProvider;
  var infrastructureSetup = services.GetRequiredService<IInfrastructurePreparer>();
  await infrastructureSetup.PrepareAsync(CancellationToken.None);
}

app.Run();

// Make the implicit Program.cs class public, so integration tests can reference the correct assembly for host building
public partial class Program
{
}
