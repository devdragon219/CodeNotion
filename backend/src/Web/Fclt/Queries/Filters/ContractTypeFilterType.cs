using HotChocolate.Data.Filters;
using RealGimm.Core.Fclt.ContractTypeAggregate;

namespace RealGimm.Web.Fclt.Queries.Filters;

[GraphQLName($"{nameof(Fclt)}{nameof(ContractFilterType)}")]
public class ContractTypeFilterType : FilterInputType<ContractType>
{
  protected override void Configure(IFilterInputTypeDescriptor<ContractType> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
