using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using Microsoft.Extensions.Logging;
using RealGimm.Core.Prop.AdministrationAggregate;
using RealGimm.Core.Prop.AdministrationAggregate.Specifications;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Plugin.Import.Prop.Models;

namespace RealGimm.Plugin.Import.Prop;

public partial class AdministrationMapper
{
  public required IRepository<Administration> _adminRepository { protected get; init; }
  public required IRepository<BillItemType> _billItemTypeRepository { protected get; init; } 
  public required ICustomPropEnumMapper propEnumMapper { protected get; init; }
  public required ILogger<AdministrationMapper> _logger { protected get; init; }

  public async Task<Administration> MapAdministration(AdministrationDTO source,
    DefaultPropImportWorkspace workspace,
    CancellationToken cancellationToken)
  {
    var localAdm = await _adminRepository
      .AsQueryable(new AdministrationIncludeForImportSpec())
      .Where(s => s.ExternalCode == source.Id)
      .FirstOrDefaultAsync(cancellationToken: cancellationToken)
      ?? new Administration();

    //Updates
    if (source.SubjectId is not null
      && workspace.SubjectsId.TryGetValue(source.SubjectId, out var subjId))
    {
      localAdm.SetAdministratorSubjectId(subjId);

      if (source.SubjectBankAccountReference is not null
        && workspace.BankAccountIds.TryGetValue(
            subjId + ";" + source.SubjectBankAccountReference,
            out var bankAccountId))
      {
        localAdm.SetAdministratorBankAccountId(bankAccountId);
      }
    }

    localAdm.SetAdministrationType(
      await propEnumMapper.MapAdministrationType(
        source.AdministrationTypeId));

    if (source.EstateId is not null
      && workspace.EstateIds.TryGetValue(source.EstateId, out var estateId))
    {
      localAdm.SetEstateId(estateId);
    } else {
      _logger.LogWarning("Unable to find estate {estateCode} while mapping administration {administration}",
        source.EstateId,
        source.Id);
    }

    localAdm.SetExternalCode(source.Id);

    if (source.StartDate.HasValue)
    {
      localAdm.SetSince(DateOnly.FromDateTime(source.StartDate.Value));
    }

    if (source.EndDate.HasValue)
    {
      localAdm.SetUntil(DateOnly.FromDateTime(source.EndDate.Value));
    }

    localAdm.SetNotes(source.Notes);
    localAdm.SetIsPaymentDataIncluded(source.IsAutomated);

    localAdm.SetPaymentType(
      source.PaymentTypeCode.ParseAsRG2PaymentType()
    );

    await MapTerms(source, workspace, localAdm);

    ImportDataConverter.FixStringLengths(localAdm);

    return localAdm;
  }
}
