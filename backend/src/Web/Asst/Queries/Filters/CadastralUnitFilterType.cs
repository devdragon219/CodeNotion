using HotChocolate.Data.Filters;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Web.Anag.Queries.Filters;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Asst.Queries.Filters;

public class CadastralUnitFilterType : FilterInputType<CadastralUnit>
{
  protected override void Configure(IFilterInputTypeDescriptor<CadastralUnit> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.Field(cadastralUnit => cadastralUnit.Address).Type<AddressFilterType>();
    descriptor.Field(cadastralUnit => cadastralUnit.Income).Type<CadastralUnitIncomeFilterType>();
    descriptor.Field(cadastralUnit => cadastralUnit.Coordinates).Type<ListFilterInputType<CadastralCoordinatesFilterType>>();

    descriptor.Ignore(cu => cu.TaxConfig);

    descriptor
      .BindExtensionStringField<CadastralUnit, Subject>("managementSubjectName",
          str => subject => subject.Name!.Contains(str),
          idArray => e => idArray.Contains(e.EstateUnit!.ManagementSubjectId)
        );
  }
}
