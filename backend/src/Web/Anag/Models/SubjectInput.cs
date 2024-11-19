using RealGimm.Core.Common;

namespace RealGimm.Web.Anag.Models;

public abstract record SubjectInput
{
  public int? Id { get; set; }
  public EntryStatus EntryStatus { get; set; }
  public string InternalCode { get; set; } = default!;
  public string? ExternalSourceCode { get; set; }
  public int? CustomPersonType { get; set; }
  public int? CustomSubjectStatus { get; set; }
  public DateOnly? ClosureDate { get; set; }
  public AddressInput[] Addresses { get; set; } = [];
  public ContactInput[] Contacts { get; set; } = [];
  public BankAccountInput[] BankAccounts { get; set; } = [];
  public TaxStatusInput[] TaxStatuses { get; set; } = [];
  public OfficerInput[] Officers { get; set; } = [];
  public int[] CategoriesIds { get; set; } = [];
}
