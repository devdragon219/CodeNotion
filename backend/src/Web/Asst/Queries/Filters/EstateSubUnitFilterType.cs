using HotChocolate.Data.Filters;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Asst.EstateSubUnitAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Asst.Queries.Filters;

public class EstateSubUnitFilterType : FilterInputType<EstateSubUnit>
{
  protected override void Configure(IFilterInputTypeDescriptor<EstateSubUnit> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor
      .BindExtensionStringField<EstateSubUnit, OrgUnit>("orgUnitName",
          str => subject => subject.Name!.Contains(str),
          idArray => eu => eu.OrgUnitId.HasValue && idArray.Contains(eu.OrgUnitId!.Value)
        );

    descriptor
      .BindExtensionStringField<EstateSubUnit, Subject>("occupantSubjectName",
          str => subject => subject.Name!.Contains(str),
          idArray => eu => eu.OccupantId.HasValue && idArray.Contains(eu.OccupantId!.Value)
        );
  }
}
