using RealGimm.Core.Nrgy.UtilityServiceAggregate;

namespace RealGimm.Core.Nrgy.Services;

public sealed partial class UtilityServiceExportService
{
  public record Data(
    UtilityService UtilityService, 
    string ReferenceSubjectName,
    (string Name, string InternalCode, string? Vat) ProviderSubject,
    string? OrgUnitName,
    (string InternalCode, string Description) AccountingItem,
    IEnumerable<string> EstatesInternalCodes,
    IEnumerable<string> EstateUnitsInternalCodes
  );
}
