using HotChocolate.Data.Filters;
using HotChocolate.Data.Sorting;
using HotChocolate.Types.Descriptors.Definitions;
using RealGimm.SharedKernel;

namespace RealGimm.WebCommons.Extensions;

public static class DescriptorExtensionExtensions
{
  private static void RequiresMaterialization<TDescriptor>(this TDescriptor descriptor)
     where TDescriptor : IDescriptor<DefinitionBase>
  {
    descriptor
      .Extend()
      .OnBeforeCreate((_, definition) =>
      {
        definition.ContextData.Add(Constants.FIELD_REQUIRES_MATERIALIZATION, true);
      });
  }

  public static ISortFieldDescriptor RequiresMaterialization(this ISortFieldDescriptor descriptor)
  {
    descriptor.RequiresMaterialization<ISortFieldDescriptor>();

    return descriptor;
  }

  public static IFilterFieldDescriptor RequiresMaterialization(this IFilterFieldDescriptor descriptor)
  {
    descriptor.RequiresMaterialization<IFilterFieldDescriptor>();

    return descriptor;
  }
}
