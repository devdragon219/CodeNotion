using HotChocolate.Data.Sorting;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Prop.Queries.Sorting;

public class ContractSortInputType : SortInputType<Contract>
{
  protected override void Configure(ISortInputTypeDescriptor<Contract> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor
      .Field(contract => contract.SublocatedContract != null)
      .Name("isSublocated");

    descriptor
      .Field(contract => contract.SecondTermExpirationDate.HasValue
        ? contract.SecondTermExpirationDate
        : null)
      .Name("daysToExpiration");

    descriptor.BindExtensionStringField<Contract, Subject>(
      "counterpartName",
      subject => subject.Name!,
      ids => contract => ids[
        contract.Counterparts
          .Where(counterpart => counterpart.IsMainCounterpart)
          .Select(counterpart => counterpart.SubjectId)
          .SingleOrDefault()]);

    descriptor.BindExtensionStringField<Contract, Subject>(
      "managementSubjectName",
      subject => subject.Name!,
      ids => contract => ids[contract.ManagementSubjectId]);

    descriptor.BindExtensionStringField<Contract, Subject>(
      "landlordName",
      subject => subject.Name!,
      ids => contract => ids[contract.Type.IsActive
        ? contract.ManagementSubjectId
        : contract.Counterparts.Single(counterpart => counterpart.IsMainCounterpart).SubjectId]);
    
    descriptor.BindExtensionStringField<Contract, Subject>(
      "tenantName",
      subject => subject.Name!,
      ids => contract => ids[contract.Type.IsActive
        ? contract.Counterparts.Single(counterpart => counterpart.IsMainCounterpart).SubjectId
        : contract.ManagementSubjectId]);
  }
}
