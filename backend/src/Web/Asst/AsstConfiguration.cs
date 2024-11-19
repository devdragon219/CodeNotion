using HotChocolate.Execution.Configuration;
using RealGimm.Core.Common;
using RealGimm.Web.Asst.Extensions;

namespace RealGimm.Web.Asst;

public class AsstConfiguration
{
  public static void AddGqlConfig(IRequestExecutorBuilder services)
  {
    services
      .AddTypeExtension<AsstQueries>()
      .AddTypeExtension<AsstMutations>()
      .AddTypeExtension<EstateExtension>()
      .AddTypeExtension<EstateUnitExtension>()
      .AddTypeExtension<EstateSubUnitExtension>()
      .AddTypeExtension<RefactoringExtension>()
      .AddTypeExtension<CadastralUnitExtension>()
      .AddTypeExtension<CatalogueItemExtension>();
  }
}
