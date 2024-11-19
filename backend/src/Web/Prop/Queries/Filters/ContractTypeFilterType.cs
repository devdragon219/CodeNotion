using HotChocolate.Data.Filters;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Prop.Queries.Filters;

public class ContractTypeFilterType : FilterInputType<ContractType>
{
  protected override void Configure(IFilterInputTypeDescriptor<ContractType> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.BindExtensionStringField<ContractType, EstateUsageType>(
      "usageTypeName",
      query => usageType => usageType.Name!.Contains(query),
      usageTypeIds => contractType => usageTypeIds.Contains(contractType.UsageTypeId));
  }
}
