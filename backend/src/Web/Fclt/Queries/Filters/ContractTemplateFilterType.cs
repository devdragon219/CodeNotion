using HotChocolate.Data.Filters;
using RealGimm.Core.Fclt.ContractTemplateAggregate;

namespace RealGimm.Web.Fclt.Queries.Filters;

public class ContractTemplateFilterType : FilterInputType<ContractTemplate>
{
  protected override void Configure(IFilterInputTypeDescriptor<ContractTemplate> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
