using HotChocolate.Execution.Configuration;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Web.Anag.Extensions;

namespace RealGimm.Web.Anag;

public class AnagConfiguration
{
  public static void AddGqlConfig(IRequestExecutorBuilder services)
  {
    services
      .AddTypeExtension<AnagQueries>()
      .AddTypeExtension<AnagMutations>();

    services
      .AddTypeExtension<OrgUnitExtension>()
      .AddTypeExtension<SubjectRelationExtension>()
      .AddTypeExtension<PhysicalSubjectExtension>()
      .AddTypeExtension<SubjectExtension>()
      .AddTypeExtension<UserExtension>();  
  }
}
