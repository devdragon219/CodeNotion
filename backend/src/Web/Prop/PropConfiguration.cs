using HotChocolate.Execution.Configuration;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;
using RealGimm.Web.Prop.Extensions;
using RealGimm.Web.Prop.Pagination;

namespace RealGimm.Web.Prop;

public class PropConfiguration
{
  public static void AddGqlConfig(IRequestExecutorBuilder services)
  {
    services
      .AddCursorPagingProvider<ContractListPagingProvider>(nameof(ContractListPagingProvider))
      .AddTypeExtension<PropQueries>()
      .AddTypeExtension<PropMutations>()
      .AddTypeExtension<BillRowExtension>()
      .AddTypeExtension<RegistrationOfficeExtension>()
      .AddTypeExtension<ContractExtensions>()
      .AddTypeExtension<ContractTypeExtensions>()
      .AddTypeExtension<CounterpartExtensions>()
      .AddTypeExtension<LocatedUnitExtensions>()
      .AddTypeExtension<SecurityDepositExtensions>()
      .AddTypeExtension<TransactorExtensions>()
      .AddTypeExtension<RegistrationTaxExtensions>()
      .AddTypeExtension<BillRowExtension>()
      .AddTypeExtension<TakeoverExtensions>()
      .AddTypeExtension<OneshotAdditionExtensions>()
      .AddTypeExtension<RecurringAdditionExtensions>()
      .AddTypeExtension<BillExtensions>()
      .AddTypeExtension<AdministrationExtensions>()
      .AddTypeExtension<TermInstallmentExtensions>()
      .AddTypeExtension<AdministrationTermExtensions>()
      .AddTypeExtension<CommEstateUnitExtensions>()
      .AddTypeExtension<RegistryCommunicationGroupExtensions>()
      .AddTypeExtension<BillFullListOutputExtensions>();
  }
}
