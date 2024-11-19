namespace RealGimm.Core.IAM.GroupAggregate;

public record PermissionSummary(string Feature, bool CanCreate, bool CanRead, bool CanUpdate, bool CanDelete);
