using HotChocolate.Data.Filters;
using RealGimm.Core.Prop.RegistrationPaymentAggregate;

namespace RealGimm.Web.Prop.Queries.Filters;

public class RegistrationPaymentFilterType : FilterInputType<RegistrationPayment>
{
  protected override void Configure(IFilterInputTypeDescriptor<RegistrationPayment> descriptor)
  {
    descriptor.BindFieldsImplicitly();
    descriptor.Field(e => e.Contract).Type<ContractFilterType>();
  }

}