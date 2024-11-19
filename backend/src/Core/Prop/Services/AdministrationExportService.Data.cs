using RealGimm.Core.Prop.AdministrationAggregate;
using Address = RealGimm.Core.Anag.SubjectAggregate.Address;

namespace RealGimm.Core.Prop.Services;

public sealed partial class AdministrationExportService
{
  public record Data(
    Administration Administration,
    string EstateInternalCode,
    (string Name, Address PrimaryAddress) AdministratorSubject,
    (string? ReferenceCode, string? AccountHolder)? BankAccount);
}
