using HotChocolate.Execution.Configuration;
using RealGimm.Web.Docs.Extensions;

namespace RealGimm.Web.Docs;

public class DocsConfiguration
{
  public static void AddGqlConfig(IRequestExecutorBuilder services)
  {
    services
      .AddType<UploadType>()
      .AddTypeExtension<DocsQueries>()
      .AddTypeExtension<SubjectMutationsExtension>()
      .AddTypeExtension<EstateMutationsExtension>()
      .AddTypeExtension<EstateUnitMutationsExtension>()
      .AddTypeExtension<CatalogueItemMutationsExtension>()
      .AddTypeExtension<CatalogueMutationsExtension>()
      .AddTypeExtension<ContractMutationsExtension>()
      .AddTypeExtension<EstateQueriesExtension>()
      .AddTypeExtension<EstateUnitQueriesExtension>()
      .AddTypeExtension<CatalogueItemQueriesExtension>()
      .AddTypeExtension<CatalogueQueriesExtension>()
      .AddTypeExtension<TicketMutationsExtension>()
      .AddTypeExtension<FcltContractMutationsExtension>();
  }
}
