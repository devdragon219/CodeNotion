using HotChocolate.Data.Filters;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Prop.Queries.Filters;

public class RegistryCommunicationFilterType : FilterInputType<RegistryCommunication>
{
  protected override void Configure(IFilterInputTypeDescriptor<RegistryCommunication> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.Field(group => group.Anomalies.Any()).Name("hasAnomalies");

    descriptor.BindExtensionStringField<RegistryCommunication, EstateUnit>(
      "anyEstateUnitInternalCode",
      query => estateUnit => estateUnit.InternalCode.Contains(query),
      ids => communication => communication.EstatesUnits.Any(commEstateUnit => ids.Contains(commEstateUnit.EstateUnitId)));
  }
}
