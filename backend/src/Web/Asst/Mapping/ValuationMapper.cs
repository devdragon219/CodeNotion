using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public class ValuationMapper : IMapper<EstateValuationInput, Valuation>
{
  public Task<Valuation?> MapAsync(EstateValuationInput? from, Valuation? into, CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return Task.FromResult<Valuation?>(null);
    }

    var valuation = into ?? new Valuation();
    valuation.SetReferenceYear(from.Year);

    valuation.SetRevampOperations(from.RevampOperations);
    valuation.SetTransferYear(from.TransferYear);
    valuation.SetValues(from.Ias, from.Rba, from.MortgageAmount);

    return Task.FromResult<Valuation?>(valuation);
  }
}
