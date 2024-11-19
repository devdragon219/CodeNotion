using HotChocolate.Data.Filters;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Web.Anag.Queries.Filters;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Asst.Queries.Filters;

public class EstateUnitFilterType : FilterInputType<EstateUnit>
{
  protected override void Configure(IFilterInputTypeDescriptor<EstateUnit> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.Field(eu => eu.Stair).Type<StairFilterType>();
    descriptor.Field(eu => eu.Address).Type<AddressFilterType>();

    descriptor
      .Field(estateUnit => estateUnit.Surfaces
        .Where(surface => surface.Metric == SurfaceMeasurementMetric.SquareMetreNetNormal)
        .Sum(surface => surface.SurfaceSqMTotal))
      .Name("netSurface");
    
    descriptor
      .Field(estateUnit => estateUnit.Surfaces
        .Where(surface => surface.Metric == SurfaceMeasurementMetric.SquareMetreGrossNormal)
        .Sum(surface => surface.SurfaceSqMTotal))
      .Name("grossSurface");

    descriptor
      .Field(estateUnit => estateUnit.CadastralUnits
        .OrderByDescending(cadastralUnit => cadastralUnit.Since)
        .FirstOrDefault())
      .Type<CadastralUnitFilterType>()
      .Name("currentCadastralUnit");

    descriptor
      .BindExtensionStringField<EstateUnit, Subject>("managementSubjectName",
          str => subject => subject.Name!.Contains(str),
          idArray => eu => idArray.Contains(eu.ManagementSubjectId)
        );
  }
}
