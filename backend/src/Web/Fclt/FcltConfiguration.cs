using HotChocolate.Execution.Configuration;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Fclt.TicketAggregate.QuoteHistory;
using RealGimm.Core.Fclt.TicketAggregate.TicketHistory;
using RealGimm.Web.Fclt.Extensions;

namespace RealGimm.Web.Fclt;

public class FcltConfiguration
{
  public static void AddGqlConfig(IRequestExecutorBuilder services)
  {
    services
      .AddTypeExtension<FcltQueries>()
      .AddTypeExtension<FcltMutations>()
      .AddTypeExtension<EstateUnitGroupExtension>()
      .AddTypeExtension<ContractExtension>()
      .AddTypeExtension<WorkTeamExtension>()
      .AddTypeExtension<ContractTemplateExtension>()
      .AddTypeExtension<PriceListArticleExtension>()
      .AddTypeExtension<TicketChecklistTemplateExtension>()
      .AddTypeExtension<TicketExtension>()
      .AddTypeExtension<CalendarTicketOutputExtension>()
      .AddTypeExtension<ReplyExtension>()
      .AddTypeExtension<TicketHistoryEntryExtension>()
      .AddTypeExtension<QuoteHistoryEntryExtension>()
      .AddTypeExtension<SLAExtension>()
      .AddTypeExtension<PenaltyExtension>()
      .AddTypeExtension<TicketChecklistExtension>()
      .AddTypeExtension<TicketChecklistsPerEstateUnitExtension>()
      .AddTypeExtension<TicketPerEstateUnitExtension>()
      .AddTypeExtension<TicketCatalogueTypeEqualityConditionExtension>()
      .AddTypeExtension<TicketCatalogueCategoryEqualityConditionExtension>()
      .AddTypeExtension<TicketCatalogueSubCategoryEqualityConditionExtension>()
      .AddType<TicketCondition>()
      .AddType<ComplexTicketCondition>()
      .AddType<TicketTypeEqualityCondition>()
      .AddType<TicketMasterStatusCondition>()
      .AddType<TicketCatalogueCategoryEqualityCondition>()
      .AddType<TicketCatalogueSubCategoryEqualityCondition>()
      .AddType<TicketCatalogueTypeEqualityCondition>()
      .AddType<TicketPriorityEqualityCondition>()
      .AddType<QuoteHistoryEntry>()
      .AddType<AmountUpdatedQuoteHistoryEntry>()
      .AddType<ApprovedAmountUpdatedQuoteHistoryEntry>()
      .AddType<MasterStatusUpdatedQuoteHistoryEntry>()
      .AddType<TicketHistoryEntry>()
      .AddType<MasterStatusUpdatedTicketHistoryEntry>()
      .AddType<NewReminderTicketHistoryEntry>()
      .AddType<NewReplyTicketHistoryEntry>()
      .AddType<ReminderDeletedTicketHistoryEntry>()
      .AddType<ReminderUpdatedTicketHistoryEntry>()
      .AddType<ConvertedToExcludedFromMaintenanceContractTicketHistoryEntry>();
  }
}
