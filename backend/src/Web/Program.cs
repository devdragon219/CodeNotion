using System.Reflection;
using Autofac;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web;
using RealGimm.Web.Docs;
using RealGimm.Web.Docs.Mapping;
using RealGimm.Web.HostBuilderConfiguration;
using RealGimm.WebCommons;

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
      containerBuilder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly())
        .AsClosedTypesOf(typeof(IDocumentMapper<>))
        .InstancePerLifetimeScope();

      containerBuilder.RegisterType<FileDownloadHandler>()
        .InstancePerLifetimeScope();

      containerBuilder.RegisterType<DocsDownloadHandler>()
        .InstancePerLifetimeScope();

      containerBuilder.RegisterType<Auth>()
        .As<IAuthSettingsProvider>()
        .InstancePerLifetimeScope();
    });

builder.Services.ConfigureRGGraphQL();

var app = RealGimm.WebCommons.HostBuilder.MapWebApplication(builder.Build());

app.MapRGGraphQL();

app.MapGet(
  QueriesBase.API_FILE_BASE + "{id:guid}",
  (Guid id, FileDownloadHandler handler) => handler.GetFile(id))
  .RequireAuthorization(QueriesBase.FILE_DOWNLOAD_POLICY);

app.MapGet(
  QueriesBase.API_DOCS_BASE + "{cmisId}/{entityId}",
  (string cmisId, string entityId, DocsDownloadHandler handler)
    => handler.GetFile(cmisId, entityId))
  .RequireAuthorization(QueriesBase.FILE_DOWNLOAD_POLICY);

// If we're just saving the GraphQL schema to a file, don't run the application or seed the DB
if (justGenerateSchema)
{
  using var scope = app.Services.CreateScope();
  var services = scope.ServiceProvider;
  SchemaGeneration.JustGenerateSchema(
    scope.ServiceProvider,
    args,
    "RealGimm.Web.schema.graphql");
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
