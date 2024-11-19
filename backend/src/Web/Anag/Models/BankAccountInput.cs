using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Anag.Models;

public record BankAccountInput : IMaybeIdentifiable
{
  public int? Id { get; init; }
  public BankAccountType BankAccountType { get; init; }
  public BankAccountCodeType ReferenceCodeType { get; init; }
  public string? ReferenceCode { get; init; }
  public string? AccountHolder { get; init; }
  public string? Notes { get; init; }
}
