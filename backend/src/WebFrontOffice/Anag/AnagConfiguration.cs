using HotChocolate.Execution.Configuration;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.WebFrontOffice.Anag.Extensions;

namespace RealGimm.WebFrontOffice.Anag;

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
      .AddTypeExtension<UserExtension>();  
  }
}
