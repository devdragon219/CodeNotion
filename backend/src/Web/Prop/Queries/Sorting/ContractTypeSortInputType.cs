using HotChocolate.Data.Sorting;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Prop.Queries.Sorting;

public class ContractTypeSortInputType : SortInputType<ContractType>
{
  protected override void Configure(ISortInputTypeDescriptor<ContractType> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.BindExtensionStringField<ContractType, EstateUsageType>(
      "usageTypeName",
      usageType => usageType.Name!,
      usageTypesPerId => contractType => usageTypesPerId[contractType.UsageTypeId]);
  }
}
