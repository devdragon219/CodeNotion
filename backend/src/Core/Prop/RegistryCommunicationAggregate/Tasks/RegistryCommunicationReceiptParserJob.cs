using System.ComponentModel;
using HotChocolate.Utilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Quartz;
using RealGimm.Core.Mtnt.TenantAggregate;
using RealGimm.Core.Prop.Services;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Prop.RegistryCommunicationAggregate.Tasks;

[DisallowConcurrentExecution]
[EndlessJob]
[Description("Parse and import receipts from Registry Communication")]
public sealed class RegistryCommunicationReceiptParserJob : ParallelAnyTenantJob
{
  private readonly ILogger<RegistryCommunicationReceiptParserJob> _logger;
  private readonly IConfiguration _config;

  public RegistryCommunicationReceiptParserJob(
    IReadRepository<Tenant> tenantsRepository,
    IServiceProvider serviceProvider,
    ILogger<RegistryCommunicationReceiptParserJob> logger,
    IConfiguration config)
    : base(tenantsRepository, serviceProvider)
  {
    _logger = logger;
    _config = config;
  }

  public override async Task ExecuteTenant(IJobExecutionContext context, IServiceProvider scopedProvider, Guid tenantId)
  {
    var communicationRepository = scopedProvider.GetRequiredService<IRepository<RegistryCommunication>>();

    var baseDirectoryPath = Path.Combine(_config.FilesPath(), tenantId.ToString(), "rli-receipts");
    var pendingDirectoryPath = Path.Combine(baseDirectoryPath, "pending");
    var processedDirectoryPath = Path.Combine(baseDirectoryPath, "processed");
    
    // ensure directories exist
    Directory.CreateDirectory(pendingDirectoryPath);
    Directory.CreateDirectory(processedDirectoryPath);

    var waitingForCloseFilePaths = new List<string>();

    var pendingDirectoryWatcher = new FileSystemWatcher(pendingDirectoryPath);
    pendingDirectoryWatcher.EnableRaisingEvents = true;

    pendingDirectoryWatcher.Created += (_, args) =>
    {
      if (File.Exists(Path.Combine(processedDirectoryPath, args.Name!)))
      {
        _logger.LogError("Duplicate RLI receipt '{fileName}' is detected for tenant {tenantId}", args.Name, tenantId);
        return;
      }

      _logger.LogInformation("New pending RLI receipt '{fileName}' is detected for tenant {tenantId}", args.Name, tenantId);

      try
      {
        // This call should be awaited in order to avoid updating multiple contracts in parallel which can cause exceptions.
        // The 'await' keywod will not help here, because an event is a void method (it will not be awaited, just run on the bg)
        ProcessReceiptAsync(args.FullPath, processedDirectoryPath, communicationRepository).GetAwaiter().GetResult();
      }
      catch (IOException)
      {
        waitingForCloseFilePaths.Add(args.FullPath);
        return;
      }
      catch (Exception exception)
      {
        _logger.LogError(exception, "Error while processing RLI receipt '{fileName}' for tenant {tenantId}", args.Name, tenantId);
        return;
      }

      _logger.LogInformation("RLI receipt '{fileName}' is successfully processed for tenant {tenantId}", args.Name, tenantId);
    };

    pendingDirectoryWatcher.Changed += (_, args) =>
    {
      if (!waitingForCloseFilePaths.Contains(args.FullPath))
      {
        return;
      }

      try
      {
        // This call should be awaited in order to avoid updating multiple contracts in parallel which can cause exceptions.
        // The 'await' keywod will not help here, because an event is a void method (it will not be awaited, just run on the bg)
        ProcessReceiptAsync(args.FullPath, processedDirectoryPath, communicationRepository).GetAwaiter().GetResult();
      }
      catch (IOException)
      {
        // still waiting for close
        return;
      }
      catch (Exception exception)
      {
        _logger.LogError(exception, "Error while processing RLI receipt '{fileName}' for tenant {tenantId}", args.Name, tenantId);
        waitingForCloseFilePaths.Remove(args.FullPath);

        return;
      }

      waitingForCloseFilePaths.Remove(args.FullPath);
      _logger.LogInformation("RLI receipt '{fileName}' is successfully processed for tenant {tenantId}", args.Name, tenantId);
    };

    // endless loop
    while (true)
    {
      await Task.Delay(1000);
    }
  }

  private static async Task ProcessReceiptAsync(
    string fullName,
    string processedDirectoryPath,
    IRepository<RegistryCommunication> communicationRepository)
  {
    var fileName = Path.GetFileName(fullName);
    var isSuccessfull = RegistryCommunicationReceiptParser.DetectIsSuccessfull(fileName);
    var (requestCode, receipt) = RegistryCommunicationReceiptParser.Parse(File.ReadAllText(fullName), isSuccessfull);
    
    var communication = await communicationRepository
      .AsQueryable()
      .Where(communication => communication.Receipt == null)
      .Where(communication => communication.Contract!.RegistrationTaxData!.RequestCode == requestCode)
      .Include(communication => communication.Contract)
      .SingleAsync();

    communication.SetReceipt(receipt);

    if (isSuccessfull && communication.Type is CommunicationType.Ita_RLI12_FirstRegistration)
    {
      var contractRegistrationTaxData = communication.Contract!.RegistrationTaxData!;
      contractRegistrationTaxData.SetContractRegistrationCode(receipt.ContractAssignedNumber);
      contractRegistrationTaxData.SetRegistrationNumber(receipt.RegistrationNumber);
      contractRegistrationTaxData.SetRegistrationSerialNumber(receipt.RegistrationSeries);
    }

    await communicationRepository.SaveChangesAsync();

    File.Move(fullName, Path.Combine(processedDirectoryPath, fileName));
  }
}
