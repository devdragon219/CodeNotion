using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class OneOfTicketConditionMapper : IMapper<OneOfTicketConditionInput, TicketConditionInput>
{
  public TicketConditionInput? Map(OneOfTicketConditionInput? from, TicketConditionInput? into)
  {
    if (from is null)
    {
      return null;
    }

    if (into is not null)
    {
      throw new NotSupportedException();
    }

    if (from.Complex is not null)
    {
      return from.Complex;
    }

    if (from.TicketTypeEquality is not null)
    {
      return from.TicketTypeEquality;
    }

    if (from.MasterStatus is not null)
    {
      return from.MasterStatus;
    }

    if (from.CatalogueCategoryEquality is not null)
    {
      return from.CatalogueCategoryEquality;
    }

    if (from.CatalogueSubCategoryEquality is not null)
    {
      return from.CatalogueSubCategoryEquality;
    }

    if (from.CatalogueTypeEquality is not null)
    {
      return from.CatalogueTypeEquality;
    }

    if (from.PriorityEquality is not null)
    {
      return from.PriorityEquality;
    }

    throw new NotImplementedException();
  }

  Task<TicketConditionInput?> IMapper<OneOfTicketConditionInput, TicketConditionInput>.MapAsync(
    OneOfTicketConditionInput? from,
    TicketConditionInput? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
