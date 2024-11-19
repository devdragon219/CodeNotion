using HotChocolate.Data.Sorting;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Fclt.Queries.Sorting;

public class TicketSortInputType : SortInputType<Ticket>
{
  protected override void Configure(ISortInputTypeDescriptor<Ticket> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.BindExtensionStringField<Ticket, Subject>(
      "supplierSubjectName",
      subject => subject.Name!,
      subjectsPerId => ticket => subjectsPerId[ticket.SupplierSubjectId]);
  }
}
