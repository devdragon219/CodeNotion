using HotChocolate.Data.Filters;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Fclt.Queries.Filters;

public class TicketChecklistTemplateFilterType : FilterInputType<TicketChecklistTemplate>
{
  protected override void Configure(IFilterInputTypeDescriptor<TicketChecklistTemplate> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.BindExtensionStringField<TicketChecklistTemplate, CatalogueType>(
      "catalogueType",
      query => catalogueType => catalogueType.Name!.Contains(query),
      typeIds => template => typeIds.Contains(template.CatalogueTypeId));

    descriptor.BindExtensionStringField<TicketChecklistTemplate, CatalogueType>(
      "catalogueCategory",
      query => catalogueType => catalogueType.Category.Name!.Contains(query),
      typeIds => template => typeIds.Contains(template.CatalogueTypeId));

    descriptor.BindExtensionStringField<TicketChecklistTemplate, CatalogueType>(
      "catalogueSubCategory",
      query => catalogueType => catalogueType.SubCategory!.Name!.Contains(query),
      typeIds => template => typeIds.Contains(template.CatalogueTypeId));
  }
}
