using RealGimm.Core.IAM.UserAggregate;

namespace RealGimm.Web.Admin.Models;

public record AdminUserInput(
  string? FirstName,
  string? LastName,
  string UserName,
  UserType Type,
  OfficeAccess OfficeAccess,
  int? SupplierSubjectId,
  UserStatus Status,
  DateTime? CeasedDate,
  DateTime? LockedSince,
  DateTime? EnabledSince,
  string? SuspensionReason,
  int[]? Groups,
  int[]? ManagementSubjects,
  int[]? ManagementOrgUnits,
  AdminContactInput[]? Contacts,
  string? NewPassword,
  string? PasswordConfirmation);
