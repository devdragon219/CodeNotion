using HotChocolate.Data.Sorting;
using RealGimm.Core.Fclt.ContractTypeAggregate;

namespace RealGimm.Web.Fclt.Queries.Sorting;

[GraphQLName($"{nameof(Fclt)}{nameof(ContractTypeSortInputType)}")]
public class ContractTypeSortInputType : SortInputType<ContractType>
{
  protected override void Configure(ISortInputTypeDescriptor<ContractType> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
