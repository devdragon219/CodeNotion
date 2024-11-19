using ClosedXML.Excel;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Shared.Services;
using RealGimm.Core.Shared.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Prop.AdministrationAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using AddressType = RealGimm.Core.Anag.SubjectAggregate.AddressType;
using Address = RealGimm.Core.Anag.SubjectAggregate.Address;
using RealGimm.Core.Extensions;

namespace RealGimm.Core.Prop.Services;

public sealed partial class AdministrationExportService : ExportService<Administration, AdministrationExportService.Data, AdministrationExportService>
{
  public required IReadRepository<Estate> _estateRepository { private get; init; }
  public required IReadRepository<Subject> _subjectRepository { private get; init; }

  protected override async Task<IList<Data>> SelectItemsAsync(
    IEnumerable<Administration> entities,
    CancellationToken cancellationToken = default)
  {
    var estatesInternalCodes = await _estateRepository
      .AsQueryable(new GetByIdsSpec<Estate>(entities.Select(administration => administration.EstateId).Distinct()))
      .Select(estate => new { estate.Id, estate.InternalCode })
      .ToDictionaryAsync(estate => estate.Id, estate => estate.InternalCode, cancellationToken);

    var bankAccountsIds = entities
      .Where(administration => administration.AdministratorBankAccountId.HasValue)
      .Select(administration => administration.AdministratorBankAccountId!.Value)
      .Distinct();

    var administratorSubjects = await _subjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(entities.Select(administration => administration.AdministratorSubjectId).Distinct()))
      .Select(subject => new
      {
        subject.Id,
        subject.Name,
        PrimaryAddress = subject.Addresses.First(address => address.AddressType == AddressType.LegalResidential),
        BankAccounts = subject.BankAccounts.Where(bankAccount => bankAccountsIds.Contains(bankAccount.Id)).ToList()
      })
      .ToDictionaryAsync(subject => subject.Id, cancellationToken);

    return entities
      .Select(administration =>
      {
        var currecntAdministratorSubject = administratorSubjects[administration.AdministratorSubjectId];

        var currentBankAccount = administration.AdministratorBankAccountId is null
          ? null
          : currecntAdministratorSubject.BankAccounts
              .Single(bankAccount => bankAccount.Id == administration.AdministratorBankAccountId!.Value);

        return new Data(
          administration,
          estatesInternalCodes[administration.EstateId],
          (currecntAdministratorSubject.Name, currecntAdministratorSubject.PrimaryAddress),
          currentBankAccount is null ? null : (currentBankAccount.ReferenceCode, currentBankAccount.AccountHolder));
      })
      .ToList();
  }

  protected override Dictionary<string, Func<Data, XLCellValue>> CreateExcelDataSelector()
    => new()
    {
      ["EstateInternalCode"] = data
        => data.EstateInternalCode,

      [nameof(Administration.AdministrationType)] = data
        => LocalizeEnumValue(data.Administration.AdministrationType),

      ["Administrator"] = data
        => data.AdministratorSubject.Name,

      [nameof(Administration.Since)] = data
        => data.Administration.Since.ToString(),

      [nameof(Administration.Until)] = data
        => data.Administration.Until.HasValue
          ? data.Administration.Until.ToString()
          : Blank.Value,

      [nameof(Administration.IsPaymentDataIncluded)] = data
        => LocalizeBool(data.Administration.IsPaymentDataIncluded),

      ["BankAccount_IBAN"] = data
        => data.BankAccount?.ReferenceCode,

      ["BankAccount_AccountHolder"] = data
        => data.BankAccount?.AccountHolder,

      ["AdministratorAddress"] = data
        => FormatAddress(data.AdministratorSubject.PrimaryAddress)
    };

  private string FormatAddress(Address address)
    => $"{address.Toponymy}, {address.Numbering} - {address.LocalPostCode} - {SharedLocalizer.LocalizeCountry(address.CountryISO!).Value}";
}
