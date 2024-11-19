using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class QuoteMapper : IMapper<QuoteInput, Quote>
{
  private readonly IMapper _mapper;

  public QuoteMapper(IMapper mapper)
  {
    _mapper = mapper;
  }

  public async Task<Quote?> MapAsync(QuoteInput? from, Quote? into, CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    var quote = into ?? new Quote();
    quote.SetMasterStatus(from.MasterStatus);
    quote.SetExternalCode(from.ExternalCode);
    quote.SetIsFrameworkAgreement(from.IsFrameworkAgreement);
    quote.SetClassifications(from.Classifications);
    quote.SetInterventionDueDate(from.InterventionDueDate);
    quote.SetOrderNumber(from.OrderNumber);
    quote.SetNotes(from.Notes);

    await _mapper.UpdateCollectionAsync(from.Articles, quote.Articles, cancellationToken);

    return quote;
  }
}
