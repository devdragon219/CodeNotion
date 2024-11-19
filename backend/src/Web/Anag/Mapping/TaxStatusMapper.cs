using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Web.Anag.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Anag.Mapping;

public class TaxStatusMapper : IMapper<TaxStatusInput, TaxStatus>
{
  public Task<TaxStatus?> MapAsync(TaxStatusInput? from, TaxStatus? into, CancellationToken cancellationToken = default)
    => Task.FromResult(Map(from, into));

  private static TaxStatus? Map(TaxStatusInput? from, TaxStatus? into)
  {
    if (from is null)
    {
      return null;
    }

    var taxStatus = into ?? new TaxStatus();
    
    taxStatus.SetType(from.TaxStatusType);

    if (into is null && from.Id.GetValueOrDefault() != default)
    {
      taxStatus.Id = from.Id!.Value;
    }

    taxStatus.SetValidityDates(from.Since, from.Until);

    return taxStatus;
  }
}
