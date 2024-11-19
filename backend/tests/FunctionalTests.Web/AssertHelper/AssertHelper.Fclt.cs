using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.Core.Fclt.ContractTemplateAggregate;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.InterventionTypeAggregate;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Fclt.PriceListAggregate;
using RealGimm.Core.Fclt.PriceListArticleAggregate;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;
using RealGimm.Core.Fclt.QualificationLevelAggregate;
using RealGimm.Core.Fclt.ServiceAggregate;
using RealGimm.Core.Fclt.ServiceCategoryAggregate;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.Core.Fclt.WorkTeamAggregate;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web;

internal static partial class AssertHelper
{
  public static class Fclt
  {
    public static void QualificationLevelEqual(QualificationLevelInput input, QualificationLevel entity)
    {
      Assert.Equal(input.InternalCode, entity.InternalCode);
      Assert.Equal(input.Name, entity.Name);
      Assert.Equal(input.Ordering, entity.Ordering);
    }

    public static void CraftEqual(CraftInput input, Craft entity)
    {
      Assert.Equal(input.InternalCode, entity.InternalCode);
      Assert.Equal(input.Name, entity.Name);
      Assert.Equal(input.Ordering, entity.Ordering);
    }

    public static void PriceListMeasurementUnitEqual(PriceListMeasurementUnitInput input, PriceListMeasurementUnit entity)
    {
      Assert.Equal(input.InternalCode, entity.InternalCode);
      Assert.Equal(input.Name, entity.Name);
      Assert.Equal(input.Ordering, entity.Ordering);
    }

    public static void TicketTypeEqual(TicketTypeInput input, TicketType entity)
    {
      Assert.Equal(input.InternalCode, entity.InternalCode);
      Assert.Equal(input.Description, entity.Description);
      Assert.Equal(input.Ordering, entity.Ordering);
    }

    public static void InterventionTypeEqual(InterventionTypeInput input, InterventionType entity)
    {
      Assert.Equal(input.InternalCode, entity.InternalCode);
      Assert.Equal(input.Name, entity.Name);
    }

    public static void WorkerEqual(WorkerInput input, Worker entity)
    {
      if (input.Id.HasValue)
      {
        Assert.Equal(input.Id, entity.Id);
      }

      Assert.Equal(input.FirstName, entity.FirstName);
      Assert.Equal(input.LastName, entity.LastName);
      Assert.Equal(input.Since, entity.Since);
      Assert.Equal(input.Until, entity.Until);
      Assert.Equal(input.CraftId, entity.Craft.Id);
      Assert.Equal(input.QualificationLevelId, entity.QualificationLevel.Id);
    }

    public static void WorkTeamEqual(WorkTeamInput input, WorkTeam entity)
    {
      Assert.Equal(input.InternalCode, entity.InternalCode);
      Assert.Equal(input.Description, entity.Description);
      Assert.Equal(input.ProviderSubjectId, entity.ProviderSubjectId);
      Assert.Equal(input.LeaderUserId, entity.LeaderUserId);
      Assert.Equal(input.InsertionDate, entity.InsertionDate);
      CollectionsEqual(input.Workers, entity.Workers, WorkerEqual);
    }

    public static void HolidayEqual(HolidayInput input, Holiday entity)
    {
      if (input.Id.HasValue)
      {
        Assert.Equal(input.Id, entity.Id);
      }

      Assert.Equal(input.Name, entity.Name);
      Assert.Equal(input.Date, entity.Date);
      Assert.Equal(input.Periodicity, entity.Periodicity);
    }

    public static void TimeRangeEqual(TimeRangeInput inputs, TimeRange entity)
    {
      Assert.Equal(inputs.Since, entity.Since);
      Assert.Equal(inputs.Until, entity.Until);
    }

    public static void CalendarDayEqual(CalendarDayInput input, CalendarDay entity)
    {
      CollectionsEqual(input.TimeRanges, entity.TimeRanges, TimeRangeEqual);
    }

    public static void CalendarEqual(CalendarInput input, Calendar entity)
    {
      Assert.Equal(input.Name, entity.Name);
      Assert.Equal(input.TimeZoneId, entity.TimeZoneId);
      Equal(input.Sunday, entity.Sunday, CalendarDayEqual);
      Equal(input.Monday, entity.Monday, CalendarDayEqual);
      Equal(input.Tuesday, entity.Tuesday, CalendarDayEqual);
      Equal(input.Wednesday, entity.Wednesday, CalendarDayEqual);
      Equal(input.Thursday, entity.Thursday, CalendarDayEqual);
      Equal(input.Friday, entity.Friday, CalendarDayEqual);
      Equal(input.Saturday, entity.Saturday, CalendarDayEqual);

      CollectionsEqual(
        input.Holidays.OrderBy(holiday => holiday.Name),
        entity.Holidays.OrderBy(holiday => holiday.Name),
        HolidayEqual);
    }

    public static void PenaltyValueEqual(PenaltyValueInput input, PenaltyValue entity)
    {
      if (input.Id.HasValue)
      {
        Assert.Equal(input.Id, entity.Id);
      }

      Assert.Equal(input.Type, entity.Type);
      Assert.Equal(input.Amount, entity.Amount);
    }

    public static void PenaltyEqual(PenaltyInput input, Penalty entity)
    {
      Assert.Equal(input.InternalCode, entity.InternalCode);
      Assert.Equal(input.Description, entity.Description);
      ComplexTicketConditionEqual(input.IfCondition, entity.IfCondition);
      Assert.Equal(input.ThenOperator, entity.ThenOperator);
      CollectionsEqual(input.ThenPenalties, entity.ThenPenalties, PenaltyValueEqual);
    }

    public static void SLAEqual(SLAInput input, SLA entity)
    {
      Assert.Equal(input.InternalCode, entity.InternalCode);
      Assert.Equal(input.Description, entity.Description);
      ComplexTicketConditionEqual(input.IfCondition, entity.IfCondition);
      ComplexTicketConditionEqual(input.ThenCondition, entity.ThenCondition);
    }

    public static void ComplexTicketConditionEqual(ComplexTicketConditionInput input, ComplexTicketCondition entity)
    {
      Assert.Equal(input.Operator, entity.Operator);
      
      CollectionsEqual(
        input.InternalConditions
          .OrderBy(condition => condition
            .GetType()
            .GetProperties()
            .FirstOrDefault(property => property
              .GetValue(condition) != null)
              ?.PropertyType
              .Name),
        entity.InternalConditions.OrderBy(condition => condition.GetType().Name),
        TicketConditionEqual);
    }

    public static void TicketTypeEqualityConditionEqual(
      TicketTypeEqualityConditionInput input,
      TicketTypeEqualityCondition entity)
    {
      Assert.Equal(input.Operator, entity.Operator);
      Assert.Equal(input.TargetTicketTypeId, entity.TargetTicketType.Id);
    }

    public static void TicketMasterStatusConditionEqual(
      TicketMasterStatusConditionInput input,
      TicketMasterStatusCondition entity)
    {
      Assert.Equal(input.CalendarId, entity.Calendar.Id);
      Assert.Equal(input.TargetMasterStatus, entity.TargetMasterStatus);
      Assert.Equal(input.TimeComparisonOperator, entity.TimeComparisonOperator);
      Assert.Equal(input.MinTimePeriodInMinutes, entity.MinTimePeriodInMinutes);
      Assert.Equal(input.MaxTimePeriodInMinutes, entity.MaxTimePeriodInMinutes);
    }

    public static void TicketCatalogueCategoryEqualityConditionEqual(
      TicketCatalogueCategoryEqualityConditionInput input,
      TicketCatalogueCategoryEqualityCondition entity)
    {
      Assert.Equal(input.Operator, entity.Operator);
      Assert.Equal(input.TargetCatalogueCategoryId, entity.TargetCatalogueCategoryId);
    }

    public static void TicketCatalogueSubCategoryEqualityConditionEqual(
      TicketCatalogueSubCategoryEqualityConditionInput input,
      TicketCatalogueSubCategoryEqualityCondition entity)
    {
      Assert.Equal(input.Operator, entity.Operator);
      Assert.Equal(input.TargetCatalogueSubCategoryId, entity.TargetCatalogueSubCategoryId);
    }

    public static void TicketCatalogueTypeEqualityConditionEqual(
      TicketCatalogueTypeEqualityConditionInput input,
      TicketCatalogueTypeEqualityCondition entity)
    {
      Assert.Equal(input.Operator, entity.Operator);
      Assert.Equal(input.TargetCatalogueTypeId, entity.TargetCatalogueTypeId);
    }

    public static void TicketPriorityEqualityConditionEqual(
      TicketPriorityEqualityConditionInput input,
      TicketPriorityEqualityCondition entity)
    {
      Assert.Equal(input.Operator, entity.Operator);
      Assert.Equal(input.TargetPriority, entity.TargetPriority);
    }

    public static void TicketConditionEqual(OneOfTicketConditionInput input, TicketCondition entity)
    {
      Equal(input.Complex, entity as ComplexTicketCondition, ComplexTicketConditionEqual);
      Equal(input.TicketTypeEquality, entity as TicketTypeEqualityCondition, TicketTypeEqualityConditionEqual);
      Equal(input.MasterStatus, entity as TicketMasterStatusCondition, TicketMasterStatusConditionEqual);
      Equal(input.CatalogueCategoryEquality, entity as TicketCatalogueCategoryEqualityCondition, TicketCatalogueCategoryEqualityConditionEqual);
      Equal(input.CatalogueSubCategoryEquality, entity as TicketCatalogueSubCategoryEqualityCondition, TicketCatalogueSubCategoryEqualityConditionEqual);
      Equal(input.CatalogueTypeEquality, entity as TicketCatalogueTypeEqualityCondition, TicketCatalogueTypeEqualityConditionEqual);
      Equal(input.PriorityEquality, entity as TicketPriorityEqualityCondition, TicketPriorityEqualityConditionEqual);
    }

    public static void TicketChecklistTemplateEqual(TicketChecklistTemplateInput input, TicketChecklistTemplate entity)
    {
      Assert.Equal(input.InternalCode, entity.InternalCode);
      Assert.Equal(input.Name, entity.Name);
      Assert.Equal(input.CatalogueTypeId, entity.CatalogueTypeId);
      Assert.Equal(input.Type, entity.Type);
      Assert.Equal(input.RawWorkCost, entity.RawWorkCost);
      Assert.Equal(input.SafetyCost, entity.SafetyCost);
      Assert.Equal(input.CostBaseFactor, entity.CostBaseFactor);
      Assert.Equal(input.PreventativePlannedPeriod, entity.PreventativePlannedPeriod);
      Assert.Equivalent(input.PreventativeDaysOfWeek, entity.PreventativeDaysOfWeek);
      Assert.Equal(input.PreventativeToleranceDays, entity.PreventativeToleranceDays);
      Assert.Equal(input.PreventativeInterventionTypeId, entity.PreventativeInterventionType?.Id);
      Assert.Equal(input.PreventativeCraftId, entity.PreventativeCraft?.Id);
      Assert.Equivalent(input.PreventativeActivityIds, entity.PreventativeActivityIds);
      Assert.Equal(input.OnTriggerInterventionTypeId, entity.OnTriggerInterventionType?.Id);
      Assert.Equal(input.OnTriggerCraftId, entity.OnTriggerCraft?.Id);
      Assert.Equivalent(input.OnTriggerActivityIds, entity.OnTriggerActivityIds);
    }

    public static void ContractTemplateEqual(ContractTemplateInput input, ContractTemplate entity)
    {
      Assert.Equal(input.InternalCode, entity.InternalCode);
      Assert.Equal(input.Description, entity.Description);
      Assert.Equal(input.ContractTypeId, entity.ContractType.Id);
      Assert.Equivalent(input.CatalogueTypeIds, entity.CatalogueTypeIds);
      Assert.Equivalent(input.SLAIds, entity.SLAs.Select(sla => sla.Id));
      Assert.Equivalent(input.PenaltyIds, entity.Penalties.Select(penalty => penalty.Id));
    }

    public static void PriceListEqual(PriceListInput input, PriceList entity)
    {
      Assert.Equal(input.InternalCode, entity.InternalCode);
      Assert.Equal(input.Name, entity.Name);
      Assert.Equal(input.Ordering, entity.Ordering);
      Assert.Equal(input.IsDefault, entity.IsDefault);
    }

    public static void PriceListArticleEqual(AddPriceListArticleInput input, PriceListArticle entity)
    {
      Assert.Equal(input.InternalCode, entity.InternalCode);
      Assert.Equal(input.Name, entity.Name);
      Assert.Equal(input.MeasurementUnitId, entity.MeasurementUnit.Id);
      Assert.Equal(input.PriceListId, entity.PriceList.Id);
      Assert.Equal(input.CatalogueTypeIds, entity.CatalogueTypeIds);
      Assert.Equal(input.Since, entity.PricePeriods.Single().Since);
      Assert.Equal(input.Price, entity.PricePeriods.Single().Price);
    }

    public static void PriceListArticleEqual(UpdatePriceListArticleInput input, PriceListArticle entity)
    {
      Assert.Equal(input.InternalCode, entity.InternalCode);
      Assert.Equal(input.Name, entity.Name);
      Assert.Equal(input.MeasurementUnitId, entity.MeasurementUnit.Id);
      Assert.Equal(input.PriceListId, entity.PriceList.Id);
      Assert.Equal(input.CatalogueTypeIds, entity.CatalogueTypeIds);
      CollectionsEqual(input.PricePeriods, entity.PricePeriods, PriceListArticleEqual);
    }

    public static void PriceListArticleEqual(ArticlePricePeriodInput input, ArticlePricePeriod entity)
    {
      Assert.Equal(input.Since, entity.Since);
      Assert.Equal(input.Until, entity.Until);
      Assert.Equal(input.Price, entity.Price);
    }

    public static void ServiceEqual(ServiceInput input, Service entity)
    {
      Assert.Equal(input.InternalCode, entity.InternalCode);
      Assert.Equal(input.Name, entity.Name);
      Assert.Equal(input.Name, entity.Name);
      Assert.Equal(input.CategoryId, entity.Category.Id);
      Assert.Equal(input.SubCategoryId, entity.SubCategory.Id);
      CollectionsEqual(input.Activities, entity.Activities, ServiceActivityEqual);
    }

    public static void ServiceCategoryEqual(ServiceCategoryInput input, ServiceCategory entity)
    {
      Assert.Equal(input.InternalCode, entity.InternalCode);
      Assert.Equal(input.Name, entity.Name);
      CollectionsEqual(input.SubCategories, entity.SubCategories, ServiceSubCategoryEqual);
    }

    public static void ServiceSubCategoryEqual(ServiceSubCategoryInput input, ServiceSubCategory subCategory)
    {
      Assert.Equal(input.Name, subCategory.Name);
      Assert.Equal(input.InternalCode, subCategory.InternalCode);
    }

    public static void ServiceActivityEqual(ServiceActivityInput input, ServiceActivity activity)
    {
      Assert.Equal(input.Name, activity.Name);
      Assert.Equal(input.ActivityType, activity.ActivityType);
      Assert.Equal(input.IsMandatoryByLaw, activity.IsMandatoryByLaw);
    }
  }
}
