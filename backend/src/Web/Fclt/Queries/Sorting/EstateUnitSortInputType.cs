using HotChocolate.Data.Sorting;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Fclt.EstateUnitGroupAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Fclt.Queries.Sorting;

public class EstateUnitGroupSortInputType : SortInputType<EstateUnitGroup>
{
  protected override void Configure(ISortInputTypeDescriptor<EstateUnitGroup> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.BindExtensionStringField<EstateUnitGroup, Subject>(
      "managementSubjectName",
      subject => subject.Name!,
      subjectsPerId => estateUnitGroup => subjectsPerId[estateUnitGroup.ManagementSubjectId]);
  }
}
