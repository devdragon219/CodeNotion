using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core;
using RealGimm.Core.IAM;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;
using RealGimm.Core.Prop.RegistryCommunicationAggregate.Specifications;
using RealGimm.Web.Prop.Queries.Filters;
using RealGimm.Web.Prop.Queries.Sorting;
using RealGimm.WebCommons.Models;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.SharedKernel;
using System.Xml.Linq;
using RealGimm.Core.Prop.Services;
using Microsoft.Extensions.Localization;
using HotChocolate.Resolvers;
using System.IO.Compression;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Extensions;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.Anag.SubjectAggregate.Specifications;
using RealGimm.Web.Prop.Models;

namespace RealGimm.Web.Prop.Queries;

public class RegistryCommunicationQueries : QueriesBase
{
  [BackOfficePermission(Features.PROP_REGISTRY_COMMUNICATION, Permission.Read)]
  public Task<RegistryCommunicationGroup?> GetGroup(
    RegistryCommunicationGroupId id,
    [Service] RegistryCommunicationService service,
    CancellationToken cancellationToken = default)
    => service.GetGroupAsync(id, cancellationToken);
  
  [BackOfficePermission(Features.PROP_REGISTRY_COMMUNICATION, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(RegistryCommunicationGroupFilterType))]
  [UseSorting(typeof(RegistryCommunicationGroupSortInputType))]
  public Task<IQueryable<RegistryCommunicationGroup>> ListRegistryCommunicationGroups(
    bool isConfirmed,
    [Service] RegistryCommunicationService service,
    [SchemaService] IResolverContext resolverContext)
    => service.QueryGroups(isConfirmed).MaterializeIfRequiredAsync(resolverContext);

  [BackOfficePermission(Features.PROP_REGISTRY_COMMUNICATION, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(RegistryCommunicationFilterType))]
  [UseSorting(typeof(RegistryCommunicationSortInputType))]
  public Task<IQueryable<RegistryCommunication>> ListRegistryCommunications(
    RegistryCommunicationGroupId groupId,
    [Service] IRepository<RegistryCommunication> repository,
    [SchemaService] IResolverContext resolverContext)
    => repository
        .AsQueryable(
          groupId.IsConfirmed
            ? new ConfirmedRegistryCommunicationByGroupIdSpec(groupId.AsConfirmedGroupId())
            : new TemporaryRegistryCommunicationByGroupIdSpec(groupId.AsTemporaryGroupId()),
          new RegistryCommunicationIncludeForListSpec())
        .MaterializeIfRequiredAsync(resolverContext);

  [BackOfficePermission(Features.PROP_REGISTRY_COMMUNICATION, Permission.Read)]
  public async Task<IEnumerable<ISubject>> ListManagementSubjects(
    [Service] IRepository<RegistryCommunication> registryCommunicationRepository,
    [Service] IRepository<Subject> subjectRepository)
  {
    var subjectIds = await registryCommunicationRepository
      .AsQueryable(new TemporaryRegistryCommunicationSpec())
      .GroupBy(communication => communication.Contract!.ManagementSubjectId)
      .Select(communication => communication.Key)
      .ToListAsync();

    var subjects = await subjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(subjectIds), new SubjectIncludeForRegistryCommunicationConfirmationSpec())
      .OrderBy(subject => subject.Name)
      .ToListAsync();

    return subjects;
  }

  [BackOfficePermission(Features.PROP_REGISTRY_COMMUNICATION, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(RegistryCommunicationAnomalyOutputFilterType))]
  [UseSorting(typeof(RegistryCommunicationAnomalyOutputSortInputType))]
  public async Task<IEnumerable<RegistryCommunicationAnomalyOutput>> ListAnomalies(
    RegistryCommunicationGroupId groupId,
    [Service] IRepository<RegistryCommunication> repository,
    CancellationToken cancellationToken)
    => await repository
        .AsQueryable(
          groupId.IsConfirmed
            ? new ConfirmedRegistryCommunicationByGroupIdSpec(groupId.AsConfirmedGroupId())
            : new TemporaryRegistryCommunicationByGroupIdSpec(groupId.AsTemporaryGroupId()))
        .SelectMany(communication => communication.Anomalies
          .Select(anomaly => new RegistryCommunicationAnomalyOutput(communication.Contract!.InternalCode, anomaly.Description)))
        .ToListAsync(cancellationToken);

  [BackOfficePermission(Features.PROP_REGISTRY_COMMUNICATION, Permission.Read)]
  public async Task<FileUrlOutput> ExportGroupXmlRli(
    ConfirmedRegistryCommunicationGroupId groupId,
    [Service] RegistryCommunicationService service,
    [Service] IXmlGenerator<ConfirmedRegistryCommunicationGroupIdWithOffice> xmlGenerator,
    [Service] IStringLocalizer<RegistryCommunicationXmlGenerator> localizer,
    [Service] IConfiguration configuration,
    [Service] IDistributedCache distributedCache,
    CancellationToken cancellationToken = default)
  {
    var groupIdsWithOffices = await service
      .QueryConfirmedGroupsIdsWithOffice(groupId)
      .ToListAsync(cancellationToken);

    var sharedCacheFilename = Guid.NewGuid().ToString();
    using var stream = File.OpenWrite(System.IO.Path.Combine(configuration.CachePath(), sharedCacheFilename));
    
    using (var archive = new ZipArchive(stream, ZipArchiveMode.Create))
    {
      foreach (var groupIdWithOffice in groupIdsWithOffices)
      {
        var xmlDocument = await xmlGenerator.GenerateXmlAsync(groupIdWithOffice, cancellationToken);
        
        var entryFileName = localizer["XmlFileName", groupIdWithOffice.OfficeExternalCode ?? "*"];    
        var entry = archive.CreateEntry(entryFileName);
    
        using var entryStream = entry.Open();
        await xmlDocument.SaveAsync(entryStream, SaveOptions.DisableFormatting, cancellationToken);
      }
    }
    
    var fileEntry = new FileCacheEntry(localizer["ZipFileName"], MimeTypes.XML, sharedCacheFilename);
    var fileId = Guid.NewGuid();
    var cacheEntryOptions = new DistributedCacheEntryOptions().SetAbsoluteExpiration(Constants.DEFAULT_EXPORT_DURATION_ZIP);
    
    distributedCache.Set(fileId.ToString(), fileEntry.ToByteArray(), cacheEntryOptions);
    
    return new FileUrlOutput($"{API_FILE_BASE}{fileId}");
  }

  [BackOfficePermission(Features.PROP_REGISTRY_COMMUNICATION, Permission.Read)]
  [UseFiltering(typeof(RegistryCommunicationGroupFilterType))]
  [UseSorting(typeof(RegistryCommunicationGroupSortInputType))]
  public async Task<FileUrlOutput> ExportGroupsToExcel(
    bool isConfirmed,
    [Service] RegistryCommunicationService service,
    [Service] ConfirmedRegistryCommunicationGroupExportService confirmedExportService,
    [Service] TemporaryRegistryCommunicationGroupExportService temporaryExportService,
    [Service] IDistributedCache distributedCache,
    [SchemaService] IResolverContext resolverContext,
    CancellationToken cancellationToken = default)
  {
    var query = await service.QueryGroups(isConfirmed).MaterializeIfRequiredAsync(resolverContext);

    var communications = await query
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToListAsync(cancellationToken);

    var exportService = isConfirmed ? confirmedExportService : (IExportService<RegistryCommunicationGroup>)temporaryExportService;

    return await ExportToExcelAsync(communications, distributedCache, exportService, cancellationToken);
  }
}
