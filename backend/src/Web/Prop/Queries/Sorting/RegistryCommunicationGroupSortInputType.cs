using HotChocolate.Data.Sorting;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Prop.Queries.Sorting;

public class RegistryCommunicationGroupSortInputType : SortInputType<RegistryCommunicationGroup>
{
  protected override void Configure(ISortInputTypeDescriptor<RegistryCommunicationGroup> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.Field(group => group.AnomaliesCount > 0).Name("hasAnomalies");

    descriptor.BindExtensionStringField<RegistryCommunicationGroup, Subject>(
      "managementSubjectName",
      subject => subject.Name!,
      ids => group => ids[group.Id.ManagementSubjectId]);

    descriptor.BindExtensionStringField<RegistryCommunicationGroup, Subject>(
      "requestingSubjectLegalRepresentativeName",
      subject => subject.Name!,
      ids => group => group.Id.RequestingSubjectLegalRepresentativeId.HasValue
        ? ids[group.Id.RequestingSubjectLegalRepresentativeId.Value]
        : int.MinValue);

    descriptor
      .Field("debtBankAccountReferenceCode")
      .Type<DefaultSortEnumType>()
      .RequiresMaterialization()
      .Extend()
      .OnBeforeCreate((context, definition) =>
      {
        definition.Handler = new RegistryCommunicationGroupDebtBankAccountReferenceCodeSortHandler(context.Services);
      });
  }
}
