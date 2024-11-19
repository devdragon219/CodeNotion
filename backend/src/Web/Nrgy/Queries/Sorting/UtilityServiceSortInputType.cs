using HotChocolate.Data.Sorting;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Nrgy.Queries.Sorting;

public class UtilityServiceSortInputType : SortInputType<UtilityService>
{
  protected override void Configure(ISortInputTypeDescriptor<UtilityService> descriptor)
  {
    descriptor.BindFieldsImplicitly();
    descriptor.Field(f => f.UtilityType).Type<UtilityTypeSortInputType>();

    descriptor.BindExtensionStringField<UtilityService, Subject>("providerSubjectName",
      subject => subject.Name!,
      idDict => us => idDict[us.ProviderSubjectId]
    ); 
    
    descriptor.BindExtensionStringField<UtilityService, Subject>("providerSubjectInternalCode",
      subject => subject.InternalCode!,
      idDict => us => idDict[us.ProviderSubjectId]
    );

    descriptor.BindExtensionStringField<UtilityService, Subject>("providerSubjectProfessionalTaxIdCode",
      sub => sub is PhysicalSubject ? (sub as PhysicalSubject)!.ProfessionalTaxIdCode! : string.Empty,
      idDict => us => idDict[us.ProviderSubjectId]
    );

    descriptor.BindExtensionStringField<UtilityService, Subject>("providerSubjectBaseCountryTaxIdCode",
      sub => sub is ManagementSubject ? (sub as ManagementSubject)!.BaseCountryTaxIdCode!
                                      : sub is LegalSubject ? (sub as LegalSubject)!.BaseCountryTaxIdCode! : string.Empty,
      idDict => us => idDict[us.ProviderSubjectId]
    );

    descriptor.BindExtensionStringField<UtilityService, Subject>("referenceSubjectName",
      subject => subject.Name!,
      idDict => us => idDict[us.ReferenceSubjectId]
    );

    descriptor.BindExtensionStringField<UtilityService, OrgUnit>("orgUnitName",
      subject => subject.Name!,
      idDict => us => idDict[us.OrgUnitId]
    );

    descriptor.BindExtensionStringField<UtilityService, AccountingItem>("accountingItemInternalCode",
      subject => subject.InternalCode!,
      idDict => us => idDict[us.AccountingItemId]
    );

    descriptor.BindExtensionStringField<UtilityService, AccountingItem>("accountingItemDescription",
      subject => subject.Description!,
      idDict => us => idDict[us.AccountingItemId]
    );
  }
}

