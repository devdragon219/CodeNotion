using HotChocolate.Data.Filters;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Fclt.EstateUnitGroupAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Fclt.Queries.Filters;

public class EstateUnitGroupFilterType : FilterInputType<EstateUnitGroup>
{
  protected override void Configure(IFilterInputTypeDescriptor<EstateUnitGroup> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.BindExtensionStringField<EstateUnitGroup, Subject>(
      "managementSubjectName",
      query => subject => subject.Name!.Contains(query),
      subjectIds => estateUnitGroups => subjectIds.Contains(estateUnitGroups.ManagementSubjectId));
  }
}
