using HotChocolate.Data.Filters;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Fclt.Queries.Filters;

public class TicketFilterType : FilterInputType<Ticket>
{
  protected override void Configure(IFilterInputTypeDescriptor<Ticket> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.BindExtensionStringField<Ticket, Subject>(
      "supplierSubjectName",
      query => subject => subject.Name!.Contains(query),
      subjectIds => ticket => subjectIds.Contains(ticket.SupplierSubjectId));

    descriptor.BindExtensionStringField<Ticket, EstateUnit>(
      "locationEstateUnitInternalCode",
      query => estateUnit => estateUnit.InternalCode.Contains(query),
      estateIds => ticket => estateIds.Contains(ticket.LocationEstateUnitId));

    descriptor
      .Field(ticket => ticket.RequestDateTime.Year)
      .Name("requestYear");

    descriptor
      .Field(ticket => ticket.PerformedActivities.Any(activity => activity.IsMandatoryByLaw))
      .Name("isMandatoryByLaw");
  }
}
