using RealGimm.Core.Asst.EstateUsageTypeAggregate;

namespace RealGimm.Core.Asst.EstateAggregate;

public record EstateLightDto
{
  public required int Id { get; set; }
  public required int ManagementSubjectId { get; set; }
  public required string InternalCode { get; set; }
  public required string? Name { get; set; }
  public required string? ManagementSubjectName { get; set; }
  public required EstateStatus Status { get; set; }
  public required EstateType Type { get; set; }
  public required EstateUsageType UsageType { get; set; }
  public required IEnumerable<Address> Addresses { get; set; }
}
