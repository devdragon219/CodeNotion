
using RealGimm.Core;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.RegistrationPaymentAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Prop.Mapping;

public class RegistrationPaymentRowMapper : MapperBase, IMapper<RegistrationPaymentRowInput, RegistrationPaymentRow>
{
  private readonly IMapper _mapper;

  public RegistrationPaymentRowMapper(IMapper mapper)
  {
    _mapper = mapper;
  }

  public RegistrationPaymentRow? Map(RegistrationPaymentRowInput? from, RegistrationPaymentRow? into)
  {
    if (from is null)
    {
      return null;
    }

    var registrationPaymentRow = into ?? new RegistrationPaymentRow();
    
    registrationPaymentRow.SetPaymentRowCode(from.PaymentRowCode);
    registrationPaymentRow.SetPaymentRowSection(from.PaymentRowSection);
    registrationPaymentRow.SetPaymentRowReceivingEntity(from.PaymentRowReceivingEntity);
    registrationPaymentRow.SetReferenceYear(from.ReferenceYear);
    registrationPaymentRow.SetReferencePeriod(from.ReferencePeriod);
    registrationPaymentRow.SetAmountDue(from.AmountDue);
    registrationPaymentRow.SetAmountCleared(from.AmountCleared);

    return registrationPaymentRow;

  }

  Task<RegistrationPaymentRow?> IMapper<RegistrationPaymentRowInput, RegistrationPaymentRow>.MapAsync(
    RegistrationPaymentRowInput? from,
    RegistrationPaymentRow? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));

}