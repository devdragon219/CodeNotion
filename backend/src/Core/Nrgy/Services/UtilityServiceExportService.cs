using System.Linq;
using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Nrgy.CostChargeAggregate;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.Core.Shared.Services;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.Core.Nrgy.Services;
public sealed partial class UtilityServiceExportService : ExportService<UtilityService, UtilityServiceExportService.Data, UtilityServiceExportService>
{
  public required IReadRepository<OrgUnit> _orgUnitRepository { private get; init; }
  public required IReadRepository<Subject> _subjectRepository { private get; init; }
  public required IReadRepository<Estate> _estateRepository { private get; init; }
  public required IReadRepository<EstateUnit> _estateUnitRepository { private get; init; }
  public required IReadRepository<AccountingItem> _accountingItemRepository { private get; init; }

  protected override async Task<IList<Data>> SelectItemsAsync(
    IEnumerable<UtilityService> entities,
    CancellationToken cancellationToken = default)
  {
    var referenceSubjectsNames = await _subjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(entities.Select(utilityService => utilityService.ReferenceSubjectId).Distinct()))
      .Select(subject => new { subject.Id, subject.Name })
      .ToDictionaryAsync(subject => subject.Id, subject => subject.Name, cancellationToken);

    var providerSubjects = await _subjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(entities.Select(utilityService => utilityService.ProviderSubjectId).Distinct()))
      .Select(subject => new
      {
        subject.Id,
        subject.Name,
        subject.InternalCode,
        Vat = subject is PhysicalSubject
          ? ((PhysicalSubject)subject).ProfessionalTaxIdCode
          : subject is LegalSubject
            ? ((LegalSubject)subject).BaseCountryTaxIdCode
            : ((ManagementSubject)subject).BaseCountryTaxIdCode
      })
      .ToDictionaryAsync(subject => subject.Id, cancellationToken);

    var accountingItems = await _accountingItemRepository
      .AsQueryable(new GetByIdsSpec<AccountingItem>(entities.Select(utilityService => utilityService.AccountingItemId).Distinct()))
      .Select(accountingItem => new { accountingItem.Id, accountingItem.InternalCode, accountingItem.Description })
      .ToDictionaryAsync(accountingItem => accountingItem.Id, cancellationToken);

    var orgUnitsNames = await _orgUnitRepository
      .AsQueryable(new GetByIdsSpec<OrgUnit>(entities.Select(utilityService => utilityService.OrgUnitId).Distinct()))
      .Select(orgUnit => new { orgUnit.Id, orgUnit.Name})
      .ToDictionaryAsync(orgUnit => orgUnit.Id, orgUnit => orgUnit.Name, cancellationToken);

    var estatesInternalCodes = await _estateRepository
      .AsQueryable(new GetByIdsSpec<Estate>(entities.SelectMany(utilityService => utilityService.EstateIds).Distinct()))
      .Select(estate => new { estate.Id, estate.InternalCode })
      .ToDictionaryAsync(estate => estate.Id, estate => estate.InternalCode, cancellationToken);

    var estateUnitsInternalCodes = await _estateUnitRepository
      .AsQueryable(new GetByIdsSpec<EstateUnit>(entities.SelectMany(utilityService => utilityService.EstateUnitIds).Distinct()))
      .Select(estateUnit => new { estateUnit.Id, estateUnit.InternalCode })
      .ToDictionaryAsync(estateUnit => estateUnit.Id, estateUnit => estateUnit.InternalCode, cancellationToken);

    return entities
      .Select(utilityService =>
      {
        var currentProviderSubject = providerSubjects[utilityService.ProviderSubjectId];
        var currentAccountingItem = accountingItems[utilityService.AccountingItemId];

        var currentEstatesIntenalCodes = utilityService.EstateIds
          .Select(estateId => estatesInternalCodes[estateId])
          .ToArray();

        var currentEstateUnitsIntenalCodes = utilityService.EstateUnitIds
          .Select(estateUnitId => estateUnitsInternalCodes[estateUnitId])
          .ToArray();

        return new Data(
          utilityService,
          referenceSubjectsNames[utilityService.ReferenceSubjectId],
          (currentProviderSubject.Name, currentProviderSubject.InternalCode, currentProviderSubject.Vat),
          orgUnitsNames[utilityService.OrgUnitId],
          (currentAccountingItem.InternalCode, currentAccountingItem.Description),
          currentEstatesIntenalCodes,
          currentEstateUnitsIntenalCodes);
      })
      .ToList();
  }

  protected override Dictionary<string, Func<Data, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<Data, XLCellValue>>()
    {
      [nameof(UtilityService.InternalCode)] = data => data.UtilityService.InternalCode,
      ["ReferenceSubjectName"] = data => data.ReferenceSubjectName,
      ["OrgUnitName"] = data => data.OrgUnitName,
      ["UtilityTypeCode"] = data => $"{data.UtilityService.UtilityType.InternalCode} - {data.UtilityService.UtilityType.Description}",
      ["UtilityTypeCategory"] = data => LocalizeEnumValue(data.UtilityService.UtilityType.Category),
      ["ProviderSubjectName"] = data => data.ProviderSubject.Name,
      ["ProviderSubjectCode"] = data => data.ProviderSubject.InternalCode,
      ["VAT"] = data => data.ProviderSubject.Vat,
      [nameof(UtilityService.Status)] = data => LocalizeEnumValue(data.UtilityService.Status),
      [nameof(UtilityService.ActivationDate)] = data => data.UtilityService.ActivationDate.ToString(),
      [nameof(UtilityService.UtilityContractCode)] = data => data.UtilityService.UtilityContractCode,
      [nameof(UtilityService.UtilityUserCode)] = data => data.UtilityService.UtilityUserCode,
      [nameof(UtilityService.Description)] = data => data.UtilityService.Description,
      ["AccountingItemCode"] = data => $"({data.AccountingItem.InternalCode}) {data.AccountingItem.Description}",
      ["UtilityTypeMeteringType"] = data => LocalizeEnumValue(data.UtilityService.UtilityType.MeteringType),
      [nameof(UtilityService.IsFreeMarket)] = data => LocalizeBool(data.UtilityService.IsFreeMarket),
      [nameof(UtilityService.Deposit)] = data => data.UtilityService.Deposit,
      [nameof(UtilityService.ContractPowerNominal)] = data => data.UtilityService.ContractPowerNominal,
      [nameof(UtilityService.ContractPowerMaximum)] = data => data.UtilityService.ContractPowerMaximum,
      [nameof(UtilityService.UtilityMeterSerial)] = data => data.UtilityService.UtilityMeterSerial,
      [nameof(UtilityService.ContractNominalTension)] = data => data.UtilityService.ContractNominalTension,
      [nameof(UtilityService.UtilityDeliveryPointCode)] = data => data.UtilityService.UtilityDeliveryPointCode,
      ["Estates"] = data => string.Join(",", data.EstatesInternalCodes),
      ["EstateUnits"] = data => string.Join(",", data.EstateUnitsInternalCodes)
    };
}
