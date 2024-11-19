using HotChocolate.Data.Filters;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.WebCommons.Filtering;

namespace RealGimm.Web.Asst.Queries.Filters;

public class CatalogueOutputFilterType : FilterInputType<CatalogueOutput>
{
  protected override void Configure(IFilterInputTypeDescriptor<CatalogueOutput> descriptor)
  {
    descriptor.Field(c => c.CatalogueTypeCount);

    ConfigureField(descriptor, nameof(CatalogueOutput.CatalogueCategory));
    ConfigureField(descriptor, nameof(CatalogueOutput.CatalogueSubCategory));
    ConfigureField(descriptor, nameof(CatalogueOutput.CatalogueType));
    ConfigureField(descriptor, nameof(CatalogueOutput.EstateInternalCode));
  }

  private static void ConfigureField(IFilterInputTypeDescriptor<CatalogueOutput> descriptor,
    string name)
  {
    descriptor
      .Field(name)
      .Type<CustomStringFilterInput>()
      .Extend()
      .OnBeforeCreate((c, def) =>
      {
        def.Handler = new QueryableStringInvariantContainsHandler(
          c.InputParser
        );
      });
  }
}
