using RealGimm.Core.IAM.UserAggregate;

namespace RealGimm.Core.IAM.Services;

public sealed partial class UserExportService
{
  public record Data(User User, string?[] ManagementSubjectsNames);
}
