using HotChocolate.Types;
using RealGimm.Core.Anag.SubjectCategoryAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Common;

namespace RealGimm.Core.Anag.SubjectAggregate;

[InterfaceType]
public interface ISubject
{
  public int Id { get; }
  public string Name { get; }
  public PersonType PersonType { get; }
  public string InternalCode { get; }
  public string? ExternalSourceCode { get; }
  public int? CustomPersonType { get; }
  public int? CustomSubjectStatus { get; }
  public DateTime CreationDate { get; }
  public DateTime? ClosureDate { get; }
  public DateTime? DeletionDate { get; }
  public EntryStatus EntryStatus { get; }

  public IReadOnlyList<Address> Addresses { get; }
  public IReadOnlyList<Contact> Contacts { get; }
  public IReadOnlyList<OrgUnit> OrgUnits { get; }
  public IReadOnlyList<BankAccount> BankAccounts { get; }
  public IReadOnlyList<SubjectCategory> Categories { get; }
  public IReadOnlyList<SubjectRelation> RelationMains { get; }
  public IReadOnlyList<SubjectRelation> RelationSubordinates { get; }
  public IReadOnlyList<TaxStatus> TaxStatuses { get; }
  public IReadOnlyList<SubjectRelation> Officers { get; }
  public IReadOnlyList<SubjectRelation> OwningMgmtSubjects { get; }
  public IReadOnlyList<SubjectRelation> SubOrganizations { get; }
  public IReadOnlyList<SubjectRelation> Heirs { get; }
}
