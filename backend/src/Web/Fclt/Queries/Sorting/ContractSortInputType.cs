using HotChocolate.Data.Sorting;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Fclt.Queries.Sorting;

[GraphQLName($"{nameof(Fclt)}{nameof(ContractSortInputType)}")]
public class ContractSortInputType : SortInputType<Contract>
{
  protected override void Configure(ISortInputTypeDescriptor<Contract> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.BindExtensionStringField<Contract, Subject>(
      "providerSubjectName",
      subject => subject.Name!,
      subjectsPerId => contract => subjectsPerId[contract.ProviderSubjectId]);
  }
}
