using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Fclt.Mapping;

public class PenaltyMapper : IMapper<PenaltyInput, Penalty>
{
  private readonly IMapper _mapper;

  public PenaltyMapper(IMapper mapper)
  {
    _mapper = mapper;
  }

  public async Task<Penalty?> MapAsync(PenaltyInput? from, Penalty? into = null, CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var penalty = into ?? new Penalty() { Id = from.Id.GetValueOrDefault() };
    penalty.SetDescription(from.Description);
    penalty.SetInternalCode(from.InternalCode);
    penalty.SetIfCondition((await _mapper.MapAsync(from.IfCondition, penalty.IfCondition, cancellationToken))!);
    penalty.SetThenOperator(from.ThenOperator);
    await _mapper.UpdateCollectionAsync(from.ThenPenalties, penalty.ThenPenalties, cancellationToken);

    return penalty;
  }
}
