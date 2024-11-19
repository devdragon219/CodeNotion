using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Econ.TaxCreditAggregate;
using RealGimm.Web.Econ.Models;

namespace RealGimm.Web.Econ.Mapping;

public sealed class OperationMapper : IMapper<OperationInput, Operation>
{
  public Operation? Map(OperationInput? from, Operation? into)
  {
    if (from is null)
    {
      return null;
    }

    var operation = into ?? new Operation();
    operation.SetAmount(from.Amount);
    operation.SetDate(from.Date);
    operation.SetNotes(from.Notes);

    return operation;
  }

  Task<Operation?> IMapper<OperationInput, Operation>.MapAsync(
    OperationInput? from,
    Operation? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
