using HotChocolate.Data.Filters;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Fclt.Queries.Filters;

public class CalendarTicketOutputFilterType : FilterInputType<CalendarTicketOutput>
{
  protected override void Configure(IFilterInputTypeDescriptor<CalendarTicketOutput> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.BindExtensionStringField<CalendarTicketOutput, Subject>(
      "supplierSubjectName",
      query => subject => subject.Name!.Contains(query),
      subjectIds => ticketOutput => subjectIds.Contains(ticketOutput.SupplierSubjectId));
  }
}
