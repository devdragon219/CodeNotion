using HotChocolate.Data.Sorting;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Fclt.Queries.Sorting;

public class TicketChecklistTemplateSortInputType : SortInputType<TicketChecklistTemplate>
{
  protected override void Configure(ISortInputTypeDescriptor<TicketChecklistTemplate> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.BindExtensionStringField<TicketChecklistTemplate, CatalogueType>(
      "catalogueType",
      catalogueType => catalogueType.Name!,
      catalogueTypesPerId => template => catalogueTypesPerId[template.CatalogueTypeId]);

    descriptor.BindExtensionStringField<TicketChecklistTemplate, CatalogueType>(
      "catalogueCategory",
      catalogueType => catalogueType.Name!,
      catalogueTypesPerId => template => catalogueTypesPerId[template.CatalogueTypeId]);

    descriptor.BindExtensionStringField<TicketChecklistTemplate, CatalogueType>(
      "catalogueSubCategory",
      catalogueType => catalogueType.SubCategory!.Name!,
      catalogueTypesPerId => template => catalogueTypesPerId[template.CatalogueTypeId]);
  }
}
