using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace RealGimm.WebCommons;

public sealed class SchemaGeneration
{
  public static void JustGenerateSchema(
    IServiceProvider serviceProvider,
    string[] args,
    string defaultFileName)
  {
    var schemaFile = args
      .SkipWhile(a => a != "--generate-schema")
      .Skip(1)
      .FirstOrDefault() ?? defaultFileName;

    var logger = serviceProvider.GetRequiredService<ILogger<SchemaGeneration>>();

    try
    {
      var executor = serviceProvider
        .GetRequiredService<IRequestExecutorResolver>()
        .GetRequestExecutorAsync().Result;

      if (executor != null)
      {
        var schema = executor.Schema.Print();
        File.WriteAllText(schemaFile, schema);
      }

      logger.LogInformation("GraphQL schema successfully saved to {schemaFile}", schemaFile);
    }
    catch (Exception ex)
    {
      logger.LogError(ex, "An error occurred exporting the GraphQL schema. {exceptionMessage}", ex.Message);
    }
  }
}
