using HotChocolate.Data.Filters;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Nrgy.Queries.Filters;

public class UtilityServiceFilterType : FilterInputType<UtilityService>
{
  protected override void Configure(IFilterInputTypeDescriptor<UtilityService> descriptor)
  {
    descriptor.BindFieldsImplicitly();
    descriptor.Field(f => f.UtilityType).Type<UtilityTypeFilterType>();

    descriptor.BindExtensionStringField<UtilityService, Estate>("estateInternalCode",
      str => es => es.InternalCode!.Contains(str),
      idArray => utilityService => idArray.Any(e => utilityService.EstateIds.Contains(e))
    ); 
    
    descriptor.BindExtensionStringField<UtilityService, EstateUnit>("estateUnitInternalCode",
      str => eu => eu.InternalCode!.Contains(str),
      idArray => utilityService => idArray.Any(e => utilityService.EstateUnitIds.Contains(e))
    );

    descriptor.BindExtensionStringField<UtilityService, Subject>("providerSubjectName",
      str => sub => sub.Name!.Contains(str),
      idArray => utilityService => idArray.Contains(utilityService.ProviderSubjectId)
    ); 
    
    descriptor.BindExtensionStringField<UtilityService, Subject>("providerSubjectInternalCode",
      str => sub => sub.InternalCode!.Contains(str),
      idArray => utilityService => idArray.Contains(utilityService.ProviderSubjectId)
    );

    descriptor.BindExtensionStringField<UtilityService, Subject>("providerSubjectProfessionalTaxIdCode",
      str => sub => sub is PhysicalSubject ? (sub as PhysicalSubject)!.ProfessionalTaxIdCode!.Contains(str) : false,
      idArray => utilityService => idArray.Contains(utilityService.ProviderSubjectId)
    );

    descriptor.BindExtensionStringField<UtilityService, Subject>("providerSubjectBaseCountryTaxIdCode",
      str => sub => sub is ManagementSubject ? (sub as ManagementSubject)!.BaseCountryTaxIdCode!.Contains(str) 
                                             : sub is LegalSubject ? (sub as LegalSubject)!.BaseCountryTaxIdCode!.Contains(str) : false,
      idArray => utilityService => idArray.Contains(utilityService.ProviderSubjectId)
    );

    descriptor.BindExtensionStringField<UtilityService, Subject>("referenceSubjectName",
      str => sub => sub.Name!.Contains(str),
      idArray => utilityService => idArray.Contains(utilityService.ReferenceSubjectId)
    );

    descriptor.BindExtensionStringField<UtilityService, OrgUnit>("orgUnitName",
      str => ou => ou.Name!.Contains(str),
      idArray => utilityService => idArray.Contains(utilityService.OrgUnitId)
    );

    descriptor.BindExtensionStringField<UtilityService, AccountingItem>("accountingItemInternalCode",
      str => ai => ai.InternalCode!.Contains(str),
      idArray => utilityService => idArray.Contains(utilityService.AccountingItemId)
    );

    descriptor.BindExtensionStringField<UtilityService, AccountingItem>("accountingItemDescription",
      str => ai => ai.Description!.Contains(str),
      idArray => utilityService => idArray.Contains(utilityService.AccountingItemId)
    );
  }
}
