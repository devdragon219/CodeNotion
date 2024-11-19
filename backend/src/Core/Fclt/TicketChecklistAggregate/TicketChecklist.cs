using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.InterventionTypeAggregate;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt.TicketChecklistAggregate;

public class TicketChecklist : EntityBase, IAggregateRoot, IInternallyCoded
{
  [FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE), Required]
  public string InternalCode { get; private set; } = default!;

  [FuzzySearchable, MaxLength(StrFieldSizes.NAME), Required]
  public string Name { get; private set; } = default!;

  public Contract Contract { get; private set; } = default!;
  public int EstateUnitId { get; private set; }
  public int CatalogueTypeId { get; private set; }
  public TicketChecklistTemplateType Type { get; private set; }

  public decimal RawWorkCost { get; private set; }
  public decimal SafetyCost { get; private set; }
  public CostBaseFactor CostBaseFactor { get; private set; }

  public PlannedPeriod? PreventativePlannedPeriod { get; private set; }
  public DayOfWeek[]? PreventativeDaysOfWeek { get; private set; }
  public int? PreventativeToleranceDays { get; private set; }
  public InterventionType? PreventativeInterventionType { get; private set; } = default!;
  public Craft? PreventativeCraft { get; private set; } = default!;
  public int[]? PreventativeActivityIds { get; private set; } = [];
  
  public InterventionType? OnTriggerInterventionType { get; private set; } = default!;
  public Craft? OnTriggerCraft { get; private set; } = default!;
  public int[]? OnTriggerActivityIds { get; private set; } = [];

  public void SetBaseData(TicketChecklistTemplateType type, string name, string internalCode)
  {
    InternalCode = internalCode;
    Name = name;
    Type = type;
  }

  public void SetCatalogueTypeId(int catalogueTypeId) => CatalogueTypeId = catalogueTypeId;
  
  public void SetEstateUnitId(int estateUnitId) => EstateUnitId = estateUnitId;
  
  public void SetContract(Contract contract) => Contract = contract;

  public void SetCosts(decimal rawWorkCost, decimal safetyCost, CostBaseFactor costBaseFactor)
  {
    RawWorkCost = rawWorkCost;
    SafetyCost = safetyCost;
    CostBaseFactor = costBaseFactor;
  }

  public void SetPreventativeSpecifics(
    PlannedPeriod? plannedPeriod,
    DayOfWeek[]? daysOfWeek,
    int? toleranceDays,
    InterventionType? interventionType,
    Craft? craft,
    int[]? activityIds)
  {
    PreventativePlannedPeriod = plannedPeriod;
    PreventativeDaysOfWeek = daysOfWeek?.Distinct().ToArray();
    PreventativeToleranceDays = toleranceDays;
    PreventativeInterventionType = interventionType;
    PreventativeCraft = craft;
    PreventativeActivityIds = activityIds?.Distinct().ToArray();
  }

  public void SetOnTriggerSpecifics(InterventionType? interventionType, Craft? craft, int[]? activityIds)
  {
    OnTriggerInterventionType = interventionType;
    OnTriggerCraft = craft;
    OnTriggerActivityIds = activityIds?.Distinct().ToArray();
  }
  
  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(InternalCode))
    {
      yield return ErrorCode.InternalCodeIsNullOrEmptyString.ToValidationError();
    }

    if (string.IsNullOrWhiteSpace(Name))
    {
      yield return ErrorCode.NameIsNullOrEmptyString.ToValidationError();
    }

    if (Type is TicketChecklistTemplateType.PreventativeAndOnTriggerCondition or TicketChecklistTemplateType.Preventative)
    {
      if (PreventativeActivityIds is null || PreventativeActivityIds.Length == 0)
      {
        yield return ErrorCode.ActivityIdsIsEmpty.ToValidationError();
      }

      if (PreventativeToleranceDays.HasValue && PreventativeToleranceDays < 0)
      {
        yield return ErrorCode.InvalidPreventativeToleranceDays.ToValidationError();
      }

      if (PreventativePlannedPeriod is PlannedPeriod.Midweek &&
        (PreventativeDaysOfWeek is null || PreventativeDaysOfWeek.Length == 0))
      {
        yield return ErrorCode.InvalidPreventativeDaysOfWeek.ToValidationError();
      }
    }

    if (Type is TicketChecklistTemplateType.PreventativeAndOnTriggerCondition or TicketChecklistTemplateType.OnTriggerCondition)
    {
      if (OnTriggerActivityIds is null || OnTriggerActivityIds.Length == 0)
      {
        yield return ErrorCode.ActivityIdsIsEmpty.ToValidationError();
      }
    }
  }
}
