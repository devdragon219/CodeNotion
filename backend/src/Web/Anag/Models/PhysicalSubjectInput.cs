using RealGimm.Core.Anag.SubjectAggregate;
namespace RealGimm.Web.Anag.Models;

public record PhysicalSubjectInput : SubjectInput
{
  public string? FirstName { get; set; }
  public string? LastName { get; set; }
  public int? CustomGender { get; set; }
  public BirthSex? BirthSex { get; set; }
  public DateOnly? BirthDate { get; set; }
  public AddressInput? BirthLocation { get; set; }
  public string? BirthCountryTaxIdCode { get; set; }
  public string? ProfessionalTaxIdCode { get; set; }
  public DateOnly? DeathDate { get; set; }
  public HeirInput[] Heirs { get; set; } = [];
  public int[] OwnerManagementSubjectIds { get; set; } = [];
}
