using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Prop.BillAggregate;
using RealGimm.WebCommons.Extensions;
using RealGimm.Core;

namespace RealGimm.Web.Prop.Mapping;

public sealed class BillMapper : IMapper<BillInput, Bill>
{
  private readonly IMapper _mapper;

  public BillMapper(IMapper mapper)
  {
    _mapper = mapper;
  }

  public async Task<Bill?> MapAsync(BillInput? from, Bill? into, CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    if (into is null)
    {
      throw new NotSupportedException();
    }

    into.SetYear(from.Year);
    into.SetIsOccupiedWithoutRight(from.IsOccupiedWithoutRight);
    into.SetIsInvoiced(from.IsInvoiced);
    into.SetTransactorPaymentType(from.TransactorPaymentType);
    into.SetContractBillingPeriod(from.ContractBillingPeriod);
    into.SetTotalAmount(from.TotalAmount);
    into.SetEmissionType(from.EmissionType);

    if (into.Contract is not null
      && !into.Contract.Transactors.Select(transactor => transactor.SubjectId).Contains(from.TransactorSubjectId))
    {
      throw new MappingException(ErrorCode.BillInvalidTransactorSubject.ToValidationError());  
    }

    into.SetTransactorSubjectId(from.TransactorSubjectId);

    if (into.Contract is not null
      && !into.Contract.Counterparts.Select(counterpart => counterpart.SubjectId).Contains(from.MainCounterpartSubjectId))
    {
      throw new MappingException(ErrorCode.BillInvalidCounterpartSubject.ToValidationError());
    }

    into.SetMainCounterpartSubjectId(from.MainCounterpartSubjectId);

    await _mapper.UpdateCollectionAsync(from.BillRows, into.BillRows, cancellationToken);

    return into;
  }
}
