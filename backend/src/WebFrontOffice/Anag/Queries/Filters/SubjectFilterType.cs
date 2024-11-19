using RealGimm.Core.Anag.SubjectAggregate;
using HotChocolate.Data.Filters;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.WebFrontOffice.Anag.Queries.Filters;

public class SubjectFilterType : FilterInputType<Subject>
{
  protected override void Configure(IFilterInputTypeDescriptor<Subject> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.Ignore(subject => subject.Officers);
    descriptor.Ignore(subject => subject.OwningMgmtSubjects);
    descriptor.Ignore(subject => subject.SubOrganizations);
    descriptor.Ignore(subject => subject.CompanyGroupParent);
    descriptor.Ignore(subject => subject.Heirs);

    descriptor.Field(subject => subject.Addresses).Type<ListFilterInputType<AddressFilterType>>();
    descriptor.Field(subject => subject.Contacts).Type<ListFilterInputType<ContactFilterType>>();
    descriptor.Field(subject => subject.OrgUnits).Type<ListFilterInputType<OrgUnitFilterType>>();
    descriptor.Field(subject => subject.RelationMains).Type<ListFilterInputType<SubjectRelationFilterType>>();
    descriptor.Field(subject => subject.RelationSubordinates).Type<ListFilterInputType<SubjectRelationFilterType>>();

    descriptor
      .Field(f => f.Addresses.FirstOrDefault(address => address.AddressType == AddressType.LegalResidential))
      .Type<AddressFilterType>()
      .Name("legalResidentialAddress");
    
    descriptor.BindDerivedTypeFields<Subject, PhysicalSubject>();
    descriptor.BindDerivedTypeFields<Subject, LegalSubject>();
    descriptor.BindDerivedTypeFields<Subject, ManagementSubject>();
  }
}
