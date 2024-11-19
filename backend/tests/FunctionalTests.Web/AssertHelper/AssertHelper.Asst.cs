using AsstAddress = RealGimm.Core.Asst.EstateAggregate.Address;
using RealGimm.Web.Asst.Models;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.FunctionAreaAggregate;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.CadastralLandCategoryAggregate;

namespace RealGimm.FunctionalTests.Web;

internal static partial class AssertHelper
{
  public static class Asst
  {
    public static void CadastralUnitEqual(CadastralUnitInput input, CadastralUnit cadastralUnit)
    {
      if (input.EstateUnitId is not null)
      {
        Assert.Equal(input.EstateUnitId, cadastralUnit.EstateUnit!.Id);
      }

      if (input.InternalCode is not null)
      {
        Assert.Equal(input.InternalCode, cadastralUnit.InternalCode);
      }

      Assert.Equal(input.Type, cadastralUnit.Type);
      Assert.Equal(input.Status, cadastralUnit.Status);
      Assert.Equal(input.Since, cadastralUnit.Since);
      Assert.Equal(input.Until, cadastralUnit.Until);
      Assert.Equal(input.CadastralNotes, cadastralUnit.CadastralNotes);
      Assert.Equal(input.FiscalNotes, cadastralUnit.FiscalNotes);
      Assert.Equal(input.ConsortiumNotes, cadastralUnit.ConsortiumNotes);

      Equal(input.Address, cadastralUnit.Address, AddressEqual);
      Equal(input.Inspection, cadastralUnit.Inspection, CadastralUnitInspectionEqual);
      Equal(input.Income, cadastralUnit.Income, CadastralUnitIncomeEqual);

      CollectionsEqual(input.Coordinates, cadastralUnit.Coordinates, CadastralCoordinatesEqual);
      CollectionsEqual(input.Expenses ?? Array.Empty<CadastralExpensesInput>(), cadastralUnit.Expenses, CadastralExpenseEqual);

      CollectionsEqual(
        input.Unavailabilities ?? Array.Empty<CadastralUnavailabilityInput>(),
        cadastralUnit.Unavailabilities,
        CadastralUnavailabilityEqual);
    }

    public static void EstateUnitEqual(EstateUnitInput input, EstateUnit estateUnit)
    {
      Assert.Equal(input.InternalCode, estateUnit.InternalCode);
      Assert.Equal(input.Type, estateUnit.Type);
      Assert.Equal(input.Status, estateUnit.Status);
      Assert.Equal(input.OwnershipType, estateUnit.OwnershipType);
      Assert.Equal(input.SharedArea, estateUnit.SharedArea);
      Assert.Equal(input.SubNumbering, estateUnit.SubNumbering);
      Assert.Equal(input.StairId, estateUnit.Stair?.Id);
      Assert.Equal(input.FloorIds, estateUnit.Floors?.Select(floor => floor.Id));

      if (input.CadastralUnit is not null)
      {
        Equal(input.CadastralUnit, estateUnit.CurrentCadastralUnit, CadastralUnitEqual);
      }
    }
    
    public static void FunctionAreaEqual(FunctionAreaInput input, FunctionArea functionArea)
    {
      Assert.Equal(input.Name, functionArea.Name);
      Assert.Equal(input.InternalCode, functionArea.InternalCode);
      Assert.Equal(input.SurfaceType, functionArea.SurfaceType);
    }

    public static void CatalogueCategoryEqual(CatalogueCategoryInput input, CatalogueCategory category)
    {
      Assert.Equal(input.Name, category.Name);
      Assert.Equal(input.InternalCode, category.InternalCode);
      CollectionsEqual(input.SubCategories, category.SubCategories, CatalogueSubCategoryEqual);
    }

    public static void CatalogueTypeEqual(CatalogueTypeInput input, CatalogueType type)
    {
      Assert.Equal(input.Name, type.Name);
      Assert.Equal(input.InternalCode, type.InternalCode);
      Assert.Equal(input.Notes, type.Notes);
      Assert.Equal(input.CategoryId, type.Category!.Id);
      Assert.Equal(input.SubCategoryId, type.SubCategory?.Id);
      CollectionsEqual(input.UsageTypeIds, type.UsageTypes.Select(u => u.Id).ToArray(), (input, row) => Assert.Equal(input, row));
      CollectionsEqual(input.Activities, type.Activities, CatalogueTypeActivityEqual);
      CollectionsEqual(input.Fields, type.Fields, (input, row) => CollectionsEqual(input, row, CatalogueTypeFieldEqual));
    }

    public static void CatalogueItemEqual(CatalogueItemInput input, CatalogueItem item)
    {
      if (input.Id.GetValueOrDefault() != default)
      {
        Assert.Equal(input.Id, item.Id);
      }

      Assert.Equal(input.EstateId, item.Estate!.Id);
      Assert.Equal(input.CatalogueTypeId, item.CatalogueType!.Id);
      Assert.Equal(input.InternalCode, item.InternalCode);
      Assert.Equal(input.Status, item.Status);
      Assert.Equal(input.ActivationDate, item.ActivationDate);
      Assert.Equal(input.LastMaintenanceDate, item.LastMaintenanceDate);
      Assert.Equal(input.DecommissioningDate, item.DecommissioningDate);
      CollectionsEqual(input.Fields, item.Fields, CatalogueItemFieldEqual);
    }

    private static void AddressEqual(AddressInput input, AsstAddress address)
    {
      Assert.Equal(input.AddressType, address.AddressType);
      Assert.Equal(input.CityName, address.CityName);
      Assert.Equal(input.Toponymy, address.Toponymy);
      Assert.Equal(input.CountryISO, address.CountryISO);
      Assert.Equal(input.RegionName, address.RegionName);
      Assert.Equal(input.CountyName, address.CountyName);
      Assert.Equal(input.LocalPostCode, address.LocalPostCode);
      Assert.Equal(input.Numbering, address.Numbering);
      Assert.Equal(input.Notes, address.Notes);
      Assert.Equal(input.LocationLatLon, address.LocationLatLon);
    }

    private static void CadastralUnitInspectionEqual(CadastralUnitInspectionInput input, CadastralUnitInspection inspection)
    {
      Assert.Equal(input.MacroZone, inspection.MacroZone);
      Assert.Equal(input.MicroZone, inspection.MicroZone);
      Assert.Equal(input.IsHistoricalEstate, inspection.IsHistoricalEstate);
      Assert.Equal(input.IsDirectRestriction, inspection.IsDirectRestriction);
      Assert.Equal(input.ProtocolDate, inspection.ProtocolDate);
      Assert.Equal(input.Date, inspection.Date);
      Assert.Equal(input.ProtocolNumber, inspection.ProtocolNumber);
      Assert.Equal(input.Heading, inspection.Heading);
    }

    private static void CadastralUnitIncomeEqual(CadastralUnitIncomeInput input, CadastralUnitIncome income)
    {
      Assert.Equal(input.MacroCategory, income.MacroCategory);
      Assert.Equal(input.MicroCategory, income.MicroCategory);
      Assert.Equal(input.Metric, income.Metric);
      Assert.Equal(input.MetricAmount, income.MetricAmount);
      Assert.Equal(input.MetricRentedAmount, income.MetricRentedAmount);
      Assert.Equal(input.RegisteredSurface, income.RegisteredSurface);
      Assert.Equal(input.Type, income.Type);
      Assert.Equal(input.CadastralAmount, income.CadastralAmount);
    }

    private static void CadastralCoordinatesEqual(CadastralCoordinatesInput input, CadastralCoordinates coordinates)
    {
      Assert.Equal(input.Notes, coordinates.Notes);
      Assert.Equal(input.Level1, coordinates.Level1);
      Assert.Equal(input.Level2, coordinates.Level2);
      Assert.Equal(input.Level3, coordinates.Level3);
      Assert.Equal(input.Level4, coordinates.Level4);
      Assert.Equal(input.Level5, coordinates.Level5);
      Assert.Equal(input.ITTavPartita, coordinates.ITTavPartita);
      Assert.Equal(input.ITTavCorpo, coordinates.ITTavCorpo);
      Assert.Equal(input.ITTavPorzione, coordinates.ITTavPorzione);
      Assert.Equal(input.Type, coordinates.CoordinateType);
      Assert.Equal(input.UnmanagedOverride, coordinates.UnmanagedOverride);
    }

    private static void CadastralExpenseEqual(CadastralExpensesInput input, CadastralExpenses expense)
    {
      Assert.Equal(input.ExpenseType, expense.ExpenseType);
      Assert.Equal(input.ReferenceYear, expense.ReferenceYear);
      Assert.Equal(input.FiscalYear, expense.FiscalYear);
      Assert.Equal(input.Amount, expense.Amount);
      Assert.Equal(input.RevaluationFactor, expense.RevaluationFactor);
    }

    private static void CadastralUnavailabilityEqual(
      CadastralUnavailabilityInput input,
      CadastralUnavailability unavailability)
    {
      Assert.Equal(input.Since, unavailability.Since);
      Assert.Equal(input.Until, unavailability.Until);
      Assert.Equal(input.Notes, unavailability.Notes);
    }

    public static void CatalogueSubCategoryEqual(CatalogueSubCategoryInput input, CatalogueSubCategory subCategory)
    {
      Assert.Equal(input.Name, subCategory.Name);
      Assert.Equal(input.InternalCode, subCategory.InternalCode);
    }

    private static void CatalogueTypeActivityEqual(CatalogueTypeActivityInput input, CatalogueTypeActivity activity)
    {
      Assert.Equal(input.Name, activity.Name);
      Assert.Equal(input.ActivityType, activity.ActivityType);
      Assert.Equal(input.IsMandatoryByLaw, activity.IsMandatoryByLaw);
    }

    private static void CatalogueTypeFieldEqual(CatalogueTypeFieldInput input, CatalogueTypeField field)
    {
      Assert.Equal(input.Name, field.Name);
      Assert.Equal(input.Type, field.Type);
      Assert.Equal(input.IsMandatory, field.IsMandatory);
      Assert.Equal(input.ValidValues, field.ValidValues);
    }

    private static void CatalogueItemFieldEqual(CatalogueItemFieldInput input, CatalogueItemField field)
    {
      Assert.Equal(input.Name, field.Name);
      Assert.Equal(input.IsMandatory, field.IsMandatory);
      Assert.Equal(input.TemplateTypeId, field.TemplateTypeId);
      Assert.Equal(input.Type, field.Type);
      Assert.Equal(input.Value, field.Value);
    }

    public static void EstateUsageTypeEqual(EstateUsageTypeInput input, EstateUsageType field)
    {
      Assert.Equal(input.Name, field.Name);
      Assert.Equal(input.InternalCode, field.InternalCode);
      Assert.Equal(input.IsForEstate, field.IsForEstate);
      Assert.Equal(input.IsForEstateUnit, field.IsForEstateUnit);
      Assert.Equal(input.IsForEstateSubUnit, field.IsForEstateSubUnit);
      Assert.Equal(input.IsForContracts, field.IsForContracts);
    }

    public static void EstateMainUsageTypeEqual(EstateMainUsageTypeInput input, EstateMainUsageType field)
    {
      Assert.Equal(input.Name, field.Name);
      Assert.Equal(input.InternalCode, field.InternalCode);
    }

    public static void CadastralLandCategoryEqual(CadastralLandCategoryInput input, CadastralLandCategory field)
    {
      Assert.Equal(input.Ordering, field.Ordering);
      Assert.Equal(input.InternalCode, field.InternalCode);
      Assert.Equal(input.Description, field.Description);
    }
  }
}
