using RealGimm.FunctionalTests.Web.Extensions;

namespace RealGimm.FunctionalTests.Web;

internal static partial class GraphQLHelper
{
  public static class Anag
  {
    public static string ISubjectFragment(
      bool includeAddresses = false,
      bool includeContacts = false,
      bool includeOrgUnits = false,
      bool includeBankAccounts = false,
      bool includeCategories = false,
      bool includeTaxStatues = false,
      bool includeRelations = false)
      => """
          id
          name
          personType
          internalCode
          externalSourceCode
          customPersonType
          customSubjectStatus
          closureDate
          deletionDate
          entryStatus
          """
          .AppendLineIfTrue(includeAddresses, new(() => $$"""
          addresses {
            {{Common.AddressFragment()}}
          }
          """))
          .AppendLineIfTrue(includeContacts, new(() => $$"""
          contacts {
            {{Common.ContactFragment()}}
          }
          """))
          .AppendLineIfTrue(includeOrgUnits, new(() => $$"""
          orgUnits {
            {{OrgUnitFragment()}}
          }
          """))
          .AppendLineIfTrue(includeBankAccounts, new(() => $$"""
          bankAccounts {
            {{BankAccountFragment()}}
          }
          """))
          .AppendLineIfTrue(includeCategories, new(() => $$"""
            categories {
              {{SubjectCategoryFragment()}}
            }
          """))
          .AppendLineIfTrue(includeTaxStatues, new(() => $$"""
          taxStatuses {
            {{TaxStatusFragment()}}
          }
          """))
          .AppendLineIfTrue(includeRelations, new(() => $$"""
          relationMains {
            {{SubjectRelationFragment(includeMain: false, includeSubordinate: true)}}
          }
          relationSubordinates {
            {{SubjectRelationFragment(includeMain: true, includeSubordinate: false)}}
          }
          officers {
            {{SubjectRelationFragment(includeMain: false, includeSubordinate: true)}}
          }
          owningMgmtSubjects {
            {{SubjectRelationFragment(includeMain: true, includeSubordinate: false)}}
          }
          subOrganizations {
            {{SubjectRelationFragment(includeMain: false, includeSubordinate: true)}}
          }
          heirs {
            {{SubjectRelationFragment(includeMain: false, includeSubordinate: true)}}
          }
          """));

    public static string SubjectUnionFragment(
      bool includeAddresses = false,
      bool includeContacts = false,
      bool includeOrgUnits = false,
      bool includeBankAccounts = false,
      bool includeCategories = false,
      bool includeTaxStatues = false,
      bool includeRelations = false)
      => $$"""
          ... on LegalSubject {
            {{LegalSubjectFragment(
                includeAddresses,
                includeContacts,
                includeOrgUnits,
                includeBankAccounts,
                includeCategories,
                includeTaxStatues,
                includeRelations)}}
          }
          ... on ManagementSubject {
            {{ManagementSubjectFragment(
                includeAddresses,
                includeContacts,
                includeOrgUnits,
                includeBankAccounts,
                includeCategories,
                includeTaxStatues,
                includeRelations)}}
          }
          ... on PhysicalSubject {
            {{PhysicalSubjectFragment(
                includeAddresses,
                includeContacts,
                includeOrgUnits,
                includeBankAccounts,
                includeCategories,
                includeTaxStatues,
                includeRelations)}}
          }
          """;

    public static string ManagementSubjectFragment(
      bool includeAddresses = false,
      bool includeContacts = false,
      bool includeOrgUnits = false,
      bool includeBankAccounts = false,
      bool includeCategories = false,
      bool includeTaxStatues = false,
      bool includeRelations = false)
      => $$"""
          {{ISubjectFragment(
              includeAddresses,
              includeContacts,
              includeOrgUnits,
              includeBankAccounts,
              includeCategories,
              includeTaxStatues,
              includeRelations)}}
          fullName
          shorthandDescription
          baseCountryTaxIdCode
          additionalTaxIdCode
          baseCountryISO
          location
          businessStart
          shareCapital
          companiesHouseIdCode
          interGroupSignature
          additionalGovIdCode
          bankingId1
          bankingId2
          managementCode
          """;

    public static string LegalSubjectFragment(
      bool includeAddresses = false,
      bool includeContacts = false,
      bool includeOrgUnits = false,
      bool includeBankAccounts = false,
      bool includeCategories = false,
      bool includeTaxStatues = false,
      bool includeRelations = false)
      => $$"""
        {{ISubjectFragment(
            includeAddresses,
            includeContacts,
            includeOrgUnits,
            includeBankAccounts,
            includeCategories,
            includeTaxStatues,
            includeRelations)}}
        fullName
        shorthandDescription
        baseCountryTaxIdCode
        additionalTaxIdCode
        baseCountryISO
        location
        businessStart
        shareCapital
        companiesHouseIdCode
        interGroupSignature
        additionalGovIdCode
        bankingId1
        bankingId2
        legalSubjectType
        """;

    public static string PhysicalSubjectFragment(
      bool includeAddresses = false,
      bool includeContacts = false,
      bool includeOrgUnits = false,
      bool includeBankAccounts = false,
      bool includeCategories = false,
      bool includeTaxStatues = false,
      bool includeRelations = false)
      => $$"""
        {{ISubjectFragment(
            includeAddresses,
            includeContacts,
            includeOrgUnits,
            includeBankAccounts,
            includeCategories,
            includeTaxStatues,
            includeRelations)}}
        customGender
        firstName
        lastName
        birthSex
        birthCountryTaxIdCode
        professionalTaxIdCode
        birthDate
        deathDate
        birthLocation {
          {{Common.AddressFragment()}}
        }
        """;

    public static string OrgUnitFragment(
      bool includeParentSubject = false,
      bool includeParentOrgUnit = false,
      bool includeChildren = false)
      => $$"""
          id
          orgUnitType
          name
          internalCode
          externalCode
          notes
          entryStatus
          deletionDate
          closureDate
          geographicalCities
          parentOrgUnitId
          parentSubjectId
          contacts {
            {{Common.ContactFragment()}}
          }
          """
          .AppendLineIfTrue(includeParentSubject, new(() => $$"""
          parentSubject {
            {{SubjectUnionFragment()}}
          }
          """))
          .AppendLineIfTrue(includeParentOrgUnit, new(() => $$"""
          parentOrgUnit {
            {{OrgUnitFragment()}}
          }
          """))
          .AppendLineIfTrue(includeChildren, new(() => $$"""
          children {
            {{OrgUnitFragment()}}
          }
          """));

    public static string BankAccountFragment() => """
      id
      bankAccountType
      referenceCode
      referenceCodeType
      notes
      accountHolder
      """;

    public static string SubjectCategoryFragment(bool includeSubjects = false) => $$"""
      id
      name
      function {
        {{CategoryFunctionFragment()}}
      }
      """
      .AppendLineIfTrue(includeSubjects, new(() => $$"""
      subjects {
        {{SubjectUnionFragment()}}
      }
      """));

    public static string TaxStatusFragment() => """
      id
      taxStatusType
      notes
      since
      until      
      """;

    public static string SubjectRelationFragment(bool includeMain = false, bool includeSubordinate = false)
      => """
          id
          relationType
          since
          until
          officerRelationType
          groupRelationType
          notes
          """
          .AppendLineIfTrue(includeMain, new(() => $$"""
          main {
            {{SubjectUnionFragment()}}
          }
          """))
          .AppendLineIfTrue(includeSubordinate, new(() => $$"""
          subordinate {
            {{SubjectUnionFragment()}}
          }
          """));

    public static string CategoryFunctionFragment() => """
      isNone
      isOfficer
      isAgreementParty
      isSupplier
      isEmployee
      isLandlord
      isTenant
      isCompanyGroup
      isHeir
      isBuildingAdministrator
      """;
  }
}
