using RealGimm.Core.Common;

namespace RealGimm.Web.Anag.Models.OrgUnit;
public record ManagementOrgUnitInput(
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
) : OrgUnitInput(EntryStatus, OrgUnitId, Name, InternalCode, ExternalCode, ParentSubjectId, ParentOrgUnitId, Notes, ClosureDate, Contacts);
