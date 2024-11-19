using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.WebCommons.Extensions;
using RealGimm.Core.Fclt.SLAAggregate;

namespace RealGimm.Web.Fclt.Mapping;

public class ComplexTicketConditionMapper : IMapper<ComplexTicketConditionInput, ComplexTicketCondition>
{
  private readonly IMapper _mapper;

  public ComplexTicketConditionMapper(IMapper mapper)
  {
    _mapper = mapper;
  }

  public async Task<ComplexTicketCondition?> MapAsync(
    ComplexTicketConditionInput? from,
    ComplexTicketCondition? into = null,
    CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var condition = into ?? new ComplexTicketCondition() { Id = from.Id.GetValueOrDefault() };
    condition.SetOperator(from.Operator);

    var flatInternalConditionsInputs = await _mapper.MapAsync<OneOfTicketConditionInput, TicketConditionInput>(
      from.InternalConditions,
      cancellationToken);

    await _mapper.UpdateCollectionAsync(
      (IEnumerable<TicketConditionInput>)flatInternalConditionsInputs!,
      condition.InternalConditions,
      cancellationToken);

    return condition;
  }
}
