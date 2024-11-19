using HotChocolate.Data.Filters;
using RealGimm.Web.Prop.Models;

namespace RealGimm.Web.Prop.Queries.Filters;

public class RegistryCommunicationAnomalyOutputFilterType : FilterInputType<RegistryCommunicationAnomalyOutput>
{
  protected override void Configure(IFilterInputTypeDescriptor<RegistryCommunicationAnomalyOutput> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
