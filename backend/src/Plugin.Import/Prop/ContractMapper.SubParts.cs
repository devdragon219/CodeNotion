using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Shared;
using RealGimm.Plugin.Import.Anag;
using RealGimm.Plugin.Import.Prop.Models;

namespace RealGimm.Plugin.Import.Prop;

public partial class ContractMapper
{
  private void MapLocatedUnits(
    ContractDTO source,
    DefaultPropImportWorkspace workspace,
    Contract localCon)
  {
    //RG5 located units have an optional subUI and mandatory UI
    //In the imported data, sometimes the subunit id is the unit id...

    var toBeUnits = workspace.ContractUnits[source.InternalCode!];

    var toBeBySubUnitIds = toBeUnits
      .Select(u =>
      {
        var SubUnitId = workspace.EstateSubUnitIds.TryGetValue(u.EstateSubUnitId, out var subUiId)
          ? subUiId
          : (int?)null;

        return new
        {
          SubUnitId,
          UnitId = u.EstateUnitId is not null && workspace.EstateUnitIds.TryGetValue(u.EstateUnitId, out var uiId)
              ? uiId
              : (SubUnitId is not null && workspace.EstateUnitBySubUnitId.TryGetValue(SubUnitId.Value, out var uiId2)
                ? uiId2
                : (int?)null),
          LocatedUnit = u
        };
      })
      //Due to bad data, some units may have the same subunit id and unit id
      .GroupBy(obj => new {
        obj.SubUnitId,
        obj.UnitId
      })
      .ToDictionary(
        grp => grp.Key,
        grp => grp.First().LocatedUnit);

    var existingSubUnitIds = localCon.LocatedUnits
      .ToDictionary(lsu => new
      {
        SubUnitId = lsu.EstateSubUnitId,
        UnitId = (int?)lsu.EstateUnitId
      });

    foreach (var toRemove in existingSubUnitIds
      .Where(kvp => !toBeBySubUnitIds.ContainsKey(kvp.Key)))
    {
      localCon.LocatedUnits.Remove(toRemove.Value);
    }

    foreach (var toAdd in toBeBySubUnitIds
      .Where(kvp => !existingSubUnitIds.ContainsKey(kvp.Key)))
    {
      if (toAdd.Key.UnitId is null)
      {
        _logger.LogWarning("Unable to find unit while mapping contract {cid} for located unit {uid}",
          source.InternalCode,
          toAdd.Key);

        continue;
      }

      var src = toAdd.Value;

      var located = new LocatedUnit();
      located.SetIsMainUnit(src.IsMainUnit);
      located.SetIsPartialLocation(src.IsPartiallyLocated);
      located.SetIsRegistryUpdateEnabled(src.IsRegistryUpdated);
      located.SetSurfaceSqM(src.SurfaceSqM);

      located.SetEstateUnit(toAdd.Key.UnitId.Value, toAdd.Key.SubUnitId);

      localCon.LocatedUnits.Add(located);
    }

    foreach (var toUpdate in toBeBySubUnitIds
      .Where(kvp => existingSubUnitIds.ContainsKey(kvp.Key)))
    {
      if (toUpdate.Key.UnitId is null)
      {
        _logger.LogWarning("Unable to find unit while mapping updated contract {cid} for located unit {uid}",
          source.InternalCode,
          toUpdate.Key.SubUnitId);

        continue;
      }

      var src = toUpdate.Value;
      var located = existingSubUnitIds[toUpdate.Key];

      located.SetIsMainUnit(src.IsMainUnit);
      located.SetIsPartialLocation(src.IsPartiallyLocated);
      located.SetIsRegistryUpdateEnabled(src.IsRegistryUpdated);
      located.SetSurfaceSqM(src.SurfaceSqM);

      located.SetEstateUnit(toUpdate.Key.UnitId.Value, toUpdate.Key.SubUnitId);
    }
  }

  private static void MapDates(ContractDTO source, Contract localCon)
  {
    localCon.SetAgreementDate(source.SigningDate.ToDateOnly()
      ?? DateTime.UtcNow.ToDateOnly());

    localCon.SetEffectStartDate(source.StartDate.ToDateOnly()
      ?? DateTime.UtcNow.ToDateOnly());

    localCon.SetLastRenewalStartDate(source.EffectivenessDate.ToDateOnly()
      ?? DateTime.UtcNow.ToDateOnly());

    localCon.SetBillingStartDate(source.BillingStartDate.ToDateOnly()
      ?? DateTime.UtcNow.ToDateOnly());

    localCon.SetFirstTermDetails(
      source.DurationMonths1,
      source.ExpirationDate1.ToDateOnly()
    );

    localCon.SetSecondTermDetails(
      source.DurationMonths2,
      source.ExpirationDate2.ToDateOnly()
    );

    if (source.CancellationDate.HasValue)
    {
      localCon.SetTerminationDate(source.CancellationDate.ToDateOnly()
        ?? DateTime.UtcNow.ToDateOnly());
    }

    localCon.SetBillingPeriod(source.BillingPeriodMonths switch
    {
      "1" => BillingPeriod.Monthly,
      "2" => BillingPeriod.Bimonthly,
      "3" => BillingPeriod.PerQuarter,
      "4" => BillingPeriod.PerQuadrimester,
      "6" => BillingPeriod.PerSemester,
      "12" => BillingPeriod.Yearly,
      _ => BillingPeriod.Yearly
    });

    localCon.SetWarningMonths(source.CancellationMonths, source.NoticeMonths);
  }

  private static void MapCounterparts(ContractDTO source,
    DefaultPropImportWorkspace workspace,
    bool mapLandlords,
    Contract localCon)
  {
    var counterparts = workspace.ContractCounterparts[source.InternalCode!];

    var toBeById = counterparts
      .Where(ccode => mapLandlords == ccode.IsLandlord)
      .Where(ccode => workspace.SubjectsId.ContainsKey(ccode.CounterpartId))
      .Select(ccode => new
      {
        Id = workspace.SubjectsId[ccode.CounterpartId],
        Counterpart = ccode
      })
      .ToDictionary(obj => obj.Id, obj => obj.Counterpart);

    var existingById = localCon
      .Counterparts
      .ToDictionary(cp => cp.SubjectId);

    foreach (var idToRemove in existingById.Keys.Except(toBeById.Keys))
    {
      localCon.Counterparts.Remove(existingById[idToRemove]);
    }

    foreach (var toAdd in toBeById.Where(kvp => !existingById.ContainsKey(kvp.Key)))
    {
      var src = toAdd.Value;

      var newCtp = new Counterpart();
      newCtp.SetSubjectId(toAdd.Key);
      newCtp.SetContractSharePercent((src.RateFactor ?? 1) * 100);
      newCtp.SetIsMainCounterpart(src.IsMainCounterpart);
      newCtp.SetSince(DateOnly.FromDateTime(src.StartDate ?? DateTime.UtcNow));
      newCtp.SetUntil(src.EndDate.HasValue
        ? DateOnly.FromDateTime(src.EndDate.Value)
        : null);

      newCtp.SetType(src.TenancyTypeCode switch
      {
        "TC1" => CounterpartType.NonProfit,
        "TC2" => CounterpartType.PhysicalSubjectWithTemporaryID,
        "TC3" => CounterpartType.Regular,
        _ => CounterpartType.Regular
      });

      localCon.Counterparts.Add(newCtp);
    }

    foreach (var toUpdate in toBeById.Where(kvp => existingById.ContainsKey(kvp.Key)))
    {
      var src = toUpdate.Value;
      var dest = existingById[toUpdate.Key];

      dest.SetSubjectId(toUpdate.Key);
      dest.SetContractSharePercent((src.RateFactor ?? 1) * 100);
      dest.SetIsMainCounterpart(src.IsMainCounterpart);
      dest.SetSince(DateOnly.FromDateTime(src.StartDate ?? DateTime.UtcNow));
      dest.SetUntil(src.EndDate.HasValue
        ? DateOnly.FromDateTime(src.EndDate.Value)
        : null);

      dest.SetType(src.TenancyTypeCode switch
      {
        "TC1" => CounterpartType.NonProfit,
        "TC2" => CounterpartType.PhysicalSubjectWithTemporaryID,
        "TC3" => CounterpartType.Regular,
        _ => CounterpartType.Regular
      });
    }
  }

  private void MapTransactors(ContractDTO source,
    DefaultPropImportWorkspace workspace,
    Contract localCon)
  {
    var transactors = workspace.ContractTransactors[source.InternalCode!];

    var toBeById = transactors
      .Where(ccode => workspace.SubjectsId.ContainsKey(ccode.TransactorId))
      .Select(ccode => new
      {
        Id = workspace.SubjectsId[ccode.TransactorId],
        Counterpart = ccode
      })
      .ToDictionary(obj => obj.Id, obj => obj.Counterpart);

    var existingById = localCon
      .Transactors
      .ToDictionary(cp => cp.SubjectId);

    foreach (var idToRemove in existingById.Keys.Except(toBeById.Keys))
    {
      localCon.Transactors.Remove(existingById[idToRemove]);
    }

    foreach (var toAdd in toBeById.Where(kvp => !existingById.ContainsKey(kvp.Key)))
    {
      var src = toAdd.Value;

      var newTrx = new Transactor();
      newTrx.SetSubjectId(toAdd.Key);
      newTrx.SetTransactionSharePercent((src.RateFactor ?? 1) * 100);
      newTrx.SetSince(DateOnly.FromDateTime(src.StartDate ?? DateTime.UtcNow));
      newTrx.SetUntil(src.EndDate.HasValue
        ? DateOnly.FromDateTime(src.EndDate.Value)
        : null);

      newTrx.SetPaymentType(src.PaymentTypeCode.ParseAsRG2PaymentType());

      SetAddress(newTrx, src);

      localCon.Transactors.Add(newTrx);
    }

    foreach (var toUpdate in toBeById.Where(kvp => existingById.ContainsKey(kvp.Key)))
    {
      var src = toUpdate.Value;
      var dest = existingById[toUpdate.Key];

      dest.SetSubjectId(toUpdate.Key);
      dest.SetTransactionSharePercent((src.RateFactor ?? 1) * 100);
      dest.SetSince(DateOnly.FromDateTime(src.StartDate ?? DateTime.UtcNow));
      dest.SetUntil(src.EndDate.HasValue
        ? DateOnly.FromDateTime(src.EndDate.Value)
        : null);

      dest.SetPaymentType(src.PaymentTypeCode.ParseAsRG2PaymentType());

      SetAddress(dest, src);
    }

    void SetAddress(Transactor trx, TransactorDTO src)
    {
      //Try zeroing in on the address for this subject
      if (workspace.SubjectAddresses.TryGetValue(src.TransactorId, out var addresses))
      {
        //This check is not by ID because during address import deduplication may
        // make ID match impossible
        addresses = addresses
          .Where(a => a.Toponymy.RoughToponymyMatches(src.TransactorAddressToponymy))
          .ToArray();

        if (addresses.Length == 0)
        {
          return;
        }

        if (addresses.Length == 1)
        {
          trx.SetAddressId(addresses[0].Id);
          return;
        }

        addresses = addresses
          .Where(a => a.AddressType == src.TransactorAddressType.ParseAsRG2AddressType())
          .ToArray();

        if (addresses.Length == 0)
        {
          return;
        }

        if (addresses.Length == 1)
        {
          trx.SetAddressId(addresses[0].Id);
          return;
        }

        addresses = addresses
                  .Where(a => a.CityName == src.TransactorAddressCityName
                    && a.LocalPostCode == src.TransactorAddressPostCode)
                  .ToArray();

        if (addresses.Length == 0)
        {
          return;
        }

        if (addresses.Length == 1)
        {
          trx.SetAddressId(addresses[0].Id);
          return;
        }
      }
    }
  }

  private async Task MapRecurringCosts(
    ContractDTO source,
    DefaultPropImportWorkspace workspace,
    Contract localCon)
  {
    var recurringCosts = workspace.RecurringCostsByContract[source.InternalCode!];

    var toBeById = recurringCosts
      .Select(rc =>
      {
        var billItemType = workspace.BillItemTypes[rc.BillingItemId];
        return new
        {
          Id = rc.Amount.ToDecimalKey()
              + billItemType
              + "-" + (rc.ExcludeEndMonth ?? string.Empty)
              + "-" + (rc.ExcludeStartMonth ?? string.Empty),
          RecurringCost = rc
        };
      })
      .GroupBy(rc => rc.Id)
      .ToDictionary(grp => grp.Key, grp => grp.First().RecurringCost);

    var existingById = localCon
      .RecurringAdditions
      .ToDictionary(cp => cp.AmountPerInstallment.ToDecimalKey()
        + cp.BillItemType.Id
        + "-" + (cp.ExcludeEndMonth?.ToString("D2") ?? string.Empty)
        + "-" + (cp.ExcludeStartMonth?.ToString("D2") ?? string.Empty));

    foreach (var idToRemove in existingById.Keys.Except(toBeById.Keys))
    {
      localCon.RecurringAdditions.Remove(existingById[idToRemove]);
    }

    //Take a random VAT rate if it was not set
    var defaultVATRateId = workspace.VatRateIds.First().Value;

    foreach (var toAdd in toBeById.Where(kvp => !existingById.ContainsKey(kvp.Key)))
    {
      var src = toAdd.Value;

      var billItem = await _billItemTypeRepository.GetByIdAsync(
        workspace.BillItemTypes[src.BillingItemId]);

      var newRC = new RecurringAddition();
      if (billItem!.DefaultAccountingItemId.HasValue)
      {
        newRC.SetAccountingItemId(billItem.DefaultAccountingItemId.Value);
      }
      newRC.SetAmountPerInstallment(src.Amount ?? 0);
      newRC.SetBillItemType(billItem);
      if (!string.IsNullOrEmpty(src.ExcludeEndMonth)
        && src.ExcludeEndMonth.All(char.IsDigit))
      {
        newRC.SetExcludeEndMonth(int.Parse(src.ExcludeEndMonth));
      }
      if (!string.IsNullOrEmpty(src.ExcludeStartMonth)
        && src.ExcludeStartMonth.All(char.IsDigit))
      {
        newRC.SetExcludeStartMonth(int.Parse(src.ExcludeStartMonth));
      }
      if (src.VatRateId is not null
        && workspace.VatRateIds.TryGetValue(src.VatRateId, out var vatRateId))
      {
        newRC.SetVATRateId(vatRateId);
      }

      localCon.RecurringAdditions.Add(newRC);
    }

    foreach (var toUpdate in toBeById.Where(kvp => existingById.ContainsKey(kvp.Key)))
    {
      var src = toUpdate.Value;
      var dest = existingById[toUpdate.Key];

      var billItem = await _billItemTypeRepository.GetByIdAsync(
        workspace.BillItemTypes[src.BillingItemId]);

      if (billItem!.DefaultAccountingItemId.HasValue)
      {
        dest.SetAccountingItemId(billItem.DefaultAccountingItemId.Value);
      }
      dest.SetAmountPerInstallment(src.Amount ?? 0);
      dest.SetBillItemType(billItem);
      if (!string.IsNullOrEmpty(src.ExcludeEndMonth)
        && src.ExcludeEndMonth.All(char.IsDigit))
      {
        dest.SetExcludeEndMonth(int.Parse(src.ExcludeEndMonth));
      }
      if (!string.IsNullOrEmpty(src.ExcludeStartMonth)
        && src.ExcludeStartMonth.All(char.IsDigit))
      {
        dest.SetExcludeStartMonth(int.Parse(src.ExcludeStartMonth));
      }
      if (src.VatRateId is not null
        && workspace.VatRateIds.TryGetValue(src.VatRateId, out var vatRateId))
      {
        dest.SetVATRateId(vatRateId);
      }
    }
  }

  private async Task MapOneshotCosts(ContractDTO source,
    DefaultPropImportWorkspace workspace,
    Contract localCon)
  {
    var oneshotCosts = workspace.OneshotCostsByContract[source.InternalCode!];

    var toBeById = oneshotCosts
      .Select(rc =>
      {
        var billItemType = workspace.BillItemTypes[rc.BillingItemId];
        return new
        {
          Id = rc.Amount.ToDecimalKey()
              + billItemType
              + (rc.StartDate?.ToDateOnly().ToString() ?? "-")
              + (rc.EndDate?.ToDateOnly().ToString() ?? "-"),
          OneshotCost = rc
        };
      })
      .GroupBy(rc => rc.Id)
      .ToDictionary(grp => grp.Key, grp => grp.First().OneshotCost);

    var existingById = localCon
      .OneshotAdditions
      .ToDictionary(cp => cp.Amount.ToDecimalKey()
        + cp.BillItemType.Id
        + (cp.TermStartDate?.ToString() ?? "-")
        + (cp.TermEndDate?.ToString() ?? "-"));

    foreach (var idToRemove in existingById.Keys.Except(toBeById.Keys))
    {
      localCon.OneshotAdditions.Remove(existingById[idToRemove]);
    }

    //Take a random VAT rate if it was not set
    var defaultVATRateId = workspace.VatRateIds.First().Value;

    foreach (var toAdd in toBeById.Where(kvp => !existingById.ContainsKey(kvp.Key)))
    {
      var src = toAdd.Value;

      var billItem = await _billItemTypeRepository.GetByIdAsync(
        workspace.BillItemTypes[src.BillingItemId]);
      
      var newRC = new OneshotAddition();
      if (billItem!.DefaultAccountingItemId.HasValue)
      {
        newRC.SetAccountingItemId(billItem.DefaultAccountingItemId.Value);
      }

      newRC.SetAmount(src.Amount ?? 0);
      newRC.SetBillItemType(billItem);
      newRC.SetNotes(src.Notes);
      newRC.SetInstallments(src.Installments);
      //TODO newRC.SetRegistrationPayment()

      if (src.StartDate.HasValue)
      {
        newRC.SetTermStartDate(src.StartDate.Value.ToDateOnly());
      }

      if (src.EndDate.HasValue)
      {
        newRC.SetTermEndDate(src.EndDate.Value.ToDateOnly());
      }

      if (src.EffectStartDate.HasValue)
      {
        newRC.SetStartDate(src.EffectStartDate.Value.ToDateOnly());
      }

      if (src.VatRateId is not null
        && workspace.VatRateIds.TryGetValue(src.VatRateId, out var vatRateId))
      {
        newRC.SetVATRateId(vatRateId);
      }

      localCon.OneshotAdditions.Add(newRC);
    }

    foreach (var toUpdate in toBeById.Where(kvp => existingById.ContainsKey(kvp.Key)))
    {
      var src = toUpdate.Value;
      var dest = existingById[toUpdate.Key];

      var billItem = await _billItemTypeRepository.GetByIdAsync(
        workspace.BillItemTypes[src.BillingItemId]);

      if (billItem!.DefaultAccountingItemId.HasValue)
      {
        dest.SetAccountingItemId(billItem.DefaultAccountingItemId.Value);
      }

      dest.SetAmount(src.Amount ?? 0);
      dest.SetBillItemType(billItem);
      dest.SetNotes(src.Notes);
      dest.SetInstallments(src.Installments);
      //TODO dest.SetRegistrationPayment()

      if (src.StartDate.HasValue)
      {
        dest.SetTermStartDate(src.StartDate.Value.ToDateOnly());
      }

      if (src.EndDate.HasValue)
      {
        dest.SetTermEndDate(src.EndDate.Value.ToDateOnly());
      }

      if (src.EffectStartDate.HasValue)
      {
        dest.SetStartDate(src.EffectStartDate.Value.ToDateOnly());
      }

      if (src.VatRateId is not null
        && workspace.VatRateIds.TryGetValue(src.VatRateId, out var vatRateId))
      {
        dest.SetVATRateId(vatRateId);
      }
    }
  }

  public void MapSecurityDeposits(ContractDTO source,
    DefaultPropImportWorkspace workspace,
    Contract localCon)
  {
    var securityDeposits = workspace.SecurityDepositsByContract[source.InternalCode!];

    var toBeById = securityDeposits
      .Select(sd =>
      {
        return new
        {
          Id = sd.Amount.ToDecimalKey() +
              sd.DepositDate?.ToDateOnly().ToString() ?? "-",
          SecurityDeposit = sd
        };
      })
      .GroupBy(sd => sd.Id)
      .ToDictionary(grp => grp.Key, grp => grp.First().SecurityDeposit);

    var existingById = localCon
      .SecurityDeposits
      .ToDictionary(cp => cp.BaseAmount.ToDecimalKey()
        + cp.Since?.ToString() ?? "-");

    foreach (var idToRemove in existingById.Keys.Except(toBeById.Keys))
    {
      localCon.RemoveSecurityDeposit(existingById[idToRemove]);
    }

    foreach (var toAdd in toBeById.Where(kvp => !existingById.ContainsKey(kvp.Key)))
    {
      var src = toAdd.Value;

      var newSD = new SecurityDeposit();
      newSD.SetBaseAmount(src.Amount ?? 0);
      newSD.SetSince(src.DepositDate?.ToDateOnly());
      newSD.SetUntil(src.GivebackDate?.ToDateOnly());
      newSD.SetNotes(src.Notes);
      newSD.SetType(src.DepositType.ParseAsRG2SecurityDepositType());

      if (newSD.Type == SecurityDepositType.Cash)
      {
        newSD.SetCashData(src.InterestStartDate.HasValue,
          src.InterestStartDate.ToDateOnly(),
          src.InterestEndDate.ToDateOnly());
      }

      localCon.AddSecurityDeposit(newSD);
    }

    foreach (var toUpdate in toBeById.Where(kvp => existingById.ContainsKey(kvp.Key)))
    {
      var src = toUpdate.Value;
      var dest = existingById[toUpdate.Key];

      dest.SetBaseAmount(src.Amount ?? 0);
      dest.SetSince(src.DepositDate?.ToDateOnly());
      dest.SetUntil(src.GivebackDate?.ToDateOnly());
      dest.SetNotes(src.Notes);
      dest.SetType(src.DepositType.ParseAsRG2SecurityDepositType());

      if (dest.Type == SecurityDepositType.Cash)
      {
        dest.SetCashData(src.InterestStartDate.HasValue,
          src.InterestStartDate.ToDateOnly(),
          src.InterestEndDate.ToDateOnly());
      }
    }
  }

  public void MapRatePlans(ContractDTO source,
    DefaultPropImportWorkspace workspace,
    Contract localCon)
  {
    var ratePlans = workspace.RatePlansByContract[source.InternalCode!];

    //If the amount is the same for two subsequent entries,
    // keep only the one with the earliest date
    ratePlans = [.. ratePlans.OrderBy(rp => rp.Since)];

    var uniqueRatePlans = new List<RatePlanDTO>();
    var lastRateAmount = 0m;

    foreach (var ratePlan in ratePlans)
    {
      if (ratePlan.NewAmount != lastRateAmount)
      {
        uniqueRatePlans.Add(ratePlan);
        lastRateAmount = ratePlan.NewAmount ?? 0;
      }
    }

    var toBeById = ratePlans
      .Select(rp =>
      {
        return new
        {
          Id = rp.Since?.ToDateOnly().ToString() ?? "-" +
              rp.NewAmount.ToDecimalKey(),
          RatePlan = rp
        };
      })
      .GroupBy(rp => rp.Id)
      .ToDictionary(grp => grp.Key, grp => grp.First().RatePlan);

    var existingById = localCon
      .RatePlans
      .ToDictionary(cp => cp.Since.ToString() ?? "-"
        + cp.NewYearlyRate.ToDecimalKey());

    foreach (var idToRemove in existingById.Keys.Except(toBeById.Keys))
    {
      localCon.RatePlans.Remove(existingById[idToRemove]);
    }

    foreach (var toAdd in toBeById.Where(kvp => !existingById.ContainsKey(kvp.Key)))
    {
      var src = toAdd.Value;

      var newRP = new RatePlan();
      newRP.SetIsDeclarationExpected(src.IsDeclarationExpected);
      newRP.SetSince(src.Since!.ToDateOnly()!.Value);
      newRP.SetIsDeclared(src.IsDeclared);
      newRP.SetNewYearlyRate(src.NewAmount ?? 0);

      localCon.RatePlans.Add(newRP);
    }

    foreach (var toUpdate in toBeById.Where(kvp => existingById.ContainsKey(kvp.Key)))
    {
      var src = toUpdate.Value;
      var dest = existingById[toUpdate.Key];

      dest.SetIsDeclarationExpected(src.IsDeclarationExpected);
      dest.SetSince(src.Since!.ToDateOnly()!.Value);
      dest.SetIsDeclared(src.IsDeclared);
      dest.SetNewYearlyRate(src.NewAmount ?? 0);
    }
  }
}
