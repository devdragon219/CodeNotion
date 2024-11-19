using HotChocolate.Data.Filters;

namespace RealGimm.WebCommons.Filtering;

public class CustomStringFilterInput : StringOperationFilterInputType
{
  protected override void Configure(IFilterInputTypeDescriptor descriptor)
  {
    base.Configure(descriptor);

    descriptor.Operation(DefaultFilterOperations.EndsWith).Ignore();
    descriptor.Operation(DefaultFilterOperations.NotEndsWith).Ignore();
    descriptor.Operation(DefaultFilterOperations.NotStartsWith).Ignore();
    descriptor.Operation(DefaultFilterOperations.NotEquals).Ignore();
    descriptor.Operation(DefaultFilterOperations.In).Ignore();
    descriptor.Operation(DefaultFilterOperations.NotIn).Ignore();
  }
}