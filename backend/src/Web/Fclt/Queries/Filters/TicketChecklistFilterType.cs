using HotChocolate.Data.Filters;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Fclt.TicketChecklistAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Fclt.Queries.Filters;

public class TicketChecklistFilterType : FilterInputType<TicketChecklist>
{
  protected override void Configure(IFilterInputTypeDescriptor<TicketChecklist> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.BindExtensionStringField<TicketChecklist, CatalogueType>(
      "catalogueType",
      query => catalogueType => catalogueType.Name!.Contains(query),
      typeIds => checklist => typeIds.Contains(checklist.CatalogueTypeId));

    descriptor.BindExtensionStringField<TicketChecklist, CatalogueType>(
      "catalogueCategory",
      query => catalogueType => catalogueType.Category.Name!.Contains(query),
      typeIds => checklist => typeIds.Contains(checklist.CatalogueTypeId));

    descriptor.BindExtensionStringField<TicketChecklist, CatalogueType>(
      "catalogueSubCategory",
      query => catalogueType => catalogueType.SubCategory!.Name!.Contains(query),
      typeIds => checklist => typeIds.Contains(checklist.CatalogueTypeId));

    descriptor.BindExtensionStringField<TicketChecklist, EstateUnit>(
      "estateUnitInternalCode",
      query => estateUnit => estateUnit.InternalCode.Contains(query),
      typeIds => checklist => typeIds.Contains(checklist.EstateUnitId));
  }
}
