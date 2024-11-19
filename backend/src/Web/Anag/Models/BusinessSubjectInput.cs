namespace RealGimm.Web.Anag.Models;

public abstract record BusinessSubjectInput : SubjectInput
{
  public string FullName { get; set; } = default!;
  public string? ShorthandDescription { get; set; }
  public string? BaseCountryTaxIdCode { get; set; }
  public string? AdditionalTaxIdCode { get; set; }
  public DateOnly? BusinessStart { get; set; }
  public decimal? ShareCapital { get; set; }
  public string? CompaniesHouseIdCode { get; set; }
  public string? AdditionalGovIdCode { get; set; }
  public string? InterGroupSignature { get; set; }
  public string? BankingId1 { get; set; }
  public string? BankingId2 { get; set; }
  public CompanyGroupInput? CompanyGroup { get; set; }
}
