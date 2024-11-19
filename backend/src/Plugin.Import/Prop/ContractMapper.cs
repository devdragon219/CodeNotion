using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.ContractAggregate.Specifications;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.Core.CrossModule;
using Microsoft.Extensions.Logging;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Plugin.Import.Prop.Models;

namespace RealGimm.Plugin.Import.Prop;

public partial class ContractMapper
{
  public required IRepository<Contract> _contractRepository { protected get; init; }
  public required IReadRepository<ContractType> _contractTypeRepository { protected get; init; }
  public required IReadRepository<BillItemType> _billItemTypeRepository { protected get; init; }
  public required ILogger<ContractMapper> _logger { protected get; init; }

  public async Task<Contract> MapContract(ContractDTO source,
    DefaultPropImportWorkspace workspace,
    CancellationToken cancellationToken)
  {
    var localCon = await _contractRepository
      .AsQueryable(new ContractIncludeForImportSpec())
      .Where(s => s.InternalCode == source.InternalCode)
      .FirstOrDefaultAsync(cancellationToken: cancellationToken)
      ?? new Contract();

    //Updates
    if (!string.IsNullOrEmpty(source.InternalCode))
    {
      localCon.SetInternalCode(source.InternalCode);
    }
    else
    {
      localCon.SetInternalCode(source.Id);
    }

    if (source.ManagementSubjectId is not null
      && workspace.ManagementSubjectId
        .TryGetValue(source.ManagementSubjectId, out var mgmtSubjectId))
    {
      localCon.SetManagementSubjectId(mgmtSubjectId);
    }

    var contractType = await _contractTypeRepository.GetByIdAsync(
      workspace.ContractTypes[source.ContractTypeId!],
      cancellationToken)
      ?? throw new InvalidOperationException(
        $"Unable to find contract type for contract {source.Id}");

    localCon.SetType(contractType);

    localCon.SetStatus(Core.Common.EntryStatus.Working);

    if (workspace.Sublocations.TryGetValue(source.InternalCode!, out var parentContractCode))
    {
      localCon.SetSublocatedContract(
        await _contractRepository.FirstOrDefaultAsync(
          new GetByInternalCodeSpec<Contract>(
            parentContractCode
          ),
          cancellationToken)
      );
    }

    MapDates(source, localCon);

    if (workspace.ContractCounterparts.ContainsKey(source.InternalCode!))
    {
      MapCounterparts(
        source,
        workspace,
        !contractType.IsActive,
        localCon);
    }

    if (workspace.RecurringCostsByContract.ContainsKey(source.InternalCode!))
    {
      await MapRecurringCosts(
        source,
        workspace,
        localCon
      );
    }

    if (workspace.ContractTransactors.ContainsKey(source.InternalCode!))
    {
      MapTransactors(
        source,
        workspace,
        localCon
      );
    }

    if (workspace.ContractUnits.ContainsKey(source.InternalCode!))
    {
      MapLocatedUnits(
        source,
        workspace,
        localCon
      );
    }

    if (workspace.OneshotCostsByContract.ContainsKey(source.InternalCode!))
    {
      await MapOneshotCosts(
        source,
        workspace,
        localCon
      );
    }

    if (workspace.SecurityDepositsByContract.ContainsKey(source.InternalCode!))
    {
      MapSecurityDeposits(
        source,
        workspace,
        localCon
      );
    }

    if (workspace.RatePlansByContract.ContainsKey(source.InternalCode!))
    {
      MapRatePlans(
        source,
        workspace,
        localCon
      );
    }

    localCon.SetBillingEndDate(source.InvoiceCompetenceDate.ToDateOnly());

    localCon.SetBillingAfterTerm(source.IsPostponed);
    localCon.SetBillingAlignedToCalendarYear(source.IsSolarAligned);
    localCon.SetRecoverBillsAfterSuspension(source.IsRecoveryOldAmounts);

    if (source.InitialFee.HasValue)
    {
      var billItemType = (source.BillingItemId is not null
          && workspace.BillItemTypes.TryGetValue(source.BillingItemId, out var billItemTypeId))
        ? await _billItemTypeRepository.GetByIdAsync(billItemTypeId, cancellationToken)
        : null;

      localCon.SetBillingBaseFee(
        true,
        source.InitialFee,
        billItemType
      );
    }

    localCon.SetBillingWithStampTax(source.IsStampDuty
      ? AutomaticBoolean.True
      : AutomaticBoolean.False);

    localCon.SetBillingVATRateType(source.VatTypeId switch
    {
      "I1" => VATRateType.Rate,
      "I2" => VATRateType.NonTaxable,
      "I3" => VATRateType.Exempt,
      _ => null
    });

    localCon.SetBillingWithSplitPayment(source.IsSplitPayment);

    localCon.SetNotes(source.Notes);

    localCon.SetBillingNotes(source.InvoiceNote);

    ImportDataConverter.FixStringLengths(localCon);

    return localCon;
  }
}
