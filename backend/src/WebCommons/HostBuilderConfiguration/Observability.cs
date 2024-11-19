using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using OpenTelemetry.Logs;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

namespace RealGimm.WebCommons.HostBuilderConfiguration;

public static class Observability
{
  private const string OPEN_TELEMETRY_CONFIG_SECTION = "OpenTelemetry";
  private const string EXPORTER_URI_CONFIG_KEY = "ExporterUri";
  private const string METRICS_PORT_CONFIG_KEY = "MetricsPort";

  public static WebApplicationBuilder ConfigureRGTelemetry(
    this WebApplicationBuilder builder)
  {
    var configuration = builder.Configuration;
    var openTelemetryBuilder = builder.Services.AddOpenTelemetry();

    var openTelemetrySection = configuration.GetSection(OPEN_TELEMETRY_CONFIG_SECTION);
    var exporterUri = openTelemetrySection.GetValue<string?>(EXPORTER_URI_CONFIG_KEY);
    var metricsPort = openTelemetrySection.GetValue<int?>(METRICS_PORT_CONFIG_KEY);

    if (!string.IsNullOrWhiteSpace(exporterUri))
    {
      builder.Logging.AddOpenTelemetry(logging =>
      {
        logging.IncludeFormattedMessage = true;
        logging.IncludeScopes = true;
      });

      builder.Services.Configure<OpenTelemetryLoggerOptions>(
        logging => logging.AddOtlpExporter(options => options.Endpoint = new Uri(exporterUri))
      );

      openTelemetryBuilder
        .WithTracing(builder =>
        {
          builder.SetResourceBuilder(CreateResourceBuilder());

          builder.AddOtlpExporter(options => options.Endpoint = new Uri(exporterUri));

          builder
            .AddSource(typeof(Observability).FullName!.Split('.').First() + ".*")
            .AddAspNetCoreInstrumentation()
            .AddHotChocolateInstrumentation()
            .AddEntityFrameworkCoreInstrumentation(options => options.SetDbStatementForText = true);
        });
    }

    if (metricsPort.HasValue || !string.IsNullOrWhiteSpace(exporterUri))
    {
      openTelemetryBuilder
        .WithMetrics(builder =>
        {
          builder.SetResourceBuilder(CreateResourceBuilder());

          if (!string.IsNullOrEmpty(exporterUri))
          {
            builder.AddOtlpExporter(options => options.Endpoint = new Uri(exporterUri));
          }

          if (metricsPort.HasValue)
          {
            builder.AddPrometheusExporter(options => options.DisableTotalNameSuffixForCounters = true);
          }

          builder
            .AddAspNetCoreInstrumentation()
            .AddRuntimeInstrumentation();
        });
    }

    return builder;
  }

  public static IApplicationBuilder UseRGMetricsScrapingEndpoint(this WebApplication app)
  {
    var openTelemetrySection = app.Configuration.GetSection(OPEN_TELEMETRY_CONFIG_SECTION);
    var metricsPort = openTelemetrySection.GetValue<int?>(METRICS_PORT_CONFIG_KEY);

    if (metricsPort.HasValue && metricsPort.Value > 0)
    {
      app.UseOpenTelemetryPrometheusScrapingEndpoint(context =>
        context.Request.Path == "/metrics" &&
        context.Connection.LocalPort == metricsPort);
    }

    return app;
  }

  private static ResourceBuilder CreateResourceBuilder()
    => ResourceBuilder
      .CreateDefault()
      .AddService(Assembly.GetEntryAssembly()?.GetName().Name ?? "RealGimm");
}
