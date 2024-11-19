using Ardalis.Result;
using RealGimm.Core.Docs.Events;
using RealGimm.Core.IAM;
using RealGimm.SharedKernel.Interfaces;
using Rebus.Bus;

namespace RealGimm.Web.Docs.Queries;

public class EstateDocumentQueries
{
  [BackOfficePermission(Features.DOCUMENTS_BASE, Permission.Read)]
  public async Task<Result> ExportPortfolioToZip(
    int estateId,
    string[] cmisIds,
    [Service] IBus bus,
    [Service] IUserDataProvider user)
  {
    var estatePortfolioExport = new EstatePortfolioExportEvent(user.Username, estateId, cmisIds)
    {
      CultureId = Thread.CurrentThread.CurrentUICulture.LCID
    };

    await bus.Publish(estatePortfolioExport);

    return Result.Success();
  }
}
