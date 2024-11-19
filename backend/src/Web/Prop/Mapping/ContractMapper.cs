using RealGimm.Core;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.WebCommons.Extensions;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.Web.Prop.Mapping;

public sealed class ContractMapper : IMapper<ContractInput, Contract>
{
  private readonly IReadRepository<Contract> _contractRepository;
  private readonly IReadRepository<ContractType> _contractTypeRepository;
  private readonly IReadRepository<BillItemType> _billItemTypeRepository;
  private readonly IMapper _mapper;

  public ContractMapper(
    IReadRepository<Contract> contractRepository,
    IReadRepository<ContractType> contractTypeRepository,
    IReadRepository<BillItemType> billItemTypeRepository,
    IMapper mapper)
  {
    _contractRepository = contractRepository;
    _contractTypeRepository = contractTypeRepository;
    _billItemTypeRepository = billItemTypeRepository;
    _mapper = mapper;
  }

  public async Task<Contract?> MapAsync(ContractInput? from, Contract? into, CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    var contract = into ?? new Contract();
    contract.SetStatus(from.Status);
    contract.SetInternalCode(from.InternalCode);
    contract.SetExternalCode(from.ExternalCode);
    contract.SetPreviousCode(from.PreviousCode);
    contract.SetManagementSubjectId(from.ManagementSubjectId);
    contract.SetReason(from.Reason);
    contract.SetAgreementDate(from.AgreementDate);
    contract.SetEffectStartDate(from.EffectStartDate);
    contract.SetLastRenewalStartDate(from.LastRenewalStartDate);
    contract.SetFirstTermDetails(from.FirstTermDurationMonths, from.FirstTermExpirationDate);
    contract.SetSecondTermDetails(from.SecondTermDurationMonths, from.SecondTermExpirationDate);
    contract.SetWarningMonths(from.AnytimeTerminationWarningMonths, from.NonRenewalWarningMonths);
    contract.SetBillingStartDate(from.BillingStartDate);
    contract.SetBillingAfterTerm(from.BillingAfterTerm);
    contract.SetRecoverBillsAfterSuspension(from.RecoverBillsAfterSuspension);
    contract.SetBillingAlignedToCalendarYear(from.BillingAlignedToCalendarYear);
    contract.SetBillingVATRateType(from.BillingVATRateType);
    contract.SetBillingPeriod(from.BillingPeriod);
    contract.SetBillingWithSplitPayment(from.BillingWithSplitPayment);
    contract.SetBillingWithStampTax(from.BillingWithStampTax);
    contract.SetNotes(from.Notes);
    contract.SetBillingNotes(from.BillingNotes);
    contract.SetTerminationDate(from.TerminationDate);
    contract.SetTerminator(from.Terminator);
    contract.SetBillingEndDate(from.BillingEndDate);
    contract.SetSublocatedContract(await MapSublocatedContractAsync(from.SublocatedContract, cancellationToken));

    if (from.BillingBaseFeeBillItemTypeId.HasValue &&
      !await _billItemTypeRepository.AnyAsync(new GetByIdSpec<BillItemType>(from.BillingBaseFeeBillItemTypeId.Value), cancellationToken))
    {
      throw new MappingException(ErrorCode.ContractNonExistingBillingBaseFeeBillItemType.ToValidationError());
    }

    contract.SetBillingBaseFee(
      from.BillingAppliesBaseFee,
      from.BillingBaseFee,
      from.BillingBaseFeeBillItemTypeId is null
      ? null
      : await _billItemTypeRepository
        .AsQueryable(new GetByIdSpec<BillItemType>(from.BillingBaseFeeBillItemTypeId.Value))
        .FirstAsync(cancellationToken: cancellationToken));

    var type = await _contractTypeRepository.SingleOrDefaultAsync(new GetByIdSpec<ContractType>(from.TypeId), cancellationToken);
    contract.SetType(type ?? throw new MappingException(ErrorCode.ContractNonExistingType.ToValidationError()));

    var registrationTaxData = await _mapper.MapAsync<RegistrationTaxInput, RegistrationTax>(from.RegistrationTaxData, cancellationToken);
    contract.SetRegistrationTaxData(registrationTaxData);

    var revaluationData = await _mapper.MapAsync<RevaluationInput, Revaluation>(from.RevaluationData, cancellationToken);
    contract.SetRevaluationData(revaluationData);

    await _mapper.UpdateCollectionAsync(from.LocatedUnits, contract.LocatedUnits, cancellationToken);
    await _mapper.UpdateCollectionAsync(from.Counterparts, contract.Counterparts, cancellationToken);
    await _mapper.UpdateCollectionAsync(from.Transactors, contract.Transactors, cancellationToken);

    await MapperBase.UpdateCollectionAsync(
      from.SecurityDeposits,
      _mapper,
      () => contract.SecurityDeposits,
      contract.AddSecurityDeposit,
      contract.RemoveSecurityDeposit,
      cancellationToken);

    await _mapper.UpdateCollectionAsync(from.RatePlans, contract.RatePlans, cancellationToken);
    await _mapper.UpdateCollectionAsync(from.OneshotAdditions, contract.OneshotAdditions, cancellationToken);
    await _mapper.UpdateCollectionAsync(from.RecurringAdditions, contract.RecurringAdditions, cancellationToken);

    if (into is null && from.Id.GetValueOrDefault() != default)
    {
      contract.Id = from.Id!.Value;
    }

    return contract;
  }

  private async Task<Contract?> MapSublocatedContractAsync(SublocatedContractInput? from, CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    var sublocatedContract = await _contractRepository.SingleOrDefaultAsync(new GetByIdSpec<Contract>(from.Id), cancellationToken)
        ?? throw new MappingException(ErrorCode.ContractNonExistingSublocatedContract.ToValidationError());

    sublocatedContract.SetFirstTermDetails(from.FirstTermDurationMonths, from.FirstTermExpirationDate);
    sublocatedContract.SetSecondTermDetails(from.SecondTermDurationMonths, from.SecondTermExpirationDate);
    sublocatedContract.SetWarningMonths(from.AnytimeTerminationWarningMonths, from.NonRenewalWarningMonths);
    sublocatedContract.SetTerminationDate(from.TerminationDate);
    sublocatedContract.SetTerminator(from.Terminator);

    return sublocatedContract;
  }
}
