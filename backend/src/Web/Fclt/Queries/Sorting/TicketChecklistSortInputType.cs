using HotChocolate.Data.Sorting;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Fclt.TicketChecklistAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Fclt.Queries.Sorting;

public class TicketChecklistSortInputType : SortInputType<TicketChecklist>
{
  protected override void Configure(ISortInputTypeDescriptor<TicketChecklist> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.BindExtensionStringField<TicketChecklist, CatalogueType>(
      "catalogueType",
      catalogueType => catalogueType.Name!,
      catalogueTypesPerId => checklist => catalogueTypesPerId[checklist.CatalogueTypeId]);

    descriptor.BindExtensionStringField<TicketChecklist, CatalogueType>(
      "catalogueCategory",
      catalogueType => catalogueType.Name!,
      catalogueTypesPerId => checklist => catalogueTypesPerId[checklist.CatalogueTypeId]);

    descriptor.BindExtensionStringField<TicketChecklist, CatalogueType>(
      "catalogueSubCategory",
      catalogueType => catalogueType.SubCategory!.Name!,
      catalogueTypesPerId => checklist => catalogueTypesPerId[checklist.CatalogueTypeId]);

    descriptor.BindExtensionStringField<TicketChecklist, EstateUnit>(
      "estateUnitInternalCode",
      estateUnit => estateUnit.InternalCode,
      esateUnitsPerId => checklist => esateUnitsPerId[checklist.EstateUnitId]);
  }
}
