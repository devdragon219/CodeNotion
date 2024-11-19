using HotChocolate.Data.Sorting;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Web.Anag.Queries.Sorting;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Asst.Queries.Sorting;

public class EstateSortInputType : SortInputType<Estate>
{
  protected override void Configure(ISortInputTypeDescriptor<Estate> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor
      .Field(f => f.Addresses.FirstOrDefault(address => address.AddressType == AddressType.Primary))
      .Type<AddressSortInputType>()
      .Name("primaryAddress");
    
    descriptor
      .BindExtensionStringField<Estate, Core.Anag.SubjectAggregate.Subject>("managementSubjectName",
          subject => subject.Name!,
          idDict => e => idDict[e.ManagementSubjectId]
        );
  }
}
