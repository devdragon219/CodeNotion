using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Prop.AdministrationAggregate;
using RealGimm.Core.Prop.AdministrationTermAggregate;
using RealGimm.Plugin.Import.Prop.Models;

namespace RealGimm.Plugin.Import.Prop;

public partial class AdministrationMapper
{
  private async Task MapTerms(
    AdministrationDTO source,
    DefaultPropImportWorkspace workspace,
    Administration localAdm)
  {
    if (source.Terms is null)
    {
      return;
    }

    var toBeById = source.Terms
      .GroupBy(obj => obj.Description ?? string.Empty)
      .ToDictionary(grp => grp.Key, grp => grp.First());

    var existingById = localAdm
      .Terms
      .ToDictionary(trm => trm.Name);

    foreach (var idToRemove in existingById.Keys.Except(toBeById.Keys))
    {
      localAdm.Terms.Remove(existingById[idToRemove]);
    }

    foreach (var toAdd in toBeById.Where(kvp => !existingById.ContainsKey(kvp.Key)))
    {
      var src = toAdd.Value;

      var newTrm = new AdministrationTerm();
      newTrm.SetExpectedAmount(src.Amount ?? 0);
      newTrm.SetName(src.Description ?? string.Empty);
      newTrm.SetTermType(src.TermTypeId.ParseAsRG2AdminTermType());
      newTrm.SetSince(DateOnly.FromDateTime(src.StartDate ?? DateTime.UtcNow));
      newTrm.SetUntil(DateOnly.FromDateTime(src.EndDate ?? DateTime.UtcNow));

      await MapPayments(src, workspace, newTrm);

      localAdm.Terms.Add(newTrm);
    }

    foreach (var toUpdate in existingById.Where(kvp => toBeById.ContainsKey(kvp.Key)))
    {
      var dest = toUpdate.Value;
      var src = toBeById[toUpdate.Key];

      dest.SetExpectedAmount(src.Amount ?? 0);
      dest.SetName(src.Description ?? string.Empty);
      dest.SetTermType(src.TermTypeId.ParseAsRG2AdminTermType());
      dest.SetSince(DateOnly.FromDateTime(src.StartDate ?? DateTime.UtcNow));
      dest.SetUntil(DateOnly.FromDateTime(src.EndDate ?? DateTime.UtcNow));

      await MapPayments(src, workspace, dest);
    }
  }

  private async Task MapPayments(AdminTermDTO source, DefaultPropImportWorkspace workspace, AdministrationTerm localTerm)
  {
    if (source.Payments is null)
    {
      return;
    }

    var toBeById = source
      .Payments
      .OrderBy(p => p.InstallmentIndex ?? string.Empty)
      .Select((p, index) =>
      {
        p.Notes = string.Join("; ", new[] { p.Notes, p.InstallmentIndex }
          .Where(s => !string.IsNullOrEmpty(s)));

        p.InstallmentIndex = (index+1).ToString();

        return p;
      })
      .ToDictionary(p => p.InstallmentIndex!);

    var existingById = localTerm
      .Installments
      .ToDictionary(trm => trm.InstallmentNumber.ToString());

    foreach (var idToRemove in existingById.Keys.Except(toBeById.Keys))
    {
      localTerm.Installments.Remove(existingById[idToRemove]);
    }

    foreach (var toAdd in toBeById.Where(kvp => !existingById.ContainsKey(kvp.Key)))
    {
      var src = toAdd.Value;

      var newPaymt = new TermInstallment();
      newPaymt.SetAmount(src.Amount ?? 0);
      newPaymt.SetNotes(src.Notes);
      if (!string.IsNullOrEmpty(src.InstallmentIndex))
      {
        newPaymt.SetInstallmentNumber(Convert.ToInt32(src.InstallmentIndex));
      }
      newPaymt.SetDueDate(DateOnly.FromDateTime(src.ReferenceDate ?? DateTime.UtcNow));

      if (!string.IsNullOrEmpty(src.BillItemTypeId)
        && workspace.BillItemTypes.TryGetValue(
          src.BillItemTypeId,
          out var billItemTypeId))
      {
        var billItem = await _billItemTypeRepository.GetByIdAsync(billItemTypeId);

        newPaymt.SetBillItemType(billItem!);
      }

      newPaymt.SetSince(DateOnly.FromDateTime(src.StartDate ?? DateTime.UtcNow));
      newPaymt.SetUntil(DateOnly.FromDateTime(src.EndDate ?? DateTime.UtcNow));

      localTerm.Installments.Add(newPaymt);
    }

    foreach (var toUpdate in existingById.Where(kvp => toBeById.ContainsKey(kvp.Key)))
    {
      var dest = toUpdate.Value;
      var src = toBeById[toUpdate.Key];

      dest.SetAmount(src.Amount ?? 0);
      dest.SetNotes(src.Notes);
      if (!string.IsNullOrEmpty(src.InstallmentIndex))
      {
        dest.SetInstallmentNumber(Convert.ToInt32(src.InstallmentIndex));
      }

      dest.SetDueDate(DateOnly.FromDateTime(src.ReferenceDate ?? DateTime.UtcNow));

      if (!string.IsNullOrEmpty(src.BillItemTypeId)
        && workspace.BillItemTypes.TryGetValue(
          src.BillItemTypeId,
          out var billItemTypeId))
      {
        var billItem = await _billItemTypeRepository.GetByIdAsync(billItemTypeId);

        dest.SetBillItemType(billItem!);
      }

      dest.SetSince(DateOnly.FromDateTime(src.StartDate ?? DateTime.UtcNow));
      dest.SetUntil(DateOnly.FromDateTime(src.EndDate ?? DateTime.UtcNow));
    }
  }
}
