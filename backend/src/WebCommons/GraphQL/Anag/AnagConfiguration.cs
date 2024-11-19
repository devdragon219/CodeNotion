using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Anag.SubjectAggregate;

namespace RealGimm.WebCommons.GraphQL.Anag;

internal class AnagConfiguration
{
  public static void AddGqlConfig(IRequestExecutorBuilder services)
  {
    //Due to how union types work, single instances must be registered
    // (see https://chillicream.com/docs/hotchocolate/v13/defining-a-schema/unions)
    services
      .AddType<PhysicalSubject>()
      .AddType<ManagementSubject>()
      .AddType<LegalSubject>();
  }
}
