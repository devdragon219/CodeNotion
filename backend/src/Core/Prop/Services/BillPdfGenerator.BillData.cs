using RealGimm.Core.Asst.EstateAggregate;

namespace RealGimm.Core.Prop.Services;

public sealed partial class BillPdfGenerator
{
  private record BillData(
    bool IsActive,
    decimal TotalAmount,
    DateOnly Date,
    DateOnly? Until,
    Address EstateUnitAddress,
    string TransactorSubjectName,
    BillRowData[] Rows);
}
