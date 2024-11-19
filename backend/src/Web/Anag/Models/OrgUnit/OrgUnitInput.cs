using RealGimm.Core.Common;

namespace RealGimm.Web.Anag.Models.OrgUnit;

public abstract record OrgUnitInput(
  EntryStatus? EntryStatus,
  int? OrgUnitId,
  string? Name,
  string InternalCode,
  string? ExternalCode,
  int ParentSubjectId,
  int? ParentOrgUnitId,
  string? Notes,
  DateTime? ClosureDate,
  ICollection<ContactInput>? Contacts
);
