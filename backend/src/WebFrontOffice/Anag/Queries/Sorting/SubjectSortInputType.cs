using RealGimm.Core.Anag.SubjectAggregate;
using HotChocolate.Data.Sorting;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.WebFrontOffice.Anag.Queries.Sorting;

public class SubjectSortInputType : SortInputType<Subject>
{
  protected override void Configure(ISortInputTypeDescriptor<Subject> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor
      .Field(f => f.Addresses.FirstOrDefault(address => address.AddressType == AddressType.LegalResidential))
      .Type<AddressSortInputType>()
      .Name("legalResidentialAddress");

    descriptor.BindDerivedTypeFields<Subject, PhysicalSubject>();
    descriptor.BindDerivedTypeFields<Subject, LegalSubject>();
    descriptor.BindDerivedTypeFields<Subject, ManagementSubject>();
  }
}
