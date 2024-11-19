using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Web.Anag.Models;
using RealGimm.Core;

namespace RealGimm.FunctionalTests.Web;

internal static partial class AssertHelper
{
  public static class Anag
  {
    public static void ManagementSubjectEqual(ManagementSubjectInput input, ManagementSubject entity)
    {
      BusinessSubjectEqual(input, entity);
      Assert.Equal(input.ManagementCode, entity.ManagementCode);
    }

    public static void LegalSubjectEqual(LegalSubjectInput input, LegalSubject entity)
    {
      BusinessSubjectEqual(input, entity);
      Assert.Equal(input.LegalSubjectType, entity.LegalSubjectType);
      Assert.Equal(input.OwnerManagementSubjectIds, entity.OwningMgmtSubjects.Select(relation => relation.MainId));
    }

    public static void PhysicalSubjectEqual(PhysicalSubjectInput input, PhysicalSubject entity)
    {
      SubjectEqual(input, entity);
      Assert.Equal(input.FirstName, entity.FirstName);
      Assert.Equal(input.LastName, entity.LastName);
      Assert.Equal(input.CustomGender, entity.CustomGender);
      Assert.Equal(input.BirthSex, entity.BirthSex);
      Assert.Equal(input.BirthDate, entity.BirthDate);
      Equal(input.BirthLocation, entity.BirthLocation, AddressEqual);
      Assert.Equal(input.BirthCountryTaxIdCode, entity.BirthCountryTaxIdCode);
      Assert.Equal(input.ProfessionalTaxIdCode, entity.ProfessionalTaxIdCode);
      Assert.Equal(input.DeathDate, entity.DeathDate);
      CollectionsEqual(input.Heirs, entity.Heirs, HeirEqual);
      Assert.Equal(input.OwnerManagementSubjectIds, entity.OwningMgmtSubjects.Select(relation => relation.MainId));
    }

    private static void BusinessSubjectEqual(BusinessSubjectInput input, IBusinessSubject entity)
    {
      SubjectEqual(input, entity);
      Assert.Equal(input.FullName, entity.FullName);
      Assert.Equal(input.ShorthandDescription, entity.ShorthandDescription);
      Assert.Equal(input.BaseCountryTaxIdCode, entity.BaseCountryTaxIdCode);
      Assert.Equal(input.AdditionalTaxIdCode, entity.AdditionalTaxIdCode);
      Assert.Equal(input.BusinessStart, entity.BusinessStart);
      Assert.Equal(input.ShareCapital, entity.ShareCapital);
      Assert.Equal(input.CompaniesHouseIdCode, entity.CompaniesHouseIdCode);
      Assert.Equal(input.AdditionalGovIdCode, entity.AdditionalGovIdCode);
      Assert.Equal(input.InterGroupSignature, entity.InterGroupSignature);
      Assert.Equal(input.BankingId1, entity.BankingId1);
      Assert.Equal(input.BankingId2, entity.BankingId2);

      Equal(
        input.CompanyGroup,
        input.CompanyGroup?.GroupRelation switch
        {
          CompanyGroup.Member => entity.RelationMains
            .SingleOrDefault(relation => relation.RelationType == SubjectRelationType.CompanyGroup),
          
          CompanyGroup.Leader => entity.RelationSubordinates
            .SingleOrDefault(relation => relation.RelationType == SubjectRelationType.CompanyGroup),
          
          null => null,

          _ => throw new NotSupportedException()
        },
        CompanyGroupEqual);
    }
    
    private static void SubjectEqual(SubjectInput input, ISubject entity)
    {
      if (input.Id.HasValue)
      {
        Assert.Equal(input.Id, entity.Id);
      }

      Assert.Equal(input.EntryStatus, entity.EntryStatus);
      Assert.Equal(input.InternalCode, entity.InternalCode);
      Assert.Equal(input.ExternalSourceCode, entity.ExternalSourceCode);
      Assert.Equal(input.CustomPersonType, entity.CustomPersonType);
      Assert.Equal(input.CustomSubjectStatus, entity.CustomSubjectStatus);
      Assert.Equal(input.ClosureDate, entity.ClosureDate?.ToDateOnly());
      CollectionsEqual(input.Addresses, entity.Addresses, AddressEqual);
      CollectionsEqual(input.Contacts, entity.Contacts, ContactEqual);
      CollectionsEqual(input.BankAccounts, entity.BankAccounts, BankAccountEqual);
      CollectionsEqual(input.TaxStatuses, entity.TaxStatuses, TaxStatusEqual);
      CollectionsEqual(input.Officers, entity.Officers, OfficerEqual);
      Assert.Equal(input.CategoriesIds.Order(), entity.Categories.Select(category => category.Id).Order());
    }

    private static void AddressEqual(AddressInput input, Address entity)
    {
      if (input.Id.HasValue)
      {
        Assert.Equal(input.Id, entity.Id);
      }

      if (input.CityId is null)
      {
        Assert.Equal(input.CityName, entity.CityName);
        Assert.Equal(input.CountryISO?.ToLower(), entity.CountryISO?.ToLower());
        Assert.Equal(input.RegionName, entity.RegionName);
        Assert.Equal(input.CountyName, entity.CountyName);
      }

      Assert.Equal(input.AddressType, entity.AddressType);
      Assert.Equal(input.Toponymy, entity.Toponymy);
      Assert.Equal(input.Notes, entity.Notes);
      Assert.Equal(input.Numbering, entity.Numbering);
      Assert.Equal(input.LocalPostCode, entity.LocalPostCode);
    }

    private static void HeirEqual(HeirInput input, SubjectRelation entity)
    {
      Assert.Equal(input.Id, entity.SubordinateId);
      Assert.Equal(input.Since, entity.Since);
      Assert.Equal(input.Notes, entity.Notes);
    }

    private static void ContactEqual(ContactInput input, Contact entity)
    {
      if (input.Id.HasValue)
      {
        Assert.Equal(input.Id, entity.Id);
      }

      Assert.Equal(input.ContactType, entity.ContactType);
      Assert.Equal(input.ContactInfoType, entity.ContactInfoType);
      Assert.Equal(input.ContactInfo, entity.ContactInfo);
      Assert.Equal(input.Notes, entity.Notes);
    }

    private static void BankAccountEqual(BankAccountInput input, BankAccount entity)
    {
      if (input.Id.HasValue)
      {
        Assert.Equal(input.Id, entity.Id);
      }

      Assert.Equal(input.BankAccountType, entity.BankAccountType);
      Assert.Equal(input.ReferenceCodeType, entity.ReferenceCodeType);
      Assert.Equal(input.ReferenceCode, entity.ReferenceCode);
      Assert.Equal(input.AccountHolder, entity.AccountHolder);
      Assert.Equal(input.Notes, entity.Notes);
    }

    private static void TaxStatusEqual(TaxStatusInput input, TaxStatus entity)
    {
      if (input.Id.HasValue)
      {
        Assert.Equal(input.Id, entity.Id);
      }

      Assert.Equal(input.TaxStatusType, entity.TaxStatusType);
      Assert.Equal(input.Since, entity.Since);
      Assert.Equal(input.Until, entity.Until);
    }

    private static void OfficerEqual(OfficerInput input, SubjectRelation entity)
    {
      Assert.Equal(input.OfficerId, entity.SubordinateId);
      Assert.Equal(input.OfficerType, entity.OfficerRelationType);
      Assert.Equal(input.Since, entity.Since);
      Assert.Equal(input.Until, entity.Until);
      Assert.Equal(input.Notes, entity.Notes);
    }
    
    private static void CompanyGroupEqual(CompanyGroupInput input, SubjectRelation entity)
    {
      Assert.Equal(input.Id, entity.SubordinateId);
      Assert.Equal(input.GroupRelation, entity.GroupRelationType);
      Assert.Equal(input.Notes, entity.Notes);
    }
  }
}
