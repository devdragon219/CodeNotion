using System.Collections.Generic;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;

namespace RealGimm.Core.IAM.UserAggregate;
public record UserDetail(
  int Id,
  string? FirstName,
  string? LastName,
  string? UserName,
  UserStatus Status,
  UserType Type,
  DateTime? CeasedDate,
  DateTime? LockedSince,
  DateTime? EnabledSince,
  string? SuspensionReason,
  IReadOnlyList<Contact>? Contacts,
  IReadOnlyList<OrgUnit>? OrgUnits,
  IReadOnlyList<ManagementSubject>? ManagementSubjects,
  IReadOnlyCollection<GroupAggregate.Group>? Groups
);

