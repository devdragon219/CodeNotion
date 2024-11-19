using HotChocolate.Data.Filters;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Prop.Queries.Filters;

public class ContractFilterType : FilterInputType<Contract>
{
  protected override void Configure(IFilterInputTypeDescriptor<Contract> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor
      .Field(contract => contract.SublocatedContract != null)
      .Name("isSublocated");

    descriptor
      .Field("daysToExpiration")
      .Type<IntOperationFilterInputType>()
      .Extend()
      .OnBeforeCreate(definition => definition.Handler = new ContractDaysToExpirationFilterHandler());

    descriptor.BindExtensionStringField<Contract, Subject>(
      "counterpartName",
      query => subject => subject.Name!.Contains(query),
      ids => contract => ids.Contains(
        contract.Counterparts
          .Where(counterpart => counterpart.IsMainCounterpart)
          .Select(counterpart => counterpart.SubjectId)
          .SingleOrDefault()));

    descriptor.BindExtensionStringField<Contract, Subject>(
      "managementSubjectName",
      query => subject => subject.Name!.Contains(query),
      ids => contract => ids.Contains(contract.ManagementSubjectId));

    descriptor.BindExtensionStringField<Contract, Subject>(
      "landlordName",
      query => subject => subject.Name!.Contains(query),
      ids => contract => ids.Contains(contract.Type.IsActive
        ? contract.ManagementSubjectId
        : contract.Counterparts.Single(counterpart => counterpart.IsMainCounterpart).SubjectId));
    
    descriptor.BindExtensionStringField<Contract, Subject>(
      "tenantName",
      query => subject => subject.Name!.Contains(query),
      ids => contract => ids.Contains(contract.Type.IsActive
        ? contract.Counterparts.Single(counterpart => counterpart.IsMainCounterpart).SubjectId
        : contract.ManagementSubjectId));
    
    descriptor
      .Field("anyLocatedUnitInternalCodeContains")
      .Type<StringType>()
      .Extend()
      .OnBeforeCreate((context, definition) =>
        definition.Handler = new ContractAnyLocatedUnitInternalCodeContainsFilterHandler(context.Services));
  }
}
