namespace RealGimm.Plugin.Import.Anag.Models;

public class SubjectDTO
{
  public string Id { get; set; } = default!;
  public string? InternalCode { get; set; }
  public string? ExternalCode { get; set; }
  public string? AccountinSystemCode { get; set; }
  public string? SubjectType { get; set; }   //F = physical, G = legal/actual or mgmt, C = legal/business
  public string? Name { get; set; }
  public string? Shorthand { get; set; }
  public string? PhysicalFirstName { get; set; }
  public string? PhysicalLastName { get; set; }
  public string? PhysicalBirthSex { get; set; }
  public string? PhysicalBirthCityId { get; set; }
  public DateTime? PhysicalBirthDate { get; set; }
  public DateTime? LegalBusinessStart { get; set; }
  public decimal? LegalShareCapital { get; set; }
  public string? LegalCompaniesHouseIdCode { get; set; }
  public string? LegalAdditionalGovIdCode { get; set; }
  public string? BaseCountryTaxIdCode { get; set; }
  public string? AdditionalTaxIdCode { get; set; }
  public string? MainAddrToponymy { get; set; }
  public string? MainAddrCityName { get; set; }
  public string? MainAddrCityId { get; set; }
  public string? MainAddrCountyCode { get; set; }
  public string? MainAddrCountryCode { get; set; }
  public string? MainAddrPostCode { get; set; }
  public string? Notes { get; set; }
  public string? MgmtSubjCode { get; set; }
  public string? ParentMgmtSubjectId { get; set; }
  public bool IsMgmtSubject { get; set; }
  public bool IsGroupLeader { get; set; }
  public bool IsClosed { get; set; }
  public bool IsLandlord { get; set; }
  public bool IsInvoicing { get; set; }
  public bool IsFiscal { get; set; }
  public bool IsOfficer { get; set; }
  public bool IsTenant { get; set; }
  public bool IsAdministrator { get; set; }
  public bool IsEmployee { get; set; }
  public bool IsInCompanyGroup { get; set; }
  public bool IsGroupSignaturePresent { get; set; }
  public string? GroupSignature { get; set; }
  public bool IsTenantVAT { get; set; }
  public bool IsLandlordVAT { get; set; }
  public DateTime? LastUpdatedDate { get; set; }
}
