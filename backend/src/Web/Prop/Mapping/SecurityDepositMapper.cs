using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.Web.Prop.Mapping;

public sealed class SecurityDepositMapper : IMapper<SecurityDepositInput, SecurityDeposit>
{
  private readonly IMapper _mapper;

  public SecurityDepositMapper(IMapper mapper)
  {
    _mapper = mapper;
  }

  public Task<SecurityDeposit?> MapAsync(SecurityDepositInput? from, SecurityDeposit? into, CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return Task.FromResult<SecurityDeposit?>(null);
    }

    var securityDeposit = into ?? new SecurityDeposit();
    securityDeposit.SetSubjectId(from.SubjectId);
    securityDeposit.SetType(from.Type);
    securityDeposit.SetSince(from.Since);
    securityDeposit.SetUntil(from.Until);
    securityDeposit.SetBaseAmount(from.BaseAmount);
    securityDeposit.SetCashData(from.IsInterestCalculated, from.InterestCalculationStartDate, from.TakeoverDate);
    securityDeposit.SetSuretyData(from.IsSuretyRenewable, from.SuretySubjectId);
    securityDeposit.SetBankingAccountId(from.BankAccountId);
    securityDeposit.SetNotes(from.Notes);

    if (into is null && from.Id.GetValueOrDefault() != default)
    {
      securityDeposit.Id = from.Id!.Value;
    }

    return Task.FromResult<SecurityDeposit?>(securityDeposit);
  }
}
