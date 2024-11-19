using HotChocolate.Data.Sorting;
using RealGimm.Web.Prop.Models;

namespace RealGimm.Web.Prop.Queries.Sorting;

public class RegistryCommunicationAnomalyOutputSortInputType : SortInputType<RegistryCommunicationAnomalyOutput>
{
  protected override void Configure(ISortInputTypeDescriptor<RegistryCommunicationAnomalyOutput> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}

