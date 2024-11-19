
using RealGimm.Core;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.RegistrationPaymentAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Prop.Mapping;

public class RegistrationPaymentMapper : MapperBase, IMapper<RegistrationPaymentInput, RegistrationPayment>
{
  private readonly IMapper _mapper;
  private readonly IRepository<Contract> _contractRepository;

  public RegistrationPaymentMapper(IMapper mapper, IRepository<Contract> contractRepository)
  {
    _mapper = mapper;
    _contractRepository = contractRepository;
  }

  public async Task<RegistrationPayment?> MapAsync(
    RegistrationPaymentInput? from,
    RegistrationPayment? into,
    CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    var contract = await _contractRepository.SingleOrDefaultAsync(new GetByIdSpec<Contract>(from.ContractId), cancellationToken);
    ArgumentNullException.ThrowIfNull(contract, "Invalid contract id");

    var registrationPayment = into ?? new RegistrationPayment();

    registrationPayment.SetContract(contract);
    registrationPayment.SetPaymentYear(from.PaymentYear);
    registrationPayment.SetPaymentCode(from.PaymentCode);
    registrationPayment.SetValueDate(from.ValueDate);
    registrationPayment.SetTaxAmount(from.TaxAmount);
    registrationPayment.SetSanctionAmount(from.SanctionAmount);
    registrationPayment.SetTotalAmount(from.TotalAmount);

    await _mapper.UpdateCollectionAsync(from.Rows, registrationPayment.Rows, cancellationToken);
    
    return registrationPayment;
  }
}