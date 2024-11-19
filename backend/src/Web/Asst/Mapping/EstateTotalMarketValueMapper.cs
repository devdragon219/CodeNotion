using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateAggregate.Specifications;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public class EstateTotalMarketValueMapper : MapperBase, IMapper<EstateTotalMarketValueInput, EstateTotalMarketValue>
{
  private readonly IMapper _mapper;

  public EstateTotalMarketValueMapper(IMapper mapper)
  {
    _mapper = mapper;
  }

  public async Task<EstateTotalMarketValue?> MapAsync(EstateTotalMarketValueInput? from, EstateTotalMarketValue? into, CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var totalMarketValue = into ?? new EstateTotalMarketValue();
    totalMarketValue.SetNotes(from.Notes);
    totalMarketValue.SetArea(from.TotalSurfaceAreaSqM);

    await UpdateCollectionAsync(
      from.Coefficients,
      _mapper,
      () => totalMarketValue.Coefficients,
      totalMarketValue.AddCoefficient,
      totalMarketValue.RemoveCoefficient,
      cancellationToken
    );

    await UpdateCollectionAsync(
      from.MarketValues,
      _mapper,
      () => totalMarketValue.MarketValues,
      totalMarketValue.AddMarketValue,
      totalMarketValue.RemoveMarketValue,
      cancellationToken
    );

    return totalMarketValue;
  }
}
