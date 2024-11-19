using RealGimm.Core.Common;
using Ardalis.Result;
using System.ComponentModel.DataAnnotations;
using RealGimm.SharedKernel.Attributes;
using System.ComponentModel.DataAnnotations.Schema;

namespace RealGimm.Core.Anag.SubjectAggregate;

public class ManagementSubject : Subject, IBusinessSubject
{
  public override string Name
  {
    get => ShorthandDescription ?? FullName;
    protected set { } // generated column
  }

  [Column(nameof(IBusinessSubject.FullName)), FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string FullName { get; private set; } = default!;

  [Column(nameof(IBusinessSubject.ShorthandDescription)), FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string? ShorthandDescription { get; private set; }

  public override PersonType PersonType => PersonType.ManagementSubject;

  [MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string? ManagementCode { get; private set; }

  [MaxLength(StrFieldSizes.TAX_ID_CODE)]
  public string? BaseCountryTaxIdCode { get; private set; }

  [MaxLength(StrFieldSizes.TAX_ID_CODE)]
  public string? AdditionalTaxIdCode { get; private set; }

  [MaxLength(StrFieldSizes.ISO_COUNTRY)]
  public string? BaseCountryISO { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.LARGE_TOPONYMY_NAME)]
  public string? Location { get; private set; }

  public DateOnly? BusinessStart { get; private set; }
  public decimal? ShareCapital { get; private set; }

  [MaxLength(StrFieldSizes.TAX_ID_CODE)]
  public string? CompaniesHouseIdCode { get; private set; }

  [MaxLength(StrFieldSizes.TAX_ID_CODE)]
  public string? AdditionalGovIdCode { get; private set; }

  [MaxLength(StrFieldSizes.NAME)]
  public string? InterGroupSignature { get; private set; }

  [MaxLength(StrFieldSizes.TAX_ID_CODE)]
  public string? BankingId1 { get; private set; }

  [MaxLength(StrFieldSizes.TAX_ID_CODE)]
  public string? BankingId2 { get; private set; }

  public void SetManagementCode(string? mgmtCode) => ManagementCode = mgmtCode;

  public void UpdateBusinessData(DateOnly? businessStart,
    decimal? shareCapital,
    string? companiesHouseIdCode,
    string? additionalGovIdCode)
  {
    BusinessStart = businessStart;
    ShareCapital = shareCapital;
    CompaniesHouseIdCode = companiesHouseIdCode;
    AdditionalGovIdCode = additionalGovIdCode;
  }

  public void SetBaseCountryTaxIdCode(string? baseCountryTaxIdCode)
  {
    BaseCountryTaxIdCode = baseCountryTaxIdCode;
  }

  public void SetAdditionalTaxIdCode(string? additionalTaxIdCode)
  {
    AdditionalTaxIdCode = additionalTaxIdCode;
  }

  public void SetBaseCountryISO(string? baseCountryISO)
  {
    BaseCountryISO = baseCountryISO;
  }

  public void SetLocation(string? location)
  {
    Location = location;
  }

  public void UpdateBankingData(string? bankingId1, string? bankingId2)
  {
    BankingId1 = bankingId1;
    BankingId2 = bankingId2;
  }

  public void UpdateGroupSignature(string? signature) => InterGroupSignature = signature;

  public void AddSelfManagementRelation()
  {
    SetCompanyGroupParent(this, true, null);
  }

  public void SetFullName(string fullName) => FullName = fullName;

  public void SetShorthandDescription(string? description) => ShorthandDescription = description;

  public override IEnumerable<ValidationError> Validate()
  {
    foreach (var error in base.Validate())
    {
      yield return error;
    }

    if (string.IsNullOrWhiteSpace(FullName))
    {
      yield return ErrorCode.NameIsNullOrEmptyString.ToValidationError();
    }

    if (EntryStatus is EntryStatus.IncompleteDraft)
    {
      yield break;
    }
  }
}
