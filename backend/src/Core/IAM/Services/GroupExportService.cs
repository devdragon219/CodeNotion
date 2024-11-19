using ClosedXML.Excel;
using RealGimm.Core.IAM.GroupAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.IAM.Services;

public sealed class GroupExportService : ExportService<Group, GroupExportService>
{
  protected override Dictionary<string, Func<Group, XLCellValue>> CreateExcelDataSelector()
    => new()
    {
      [nameof(Group.Name)] = group
        => group.Name,

      [nameof(Group.Description)] = group
        => group.Description
    };
}
