using RealGimm.Core.Anag.SubjectAggregate;
using HotChocolate.Data.Filters;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.CrossModule;

namespace RealGimm.WebFrontOffice.Anag.Queries.Filters;

public class ContactFilterType : FilterInputType<IContact>
{
  protected override void Configure(IFilterInputTypeDescriptor<IContact> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}