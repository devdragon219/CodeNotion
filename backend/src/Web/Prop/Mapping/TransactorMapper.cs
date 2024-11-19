using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Prop.Mapping;

public sealed class TransactorMapper : IMapper<TransactorInput, Transactor>
{
  public Transactor? Map(TransactorInput? from, Transactor? into)
  {
    if (from is null)
    {
      return null;
    }

    var transactor = into ?? new Transactor();
    transactor.SetSubjectId(from.SubjectId);
    transactor.SetAddressId(from.AddressId);
    transactor.SetInvoiceAddressId(from.InvoiceAddressId);
    transactor.SetTransactionSharePercent(from.TransactionSharePercent);
    transactor.SetIsInvoiced(from.IsInvoiced);
    transactor.SetSince(from.Since);
    transactor.SetUntil(from.Until);
    transactor.SetPaymentType(from.Type);

    if (into is null && from.Id.GetValueOrDefault() != default)
    {
      transactor.Id = from.Id!.Value;
    }

    return transactor;
  }

  Task<Transactor?> IMapper<TransactorInput, Transactor>.MapAsync(
    TransactorInput? from,
    Transactor? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
