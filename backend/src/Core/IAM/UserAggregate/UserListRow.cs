using RealGimm.Core.Anag.SubjectAggregate;

namespace RealGimm.Core.IAM.UserAggregate;

public record UserListRow(
  int Id, 
  string? FirstName, 
  string? LastName,
  string? Username,
  UserStatus Status,
  UserType Type,
  IReadOnlyList<Subject>? ManagementSubjects,
  IReadOnlyCollection<GroupAggregate.Group>? Groups
);

