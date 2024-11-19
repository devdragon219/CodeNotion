using ClosedXML.Excel;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.SubjectCategoryAggregate;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Anag.Services;

public class SubjectExportService : ExportService<Subject, SubjectExportService>
{
  protected override Dictionary<string, Func<Subject, XLCellValue>> CreateExcelDataSelector()
  => new()
  {
    [nameof(Subject.InternalCode)] = subject
      => subject.InternalCode,

    [nameof(Subject.Name)] = subject
      => subject.Name,

    ["SubjectType"] = subject
      => subject is ManagementSubject
        ? LocalizeEnumValue(PersonType.ManagementSubject)
        : Localizer["OtherSubject"].Value,

    ["LegalNature"] = subject
      => subject switch
      {
        LegalSubject legalSubject when legalSubject.LegalSubjectType == LegalSubjectType.ActualLegalSubject
          => Localizer["OtherPerson"].Value,

        _ => LocalizeEnumValue(subject.PersonType),
      },

    [nameof(Subject.EntryStatus)] = subject
      => LocalizeEnumValue(subject.EntryStatus),

    ["VatNumber"] = subject
      => subject switch
      {
        IBusinessSubject businessSubject => businessSubject.BaseCountryTaxIdCode,
        PhysicalSubject physicalSubject => physicalSubject.ProfessionalTaxIdCode,
        _ => Blank.Value
      },

    [nameof(PhysicalSubject.BirthCountryTaxIdCode)] = subject
      => subject is PhysicalSubject physicalSubject
        ? physicalSubject.BirthCountryTaxIdCode
        : Blank.Value,

    [$"{nameof(Subject.LegalResidentialAddress)}.{nameof(Address.CountryISO)}"] = subject
      => RegionData.RegionNameFromISO(subject.LegalResidentialAddress?.CountryISO),

    [$"{nameof(Subject.LegalResidentialAddress)}.{nameof(Address.CityName)}"] = subject
      => subject.LegalResidentialAddress?.CityName,

    [$"{nameof(Subject.LegalResidentialAddress)}.{nameof(Address.Toponymy)}"] = subject
      => string.Join(
        ", ",
        new[] { subject.LegalResidentialAddress?.Toponymy, subject.LegalResidentialAddress?.Numbering }
          .Where(@string => !string.IsNullOrEmpty(@string))),

    [$"{nameof(Subject.LegalResidentialAddress)}.{nameof(Address.CountyName)}"] = subject
      => subject.LegalResidentialAddress?.CountyName,

    [nameof(Subject.OwningMgmtSubjects)] = subject
      => string.Join(", ", subject.OwningMgmtSubjects.Select(relateion => relateion.Main.Name)),

    ["Category"] = subject
      => string.Join(
        ", ",
        subject.Categories
          .Where(category => category.Function != CategoryFunction.CompanyGroup)
          .Select(category => category.Name)),

    [nameof(Subject.ExternalSourceCode)] = subject
      => subject.ExternalSourceCode,

    ["CompanyGroupParentName"] = subject
      => subject is LegalSubject legalSubject
        ? legalSubject.CompanyGroupParent?.Main?.Name
        : Blank.Value,

    ["CompanyGroupRelationType"] = subject
      => subject is LegalSubject legalSubject
        ? LocalizeEnumValue(legalSubject.CompanyGroupParent?.GroupRelationType)
        : Blank.Value,

    [nameof(IBusinessSubject.InterGroupSignature)] = subject
      => subject is IBusinessSubject businessSubject
        ? businessSubject.InterGroupSignature
        : Blank.Value,

    ["SplitPayment"] = subject
      => LocalizeBool(subject.TaxStatuses.Any(taxStatus =>
          taxStatus.TaxStatusType == TaxStatusType.ApplySplitPayment &&
          taxStatus.IsStillValid())),

    [$"{nameof(Subject.Contacts)}.{ContactInfoType.EMail}"] = subject
      => subject.GetContact(ContactInfoType.EMail)?.ContactInfo,

    [$"{nameof(Subject.Contacts)}.{ContactInfoType.RegisteredEmail}"] = subject
      => subject.GetContact(ContactInfoType.RegisteredEmail)?.ContactInfo
  };
}
