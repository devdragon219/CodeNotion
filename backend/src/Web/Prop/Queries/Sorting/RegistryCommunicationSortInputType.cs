using HotChocolate.Data.Sorting;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;

namespace RealGimm.Web.Prop.Queries.Sorting;

public class RegistryCommunicationSortInputType : SortInputType<RegistryCommunication>
{
  protected override void Configure(ISortInputTypeDescriptor<RegistryCommunication> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.Field(group => group.Anomalies.Any()).Name("hasAnomalies");
  }
}

