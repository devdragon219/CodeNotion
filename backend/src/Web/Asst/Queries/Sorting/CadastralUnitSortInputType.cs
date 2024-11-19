using HotChocolate.Data.Sorting;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Web.Anag.Queries.Sorting;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Asst.Queries.Sorting;

public class CadastralUnitSortInputType : SortInputType<CadastralUnit>
{
  protected override void Configure(ISortInputTypeDescriptor<CadastralUnit> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.Field(cadastralUnit => cadastralUnit.Address).Type<AddressSortInputType>();

    descriptor.Ignore(cu => cu.TaxConfig);

    descriptor
      .BindExtensionStringField<CadastralUnit, Core.Anag.SubjectAggregate.Subject>("managementSubjectName",
          subject => subject.Name!,
          idDict => cu => idDict[cu.EstateUnit!.ManagementSubjectId]
        );
  }
}
