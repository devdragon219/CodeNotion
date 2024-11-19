using RealGimm.FunctionalTests.Web.Extensions;

namespace RealGimm.FunctionalTests.Web;

internal static partial class GraphQLHelper
{
  public static class Asst
  {
    private static string CatalogueSubCategoryFragment() => """
      id
      name
      internalCode
      """;

    private static string CatalogueTypeFieldFragment() => """
      id
      name
      isMandatory
      type
      validValues
      """;

    public static string CatalogueTypeActivityFragment() => """
      id
      name
      activityType
      isMandatoryByLaw
      """;

    private static string CatalogueItemFieldFragment() => """
      name
      isMandatory
      type
      templateTypeId
      value
      """;

    public static string AddressFragment() => """
      addressType
      cityName
      cityReference
      countyName
      countyReference
      regionName
      regionReference
      countryName
      countryISO
      toponymy
      numbering
      localPostCode
      notes
      deletionDate
      """;

    public static string FunctionAreaFragment() => """
      id
      name
      internalCode
      surfaceType
      """;

    public static string CatalogueCategoryFragment(bool includeCatalogueTypes = false)
      => $$"""
          id
          name
          internalCode
          subCategories {
            {{CatalogueSubCategoryFragment()}}
          }
          """
          .AppendLineIfTrue(includeCatalogueTypes, new(() => $$"""
          catalogueTypes {
            {{CatalogueTypeFragment()}}
          }
          """));

    public static string CatalogueTypeFragment() => $$"""
      id
      name
      internalCode
      activities {
        {{CatalogueTypeActivityFragment()}}
      }
      category {
        {{CatalogueCategoryFragment()}}
      }
      subCategory {
        {{CatalogueSubCategoryFragment()}}
      }
      fields {
        {{CatalogueTypeFieldFragment()}}
      }
      """;

    public static string CatalogueItemFragment(bool includeFields = false, bool includeCatalogueType = false)
      => $$"""
          id
          internalCode
          status
          activationDate
          lastMaintenanceDate
          """
          .AppendLineIfTrue(includeFields, new(() => $$"""
          fields {
            {{CatalogueItemFieldFragment()}}
          }
          """))
          .AppendLineIfTrue(includeCatalogueType, new(() => $$"""
          catalogueType {
            {{CatalogueTypeFragment()}}
          }
          """));

    public static string CatalogueOutputFragment()
      => """
          estateId
          estateInternalCode
          catalogueTypeId
          catalogueCategory
          catalogueSubCategory
          catalogueType
          catalogueTypeCount
          """;

    public static string EstateUsageTypeFragment() => """
      id
      name,
      internalCode,
      isForEstate,
      isForEstateUnit,
      isForEstateSubUnit,
      isForContracts
      """;

    public static string EstateMainUsageTypeFragment() => """
      id
      name,
      internalCode
      """;

    public static string CadastralLandCategoryFragment() => """
      id
      ordering,
      internalCode,
      description
      """;

    public static string EstateFragment(
      bool includeTotalMarketValue = false,
      bool includeMainUsageType = false,
      bool includeUsageType = false,
      bool includeAddresses = false,
      bool includeStairs = false,
      bool includeFloors = false,
      bool includeValuations = false,
      bool includeEstateUnits = false,
      bool includeRefactorings = false,
      bool includeCatalogueItems = false)
      => $$"""
          id
          name
          internalCode
          externalCode
          status
          type
          ownership
          surfaceAreaSqM
          buildYear
          decommissioningDate
          managementSubjectId
          managementOrgUnitId
          notes
          deletionDate
          """
          .AppendLineIfTrue(includeTotalMarketValue, new(() => $$"""
          totalMarketValue {
            {{EstateTotalMarketValueFragment()}}
          }
          """))
          .AppendLineIfTrue(includeMainUsageType, new(() => $$"""
          mainUsageType { 
            {{EstateMainUsageTypeFragment()}}
          }
          """))
          .AppendLineIfTrue(includeUsageType, new(() => $$"""
          usageType { 
            {{EstateUsageTypeFragment()}}
          }
          """))
          .AppendLineIfTrue(includeAddresses, new(() => $$"""
          addresses {
            {{AddressFragment()}}
          }
          """))
          .AppendLineIfTrue(includeStairs, new(() => $$"""
          stairs {
            {{StairFragment()}}
          }
          """))
          .AppendLineIfTrue(includeFloors, new(() => $$"""
          floors {
            {{FloorFragment()}}
          }
          """))
          .AppendLineIfTrue(includeValuations, new(() => $$"""
          valuations {
            {{ValuationFragment()}}
          }
          """))
          .AppendLineIfTrue(includeEstateUnits, new(() => $$"""
          estateUnits {
            {{EstateUnitFragment()}}
          }
          """))
          .AppendLineIfTrue(includeRefactorings, new(() => $$"""
          refactorings {
            {{RefactoringFragment()}}
          }
          """))
          .AppendLineIfTrue(includeCatalogueItems, new(() => $$"""
          catalogueItems {
            {{CatalogueItemFragment()}}
          }
          """));

    public static string StairFragment() => """
      id
      description
      """;

    public static string FloorFragment(bool includeEstateUnits = false, bool includeEstateUnitFloors = false)
      => """
          id
          name
          position
          templateReference
          """
          .AppendLineIfTrue(includeEstateUnits, new(() => $$"""
          estateUnits {
            {{EstateUnitFragment()}}
          }
          """))
          .AppendLineIfTrue(includeEstateUnitFloors, new(() => $$"""
          estateUnitFloor {
            {{EstateUnitFloorFragment()}}
          }
          """));

    public static string RefactoringFragment() => """
      id
      referenceYear
      buildingPermitYear
      condition
      ageCoefficient
      estateUnitIds
      """;

    public static string ValuationFragment() => """
      id      
      referenceYear
      iasValue
      rbaValue
      mortgageAmount
      transferYear
      revampOperations
      """;

    public static string EstateUnitFloorFragment(bool includeFloor = false, bool includeEstateUnit = false)
      => """
          id
          estateUnitId
          floorId
          """
          .AppendLineIfTrue(includeFloor, new(() => $$"""
          floor {
            {{FloorFragment()}}
          }
          """))
          .AppendLineIfTrue(includeEstateUnit, new(() => $$"""
          estateUnit {
            {{EstateUnitFragment()}}
          }
          """));

    public static string EstateUnitFragment(
      bool includeUsageType = false,
      bool includeEstate = false,
      bool includeAddress = false,
      bool includeStair = false,
      bool includeEstateSubUnits = false,
      bool includeRepossessions = false,
      bool includeUnitExpenses = false,
      bool includeSurfaces = false,
      bool includeFloors = false,
      bool includeLastRepossession = false,
      bool includeCadastralUnits = false)
      => """
          id
          name
          internalCode
          externalCode
          notes
          type
          status
          ownershipType
          ownershipStartDate
          ownershipEndDate
          ownershipPercent
          sharedArea
          procurementActId
          managementSubjectId
          disusedDate
          deletionDate
          lastRelevantChangeDate
          subNumbering
          officialActId
          historyTags
          netSurface
          grossSurface
          """
          .AppendLineIfTrue(includeUsageType, new(() => $$"""
          usageType {
            {{EstateUsageTypeFragment()}}
          }
          """))
          .AppendLineIfTrue(includeEstate, new(() => $$"""
          estate {
            {{EstateFragment()}}
          }
          """))
          .AppendLineIfTrue(includeAddress, new(() => $$"""
          address {
            {{AddressFragment()}}
          }
          """))
          .AppendLineIfTrue(includeStair, new(() => $$"""
          stair {
            {{StairFragment()}}
          }
          """))
          .AppendLineIfTrue(includeEstateSubUnits, new(() => $$"""
          estateSubUnits {
            {{EstateSubUnitFragment()}}
          }
          """))
          .AppendLineIfTrue(includeRepossessions, new(() => $$"""
          repossessions {
            {{RepossessionFragment()}}
          }
          """))
          .AppendLineIfTrue(includeUnitExpenses, new(() => $$"""
          unitExpenses {
            {{UnitExpensesFragment()}}
          }
          """))
          .AppendLineIfTrue(includeSurfaces, new(() => $$"""
          surfaces {
            {{EstateUnitSurfaceFragment()}}
          }
          """))
          .AppendLineIfTrue(includeFloors, new(() => $$"""
          floors {
            {{FloorFragment()}}
          }
          """))
          .AppendLineIfTrue(includeLastRepossession, new(() => $$"""
          lastRepossession {
            {{RepossessionFragment()}}
          }
          """))
          .AppendLineIfTrue(includeCadastralUnits, new(() => $$"""
          cadastralUnits {
            {{CadastralUnitFragment()}}
          }
          currentCadastralUnit {
            {{CadastralUnitFragment()}}
          }
          """));

    public static string RepossessionFragment(bool includeEstateUnit = false)
      => """
          id
          notes
          eventDate
          eventType
          eventReason
          unitStatus
          isAssignable
          isKeysReturned
          isWithValuables
          """
          .AppendLineIfTrue(includeEstateUnit, new(() => $$"""
          estateUnit {
            {{EstateUnitFragment()}}
          }
          """));
    
    public static string UnitExpensesFragment(bool includeEstateUnit = false)
      => """
          id
          referenceYear
          amount
          revaluationFactor
          """
          .AppendLineIfTrue(includeEstateUnit, new(() => $$"""
          estateUnit {
            {{EstateUnitFragment()}}
          }
          """));

    public static string EstateSubUnitFragment(bool includeEstateUnit = false, bool includeUsageType = false)
      => """
          id
          internalCode
          occupantType
          occupantId
          orgUnitId
          notes
          since
          until
          deletionDate
          surfaceSqM
          occupancyPercent
          """
          .AppendLineIfTrue(includeEstateUnit, new(() => $$"""
          estateUnit {
            {{EstateUnitFragment(includeCadastralUnits: true)}}
          }
          """))
          .AppendLineIfTrue(includeUsageType, new(() => $$"""
          usageType {
            {{EstateUsageTypeFragment()}}
          }
          """));

    public static string EstateUnitSurfaceFragment(
      bool includeEstateUnit = false,
      bool includeFloor = false,
      bool includeFunctionArea = false)
      => """
          id
          metric
          surfaceSqMTotal
          surfaceSqMCommonArea
          surfaceSqMSideArea
          floorId
          functionAreaId
          """
          .AppendLineIfTrue(includeEstateUnit, new(() => $$"""
          estateUnit {
            {{EstateUnitFragment()}}
          }
          """))
          .AppendLineIfTrue(includeFloor, new(() => $$"""
          floor {
            {{FloorFragment()}}
          }
          """))
          .AppendLineIfTrue(includeFunctionArea, new(() => $$"""
          functionArea {
            {{FunctionAreaFragment()}}
          }
          """));

    public static string CadastralUnitFragment(
      bool includeEstateUnit = false,
      bool includeAddress = false,
      bool includeUnavailabilities = false,
      bool includeCoordinates = false,
      bool includeExpenses = false,
      bool includeTaxConfig = false,
      bool includeTaxPayments = false,
      bool includeIncome = false,
      bool includeInspection = false)
      => """
          id
          internalCode
          status
          type
          addressId
          since
          until
          deletionDate
          lastRelevantChangeDate
          historyTags
          cadastralNotes
          fiscalNotes
          consortiumNotes
          """
          .AppendLineIfTrue(includeEstateUnit, new(() => $$"""
          estateUnit {
            {{EstateUnitFragment()}}
          }
          """))
          .AppendLineIfTrue(includeAddress, new(() => $$"""
          address {
            {{AddressFragment()}}
          }
          """))
          .AppendLineIfTrue(includeUnavailabilities, new(() => $$"""
          unavailabilities {
            {{CadastralUnavailabilityFragment()}}
          }
          """))
          .AppendLineIfTrue(includeCoordinates, new(() => $$"""
          coordinates {
            {{CadastralCoordinatesFragment()}}
          }
          """))
          .AppendLineIfTrue(includeExpenses, new(() => $$"""
          expenses {
            {{CadastralExpenseFragment()}}
          }
          """))
          .AppendLineIfTrue(includeTaxConfig, new(() => $$"""
          taxConfig {
            {{CadastralUnitTaxConfigFragment()}}
          }
          """))
          .AppendLineIfTrue(includeTaxPayments, new(() => $$"""
          taxPayments {
            {{AssetTaxCalculationFragment()}}
          }
          """))
          .AppendLineIfTrue(includeIncome, new(() => $$"""
          income {
            {{CadastralUnitIncomeFragment()}}
          }
          """))
          .AppendLineIfTrue(includeInspection, new(() => $$"""
          inspection {
            {{CadastralUnitInspectionFragment()}}
          }
          """));

    public static string CadastralUnavailabilityFragment() => """
      id
      since
      until
      notes
      """;

    public static string CadastralCoordinatesFragment() => """
      id
      notes
      level1
      level2
      level3
      level4
      level5
      coordinateType
      itTavPartita
      itTavCorpo
      itTavPorzione
      hasITTavData
      unmanagedOverride
      """;

    public static string CadastralExpenseFragment() => """
      id
      expenseType
      referenceYear
      fiscalYear
      amount
      revaluationFactor
      """;

    public static string CadastralUnitTaxConfigFragment() => """
      id
      taxCalculator
      code
      isMandatory
      templateTypeId
      type
      value
      """;

    public static string AssetTaxCalculationFragment(bool includeInstallments = false, bool includeCadastralUnit = false)
      => """
          id
          taxCalculator
          taxCalculatorId
          year
          totalAmount
          """
          .AppendLineIfTrue(includeInstallments, new(() => $$"""
          installments {
            {{AssetTaxPaymentFragment()}}
          }
          expectedInstallments {
            {{AssetTaxPaymentFragment()}}
          }
          """))
          .AppendLineIfTrue(includeCadastralUnit, new(() => $$"""
          cadastralUnit {
            {{CadastralUnitFragment()}}
          }
          """));

    public static string AssetTaxPaymentFragment(bool includeAssetTaxPayment = false)
      => """
          id
          managementSubjectId
          managementSubjectBankAccountId
          date
          propertyMonths
          grossCadastralIncome
          actualizedCadastralIncome
          baseTaxableAmount
          amountPaid
          isDefinitive
          expectedDueDate
          installmentsPaid
          issue
          isIssueOverridden
          """
          .AppendLineIfTrue(includeAssetTaxPayment, new(() => $$"""
          assetTaxCalculation {
            {{AssetTaxCalculationFragment()}}
          }
          """));

    public static string CadastralUnitIncomeFragment(
      bool includeCadastralCategory = false,
      bool includeCadastralLandCategory = false) 
      => """
          macroCategory
          microCategory
          metric
          metricAmount
          metricRentedAmount
          registeredSurface
          type
          cadastralAmount
          farmAmount
          landAmount
          marketValue
          """
          .AppendLineIfTrue(includeCadastralCategory, new(() => $$"""
          cadastralCategory {
            {{CadastralCategoryFragment()}}
          }
          """))
          .AppendLineIfTrue(includeCadastralLandCategory, new(() => $$"""
          cadastralLandCategory {
            {{CadastralLandCategoryFragment()}}
          }
          """));

    public static string CadastralCategoryFragment() => """
      id
      description
      externalCode
      groupName
      countryISO
      cadastralValueFactor
      cadastralValueTaxFactor
      isInstrumental
      isTaxed
      """;

    public static string CadastralUnitInspectionFragment() => """
      date
      protocolDate
      protocolNumber
      heading
      macroZone
      microZone
      isHistoricalEstate
      isDirectRestriction
      """;

    public static string EstateTotalMarketValueFragment()
      => """
          id
          totalSurfaceAreaSqM
          notes
          coefficients {
            id
            type
            value
          }
          marketValues {
            id
            type
            value
          }
          """;

    public static string FloorTemplateFragment() => """
      id      
      name
      position
      guid
      """;
  }
}
