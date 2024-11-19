using HotChocolate.Data.Sorting;
using RealGimm.Core.Fclt.ContractTemplateAggregate;

namespace RealGimm.Web.Fclt.Queries.Sorting;

public class ContractTemplateSortInputType : SortInputType<ContractTemplate>
{
  protected override void Configure(ISortInputTypeDescriptor<ContractTemplate> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
