using RealGimm.Core.Prop.BillAggregate;
using RealGimm.Core.Asst.EstateAggregate;

namespace RealGimm.Core.Prop.Services;

public partial class BillExportService<TSelf>
{
  public record Data(
    Bill Bill,
    string? ManagementSubjectName,
    string? CountepartSubjectName,
    string? TransactorSubjectName,
    (string InternalCode, Address Address)? EstateUnit);
}
