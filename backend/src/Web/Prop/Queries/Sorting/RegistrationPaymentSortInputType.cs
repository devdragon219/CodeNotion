using HotChocolate.Data.Sorting;
using RealGimm.Core.Prop.RegistrationPaymentAggregate;

namespace RealGimm.Web.Prop.Queries.Sorting;

public class RegistrationPaymentSortInputType : SortInputType<RegistrationPayment>
{
  protected override void Configure(ISortInputTypeDescriptor<RegistrationPayment> descriptor)
  {
    descriptor.BindFieldsImplicitly();
    descriptor.Field(e => e.Contract).Type<ContractSortInputType>();
  }
}