using HotChocolate.Data.Sorting;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Asst.EstateSubUnitAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Asst.Queries.Sorting;

public class EstateSubUnitSortInputType : SortInputType<EstateSubUnit>
{
  protected override void Configure(ISortInputTypeDescriptor<EstateSubUnit> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor
      .BindExtensionStringField<EstateSubUnit, OrgUnit>("orgUnitName",
          subject => subject.Name!,
          idDict => esu => esu.OrgUnitId.HasValue ? idDict[esu.OrgUnitId!.Value] : idDict[int.MaxValue]
        );

    descriptor
      .BindExtensionStringField<EstateSubUnit, Subject>("occupantSubjectName",
          subject => subject.Name!,
          idDict => esu => esu.OccupantId.HasValue ? idDict[esu.OccupantId!.Value] : idDict[int.MaxValue]
        );
  }
}
