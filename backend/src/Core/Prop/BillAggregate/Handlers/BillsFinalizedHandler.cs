using System.Globalization;
using System.Xml.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Common.ConfigAggregate;
using RealGimm.Core.Common.ConfigAggregate.Specifications;
using RealGimm.Core.EventSystem;
using RealGimm.Core.Prop.BillAggregate.Events;
using RealGimm.Core.Prop.BillAggregate.Specifications;
using RealGimm.Core.Prop.Services;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Prop.BillAggregate.Handlers;

[BackgroundEventHandler]
public class BillsFinalizedHandler : TenantMessageHandler<BillsFinalizedEvent>
{
  public required IRepository<Bill> Bills { protected get; init; }
  public required IRepository<Config> ConfigRepository { protected get; init; }
  public required IRepository<Subject> SubjectRepository { protected get; init; }
  public required ILogger<BillsFinalizedHandler> Logger { protected get; init; }
  public required IXmlGenerator<IEnumerable<Bill>> XmlGenerator { protected get; init; }
  public required IConfiguration Config { protected get; init; }

  protected override async Task HandlePerTenant(BillsFinalizedEvent message)
  {
    var passiveBills = await Bills
      .AsQueryable(new GetByIdsSpec<Bill>(message.BillsIds), new PassiveBillSpec(), new BillIncludeAllSpec())
      .ToListAsync();

    if (passiveBills.Count == 0)
    {
      return;
    }

    var shouldBeGroupedPerManagementSubject = await ConfigRepository
      .AsQueryable(
        new ConfigByFunctionNameSpec(
          ConfigFunction.SepaXmlExport,
          SepaXmlExportConfigurableModule.GroupingPerMainCounterpartSubjectParameter))
      .FirstOrDefaultAsync();

    var subjectsInternalCodes = await SubjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(passiveBills.Select(bill => bill.Contract!.ManagementSubjectId).Distinct()))
      .Select(subject => new { subject.Id, subject.Name })
      .ToDictionaryAsync(subject => subject.Id, subject => subject.Name);

    var groupedBills = (shouldBeGroupedPerManagementSubject?.Value).IsHumanTrue()
      ? passiveBills.GroupBy(bill => bill.Contract!.ManagementSubjectId)
      : passiveBills.GroupBy(bill => bill.Id);
    
    foreach (var billsGroup in groupedBills)
    {
      var directoryPath = Path.Combine(Config.FilesPath(), UserDataProvider.TenantId.ToString(), "bills");      
      if (!Directory.Exists(directoryPath))
      {
        Directory.CreateDirectory(directoryPath);
      }

      var timestamp = ((DateTimeOffset)billsGroup.First().FinalDate!.Value).ToUnixTimeMilliseconds();
      var fileName = $"{timestamp}.sepa.xml";

      try
      {
        var xml = await XmlGenerator.GenerateXmlAsync(billsGroup, CancellationToken.None);
        xml.Save(Path.Combine(directoryPath, fileName), SaveOptions.DisableFormatting);

        Logger.LogInformation("SEPA XML generated for bills {ids}", string.Join(", ", billsGroup.Select(bill => bill.Id)));
      }
      catch (Exception exception)
      {
        Logger.LogError(exception, "Error while generating SEPA XML for bills {ids}", string.Join(", ", billsGroup.Select(bill => bill.Id)));
      }
    }
  }
}
