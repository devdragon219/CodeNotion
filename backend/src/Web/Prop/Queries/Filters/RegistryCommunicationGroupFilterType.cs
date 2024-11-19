using HotChocolate.Data.Filters;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateSubUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons.Filtering;

namespace RealGimm.Web.Prop.Queries.Filters;

public class RegistryCommunicationGroupFilterType : FilterInputType<RegistryCommunicationGroup>
{
  protected override void Configure(IFilterInputTypeDescriptor<RegistryCommunicationGroup> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.Field(group => group.AnomaliesCount > 0).Name("hasAnomalies");

    descriptor.BindExtensionStringField<RegistryCommunicationGroup, Subject>(
      "managementSubjectName",
      query => subject => subject.Name!.Contains(query),
      ids => group => ids.Contains(group.Id.ManagementSubjectId));

    descriptor.BindExtensionStringField<RegistryCommunicationGroup, Subject>(
      "requestingSubjectLegalRepresentativeName",
      query => subject => subject.Name!.Contains(query),
      ids => group =>
        group.Id.RequestingSubjectLegalRepresentativeId.HasValue &&
        ids.Contains(group.Id.RequestingSubjectLegalRepresentativeId.Value));

    descriptor
      .Field("debtBankAccountReferenceCode")
      .Type<CustomStringFilterInput>()
      .Extend()
      .OnBeforeCreate((context, definition) =>
      {
        definition.Handler = new RegistryCommunicationDebtGroupBankAccountReferenceCodeFilterHandler(context.Services);
      });
  }
}
