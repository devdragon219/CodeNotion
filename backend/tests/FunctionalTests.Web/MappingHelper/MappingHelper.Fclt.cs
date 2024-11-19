using RealGimm.Core.Fclt.ContractTemplateAggregate;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web;

public static class MappingHelper
{
  public static class Fclt
  {
    public static SLAInput MapSLAInput(SLA sla)
      => new()
      {
        InternalCode = sla.InternalCode,
        Description = sla.Description,
        IfCondition = MapComplexTicketCondition(sla.IfCondition),
        ThenCondition = MapComplexTicketCondition(sla.ThenCondition)
      };

    public static PenaltyInput MapPenaltyInput(Penalty penalty)
      => new()
      {
        InternalCode = penalty.InternalCode,
        Description = penalty.Description,
        IfCondition = MapComplexTicketCondition(penalty.IfCondition),
        ThenOperator = penalty.ThenOperator,
        ThenPenalties = penalty.ThenPenalties.Select(MapPenaltyValueInput).ToArray()
      };

    public static PenaltyValueInput MapPenaltyValueInput(PenaltyValue penaltyValue)
      => new()
      {
        Id = penaltyValue.Id,
        Amount = penaltyValue.Amount,
        Type = penaltyValue.Type
      };

    public static ComplexTicketConditionInput MapComplexTicketCondition(ComplexTicketCondition condition)
      => new()
      {
        Id = condition.Id,
        Operator = condition.Operator,
        InternalConditions = condition.InternalConditions.Select(MapOneOfTicketConditionInput).ToArray()
      };

    public static TicketTypeEqualityConditionInput MapTicketTypeEqualityCondition(TicketTypeEqualityCondition condition)
      => new()
      {
        Id = condition.Id,
        Operator = condition.Operator,
        TargetTicketTypeId = condition.TargetTicketType.Id
      };

    public static TicketMasterStatusConditionInput MapTicketMasterStatusCondition(TicketMasterStatusCondition condition)
      => new()
      {
        Id = condition.Id,
        TargetMasterStatus = condition.TargetMasterStatus,
        CalendarId = condition.Calendar.Id,
        TimeComparisonOperator = condition.TimeComparisonOperator,
        MinTimePeriodInMinutes = condition.MinTimePeriodInMinutes,
        MaxTimePeriodInMinutes = condition.MaxTimePeriodInMinutes
      };

    public static TicketCatalogueCategoryEqualityConditionInput MapTicketCatalogueCategoryEqualityCondition(TicketCatalogueCategoryEqualityCondition condition)
      => new()
      {
        Id = condition.Id,
        Operator = condition.Operator,
        TargetCatalogueCategoryId = condition.TargetCatalogueCategoryId
      };

    public static TicketCatalogueSubCategoryEqualityConditionInput MapTicketCatalogueSubCategoryEqualityCondition(TicketCatalogueSubCategoryEqualityCondition condition)
      => new()
      {
        Id = condition.Id,
        Operator = condition.Operator,
        TargetCatalogueSubCategoryId = condition.TargetCatalogueSubCategoryId
      };

    public static TicketCatalogueTypeEqualityConditionInput MapTicketCatalogueTypeEqualityCondition(TicketCatalogueTypeEqualityCondition condition)
      => new()
      {
        Id = condition.Id,
        Operator = condition.Operator,
        TargetCatalogueTypeId = condition.TargetCatalogueTypeId
      };

    public static TicketPriorityEqualityConditionInput MapTicketPriorityEqualityCondition(TicketPriorityEqualityCondition condition)
      => new()
      {
        Id = condition.Id,
        Operator = condition.Operator,
        TargetPriority = condition.TargetPriority
      };

    public static OneOfTicketConditionInput MapOneOfTicketConditionInput(TicketCondition condition)
      => condition switch
      {
        ComplexTicketCondition complexCondition => new()
        {
          Complex = MapComplexTicketCondition(complexCondition)
        },

        TicketTypeEqualityCondition ticketTypeEqualityCondition => new()
        {
          TicketTypeEquality = MapTicketTypeEqualityCondition(ticketTypeEqualityCondition)
        },

        TicketMasterStatusCondition ticketMasterStatusCondition => new()
        {
          MasterStatus = MapTicketMasterStatusCondition(ticketMasterStatusCondition)
        },

        TicketCatalogueCategoryEqualityCondition ticketCatalogueCategoryEqualityCondition => new()
        {
          CatalogueCategoryEquality = MapTicketCatalogueCategoryEqualityCondition(ticketCatalogueCategoryEqualityCondition)
        },

        TicketCatalogueSubCategoryEqualityCondition ticketCatalogueSubCategoryEqualityCondition => new()
        {
          CatalogueSubCategoryEquality = MapTicketCatalogueSubCategoryEqualityCondition(ticketCatalogueSubCategoryEqualityCondition)
        },

        TicketCatalogueTypeEqualityCondition ticketCatalogueTypeEqualityCondition => new()
        {
          CatalogueTypeEquality = MapTicketCatalogueTypeEqualityCondition(ticketCatalogueTypeEqualityCondition)
        },

        TicketPriorityEqualityCondition ticketPriorityEqualityCondition => new()
        {
          PriorityEquality = MapTicketPriorityEqualityCondition(ticketPriorityEqualityCondition)
        },

        _ => throw new NotSupportedException()
      };

    public static TicketChecklistTemplateInput MapTicketChecklistTemplateInput(TicketChecklistTemplate template)
      => new()
      {
        InternalCode = template.InternalCode,
        Name = template.Name,
        CatalogueTypeId = template.CatalogueTypeId,
        Type = template.Type,
        RawWorkCost = template.RawWorkCost,
        SafetyCost = template.SafetyCost,
        CostBaseFactor = template.CostBaseFactor,
        PreventativePlannedPeriod = template.PreventativePlannedPeriod,
        PreventativeDaysOfWeek = template.PreventativeDaysOfWeek,
        PreventativeInterventionTypeId = template.PreventativeInterventionType?.Id,
        PreventativeCraftId = template.PreventativeCraft?.Id,
        PreventativeActivityIds = template.PreventativeActivityIds,
        OnTriggerInterventionTypeId = template.OnTriggerInterventionType?.Id,
        OnTriggerCraftId = template.OnTriggerCraft?.Id,
        OnTriggerActivityIds = template.OnTriggerActivityIds
      };
    
    public static ContractTemplateInput MapContractTemplateInput(ContractTemplate template)
      => new()
      {
        InternalCode = template.InternalCode,
        Description = template.Description,
        ContractTypeId = template.ContractType.Id,
        CatalogueTypeIds = template.CatalogueTypeIds,
        SLAIds = template.SLAs.Select(sla => sla.Id).ToArray(),
        PenaltyIds = template.Penalties.Select(penalty => penalty.Id).ToArray()
      };
  }
}
