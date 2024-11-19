using HotChocolate.Data.Sorting;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Web.Anag.Queries.Sorting;
using RealGimm.Web.Asst.Queries.Filters;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Asst.Queries.Sorting;

public class EstateUnitSortInputType: SortInputType<EstateUnit>
{
  protected override void Configure(ISortInputTypeDescriptor<EstateUnit> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.Field(f => f.Address).Type<AddressSortInputType>();

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
      .Type<CadastralUnitSortInputType>()
      .Name("currentCadastralUnit");

    descriptor
      .BindExtensionStringField<EstateUnit, Subject>("managementSubjectName",
          subject => subject.Name!,
          idDict => eu => idDict[eu.ManagementSubjectId]
        );
  }
}
