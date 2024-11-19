using HotChocolate.Types;

namespace RealGimm.Core.Anag.SubjectAggregate;

[InterfaceType("BusinessSubject")]
public interface IBusinessSubject : ISubject
{
  public string FullName { get; }
  public string? ShorthandDescription { get; }
  public string? BaseCountryTaxIdCode { get; }
  public string? AdditionalTaxIdCode { get; }
  public string? BaseCountryISO { get; }
  public string? Location { get; }
  public DateOnly? BusinessStart { get; }
  public decimal? ShareCapital { get; }
  public string? CompaniesHouseIdCode { get; }
  public string? InterGroupSignature { get; }
  public string? AdditionalGovIdCode { get; }
  public string? BankingId1 { get; }
  public string? BankingId2 { get; }
}
