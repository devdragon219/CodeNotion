using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.Fclt.TicketAggregate.TicketHistory;
using RealGimm.Core.Shared;

namespace RealGimm.Core.Fclt.Services;

public class TicketConditionChecker
{
  public bool IsMacth(TicketData ticket, TicketCondition condition)
  {
    switch (condition)
    {
      case ComplexTicketCondition complexCondition:
      {
        return complexCondition.Operator switch
        {
          BooleanOperator.And => complexCondition.InternalConditions.All(internalCondition => IsMacth(ticket, internalCondition)),
          BooleanOperator.Or => complexCondition.InternalConditions.Any(internalCondition => IsMacth(ticket, internalCondition)),
          _ => throw new NotSupportedException($"Unsupported boolean operator: {complexCondition.Operator}")
        };
      }

      case TicketTypeEqualityCondition typeEqualityCondition:
      {
        return typeEqualityCondition.Operator switch
        {
          EqualityOperator.Equal => ticket.CustomTypeId == typeEqualityCondition.TargetTicketType.Id,
          EqualityOperator.NotEqual => ticket.CustomTypeId != typeEqualityCondition.TargetTicketType.Id,
          _ => throw new NotSupportedException($"Unsupported equality operator: {typeEqualityCondition.Operator}")
        };
      }

      case TicketMasterStatusCondition masterStatusCondition:
      {
        var calendar = masterStatusCondition.Calendar;
        var requestDateTime = ticket.RequestDateTime;
        
        var minTimeSpan = masterStatusCondition.MinTimePeriodInMinutes.HasValue
          ? TimeSpan.FromMinutes(masterStatusCondition.MinTimePeriodInMinutes.Value)
          : (TimeSpan?)null;

        var maxTimeSpan = masterStatusCondition.MaxTimePeriodInMinutes.HasValue
          ? TimeSpan.FromMinutes(masterStatusCondition.MaxTimePeriodInMinutes.Value)
          : (TimeSpan?)null;

        var minTargetTime = minTimeSpan.HasValue
          ? calendar.CalculateEndTime(requestDateTime, minTimeSpan.Value)
          : (DateTime?)null;

        var maxTargetTime = maxTimeSpan.HasValue
          ? calendar.CalculateEndTime(requestDateTime, maxTimeSpan.Value)
          : (DateTime?)null;

        var masterStatusHistory = ticket.History
          .OfType<MasterStatusUpdatedTicketHistoryEntry>()
          .Where(entry => entry.NewMasterStatus == masterStatusCondition.TargetMasterStatus);

        return masterStatusCondition.TimeComparisonOperator switch
        {
          ComparisonOperator.LessThan => masterStatusHistory.Any(entry => entry.Timestamp < maxTargetTime),
          ComparisonOperator.GreaterThan => masterStatusHistory.Any(entry => entry.Timestamp > minTargetTime),
          
          ComparisonOperator.Between => masterStatusHistory.Any(entry =>
            entry.Timestamp >= minTargetTime &&
            entry.Timestamp <= maxTargetTime),

          _ => throw new NotSupportedException($"Unsupported comparison operator: {masterStatusCondition.TimeComparisonOperator}")
        };
      }

      case TicketCatalogueCategoryEqualityCondition catalogueCategoryCondition:
      {
        return catalogueCategoryCondition.Operator switch
        {
          EqualityOperator.Equal => ticket.CatalogueCategoryId == catalogueCategoryCondition.TargetCatalogueCategoryId,
          EqualityOperator.NotEqual => ticket.CatalogueCategoryId != catalogueCategoryCondition.TargetCatalogueCategoryId,
          _ => throw new NotSupportedException($"Unsupported equality operator: {catalogueCategoryCondition.Operator}")
        };
      }

      case TicketCatalogueSubCategoryEqualityCondition catalogueSubCategoryCondition:
      {
        return catalogueSubCategoryCondition.Operator switch
        {
          EqualityOperator.Equal => ticket.CatalogueSubCategoryId == catalogueSubCategoryCondition.TargetCatalogueSubCategoryId,
          EqualityOperator.NotEqual => ticket.CatalogueSubCategoryId != catalogueSubCategoryCondition.TargetCatalogueSubCategoryId,
          _ => throw new NotSupportedException($"Unsupported equality operator: {catalogueSubCategoryCondition.Operator}")
        };
      }

      case TicketCatalogueTypeEqualityCondition catalogueTypeCondition:
      {
        return catalogueTypeCondition.Operator switch
        {
          EqualityOperator.Equal => ticket.CatalogueTypeId == catalogueTypeCondition.TargetCatalogueTypeId,
          EqualityOperator.NotEqual => ticket.CatalogueTypeId != catalogueTypeCondition.TargetCatalogueTypeId,
          _ => throw new NotSupportedException($"Unsupported equality operator: {catalogueTypeCondition.Operator}")
        };
      }
      
      case TicketPriorityEqualityCondition priorityCondition:
      {
        return priorityCondition.Operator switch
        {
          EqualityOperator.Equal => ticket.Priority == priorityCondition.TargetPriority,
          EqualityOperator.NotEqual => ticket.Priority != priorityCondition.TargetPriority,
          _ => throw new NotSupportedException($"Unsupported equality operator: {priorityCondition.Operator}")
        };
      }

      default: throw new NotSupportedException($"Unsupported condition type: {condition.GetType().Name}");
    }
  }

  public record TicketData
  {
    public required int? CustomTypeId { get; init; }
    public required int CatalogueTypeId { get; init; }
    public required int CatalogueCategoryId { get; init; }
    public required int CatalogueSubCategoryId { get; init; }
    public required TicketMasterStatus MasterStatus { get; init; }
    public required Priority Priority { get; init; }
    public required DateTime RequestDateTime { get; init; }
    public required TicketHistoryEntry[] History { get; init; }
  }
}
