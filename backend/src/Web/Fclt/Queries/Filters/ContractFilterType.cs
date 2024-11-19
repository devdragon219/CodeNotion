using HotChocolate.Data.Filters;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Fclt.Queries.Filters;

[GraphQLName($"{nameof(Fclt)}{nameof(ContractFilterType)}")]
public class ContractFilterType : FilterInputType<Contract>
{
  protected override void Configure(IFilterInputTypeDescriptor<Contract> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.BindExtensionStringField<Contract, Subject>(
      "providerSubjectName",
      query => subject => subject.Name!.Contains(query),
      subjectIds => contract => subjectIds.Contains(contract.ProviderSubjectId));
  }
}
