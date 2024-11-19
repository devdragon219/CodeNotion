using HotChocolate.Data.Filters;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Web.Anag.Queries.Filters;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Asst.Queries.Filters;

public class EstateFilterType : FilterInputType<Estate>
{
  protected override void Configure(IFilterInputTypeDescriptor<Estate> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.Field(estate => estate.Addresses).Type<ListFilterInputType<AddressFilterType>>();
    descriptor.Field(estate => estate.Stairs).Type<ListFilterInputType<StairFilterType>>();
  
    descriptor
      .BindExtensionStringField<Estate, Subject>("managementSubjectName",
          str => subject => subject.Name!.Contains(str),
          idArray => e => idArray.Contains(e.ManagementSubjectId)
        );
  }
}
