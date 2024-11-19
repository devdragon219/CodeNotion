using HotChocolate.Resolvers;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.Interfaces;
using RealGimm.Core.IAM;
using RealGimm.WebCommons.Models;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core;
using RealGimm.Web.Docs.Extensions;
using RealGimm.Core.Docs.DocumentAggregate.Models;

namespace RealGimm.Web.Docs.Queries;

public class DocumentQueries : QueriesBase
{
  [BackOfficePermission(Features.DOCUMENTS_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 20)]
  [UseFiltering]
  [UseSorting]
  public async Task<IEnumerable<DocumentRow>> GetAllDocuments(
    [SchemaService] IResolverContext resolverContext,
    [Service] IRepository<Document> documentRepository,
    [Service] IDocumentService documentService,
    CancellationToken cancellationToken)
  {
    var documents = await documentService.GetAllDocumentAsync(cancellationToken);
    return documents.FilterPatched(resolverContext, documentRepository).ToList();
  }

  [BackOfficePermission(Features.DOCUMENTS_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 20)]
  [UseFiltering<SubjectDocumentsFlatOutput>]
  [UseSorting]
  public Task<IEnumerable<SubjectDocumentsOutput>> GetSubjectDocuments(
    [SchemaService] IResolverContext resolverContext,
    [Service] IRepository<Document> documentRepository,
    [Service] IDocumentService documentService,
    CancellationToken cancellationToken)
    => documentService.GetSubjectDocumentsAsync(
        query => query.FilterPatched(resolverContext, documentRepository),
        query => query.Sort(resolverContext),
        cancellationToken);

  [BackOfficePermission(Features.DOCUMENTS_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 20)]
  [UseFiltering<EstateDocumentsFlatOutput>]
  [UseSorting]
  public Task<IEnumerable<EstateDocumentsOutput>> GetEstateDocuments(
    [SchemaService] IResolverContext resolverContext,
    [Service] IRepository<Document> documentRepository,
    [Service] IDocumentService documentService,
    CancellationToken cancellationToken)
    => documentService.GetEstateDocumentsAsync(
        query => query.FilterPatched(resolverContext, documentRepository),
        query => query.Sort(resolverContext),
        cancellationToken);

  [BackOfficePermission(Features.DOCUMENTS_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 20)]
  [UseFiltering<EstateUnitDocumentsFlatOutput>]
  [UseSorting]
  public Task<IEnumerable<EstateUnitDocumentsOutput>> GetEstateUnitDocuments(
    [SchemaService] IResolverContext resolverContext,
    [Service] IRepository<Document> documentRepository,
    [Service] IDocumentService documentService,
    CancellationToken cancellationToken)
    => documentService.GetEstateUnitDocumentsAsync(
        query => query.FilterPatched(resolverContext, documentRepository),
        query => query.Sort(resolverContext),
        cancellationToken);

  [BackOfficePermission(Features.DOCUMENTS_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 20)]
  [UseFiltering<TicketDocumentsFlatOutput>]
  [UseSorting]
  public Task<IEnumerable<TicketDocumentsOutput>> GetTicketDocuments(
    [SchemaService] IResolverContext resolverContext,
    [Service] IRepository<Document> documentRepository,
    [Service] IDocumentService documentService,
    CancellationToken cancellationToken)
    => documentService.GetTicketDocumentsAsync(
        query => query.FilterPatched(resolverContext, documentRepository),
        query => query.Sort(resolverContext),
        cancellationToken);

  [BackOfficePermission(Features.DOCUMENTS_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 20)]
  [UseFiltering<CatalogueDocumentsFlatOutput>]
  [UseSorting]
  public Task<IEnumerable<CatalogueDocumentsOutput>> GetCatalogueDocuments(
    [SchemaService] IResolverContext resolverContext,
    [Service] IRepository<Document> documentRepository,
    [Service] IDocumentService documentService,
    CancellationToken cancellationToken)
    => documentService.GetCatalogueDocumentsAsync(
        query => query.FilterPatched(resolverContext, documentRepository),
        query => query.Sort(resolverContext),
        cancellationToken);

  [BackOfficePermission(Features.DOCUMENTS_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 20)]
  [UseFiltering<ContractDocumentsFlatOutput>]
  [UseSorting]
  public Task<IEnumerable<ContractDocumentsOutput>> GetContractDocuments(
    [SchemaService] IResolverContext resolverContext,
    [Service] IRepository<Document> documentRepository,
    [Service] IDocumentService documentService,
    CancellationToken cancellationToken)
    => documentService.GetContractDocumentsAsync(
        query => query.FilterPatched(resolverContext, documentRepository),
        query => query.Sort(resolverContext),
        cancellationToken);

  [BackOfficePermission(Features.DOCUMENTS_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 20)]
  [UseFiltering<FcltContractDocumentsFlatOutput>]
  [UseSorting]
  public Task<IEnumerable<FcltContractDocumentsOutput>> GetFcltContractDocuments(
    [SchemaService] IResolverContext resolverContext,
    [Service] IRepository<Document> documentRepository,
    [Service] IDocumentService documentService,
    CancellationToken cancellationToken)
    => documentService.GetFcltContractDocumentsAsync(
        query => query.FilterPatched(resolverContext, documentRepository),
        query => query.Sort(resolverContext),
        cancellationToken);

  [BackOfficePermission(Features.DOCUMENTS_BASE, Permission.Read)]
  [UseFiltering<DocumentRow>]
  [UseSorting<DocumentRow>]
  public async Task<FileUrlOutput> ExportDocumentsToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IRepository<Document> documentRepository,
    [Service] IDocumentService documentService,
    [Service] IDistributedCache distributedCache,
    [Service] IExportService<DocumentRow> exportService,
    CancellationToken cancellationToken)
  {
    var outputs = (await documentService.GetAllDocumentAsync(cancellationToken))
      .FilterPatched(resolverContext, documentRepository)
      .Sort(resolverContext);

    return await ExportToExcelAsync(outputs, distributedCache, exportService, cancellationToken);
  }

  [BackOfficePermission(Features.DOCUMENTS_BASE, Permission.Read)]
  [UseFiltering<EstateDocumentsFlatOutput>]
  [UseSorting<EstateDocumentsOutput>]
  public async Task<FileUrlOutput> ExportEstateDocumentsToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IRepository<Document> documentRepository,
    [Service] IDocumentService documentService,
    [Service] IDistributedCache distributedCache,
    [Service] IExportService<EstateDocumentsFlatOutput> exportService,
    CancellationToken cancellationToken)
  {
    var outputs = await documentService.GetEstateDocumentsAsync(
      query => query.FilterPatched(resolverContext, documentRepository),
      query => query.Sort(resolverContext),
      cancellationToken);

    var flatOutputs = outputs
      .SelectMany(groupedByEstate => groupedByEstate.SubRows
        .SelectMany(groupedByContentCategoryGroup => groupedByContentCategoryGroup.SubRows
          .SelectMany(groupedByContentCategory => groupedByContentCategory.SubRows
            .Select(document => new EstateDocumentsFlatOutput
            {
              EstateInternalCode = groupedByEstate.EstateInternalCode,
              ContentCategoryGroup = groupedByContentCategoryGroup.ContentCategoryGroup,
              Document = document
            }))));

    return await ExportToExcelAsync(flatOutputs, distributedCache, exportService, cancellationToken);
  }

  [BackOfficePermission(Features.DOCUMENTS_BASE, Permission.Read)]
  [UseFiltering<EstateUnitDocumentsFlatOutput>]
  [UseSorting<EstateUnitDocumentsOutput>]
  public async Task<FileUrlOutput> ExportEstateUnitDocumentsToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IRepository<Document> documentRepository,
    [Service] IDocumentService documentService,
    [Service] IDistributedCache distributedCache,
    [Service] IExportService<EstateUnitDocumentsFlatOutput> exportService,
    CancellationToken cancellationToken)
  {
    var outputs = await documentService.GetEstateUnitDocumentsAsync(
      query => query.FilterPatched(resolverContext, documentRepository),
      query => query.Sort(resolverContext),
      cancellationToken);

    var flatOutput = outputs
      .SelectMany(groupedByEstate => groupedByEstate.SubRows
        .SelectMany(groupedByContentCategoryGroup => groupedByContentCategoryGroup.SubRows
          .SelectMany(groupedByContentCategory => groupedByContentCategory.SubRows
            .Select(document => new EstateUnitDocumentsFlatOutput
            {
              EstateUnitInternalCode = groupedByEstate.EstateUnitInternalCode,
              ContentCategoryGroup = groupedByContentCategoryGroup.ContentCategoryGroup,
              Document = document
            }))));

    return await ExportToExcelAsync(flatOutput, distributedCache, exportService, cancellationToken);
  }

  [BackOfficePermission(Features.DOCUMENTS_BASE, Permission.Read)]
  [UseFiltering<CatalogueDocumentsFlatOutput>]
  [UseSorting<CatalogueDocumentsOutput>]
  public async Task<FileUrlOutput> ExportCatalogueDocumentsToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IRepository<Document> documentRepository,
    [Service] IDocumentService documentService,
    [Service] IDistributedCache distributedCache,
    [Service] IExportService<CatalogueDocumentsFlatOutput> exportService,
    CancellationToken cancellationToken)
  {
    var outputs = await documentService.GetCatalogueDocumentsAsync(
      query => query.FilterPatched(resolverContext, documentRepository),
      query => query.Sort(resolverContext),
      cancellationToken);

    var flatOutputs = outputs
      .SelectMany(groupedByEstate => groupedByEstate.SubRows
        .SelectMany(groupedByCategory => groupedByCategory.SubRows
          .SelectMany(groupedBySubCategory => groupedBySubCategory.SubRows
            .SelectMany(groupedByDocumentType => groupedByDocumentType.SubRows
              .SelectMany(groupedByContentCategoryGroup => groupedByContentCategoryGroup.SubRows
                .SelectMany(groupedByContentCategory => groupedByContentCategory.SubRows
                  .Select(document => new CatalogueDocumentsFlatOutput
                  {
                    EstateInternalCode = groupedByEstate.EstateInternalCode,
                    CatalogueTypeName = groupedByDocumentType.CatalogueTypeName,
                    CategoryName = groupedByCategory.CategoryName,
                    SubCategoryName = groupedBySubCategory.SubCategoryName,
                    CatalogueItemInternalCode = document.CatalogueItemInternalCode,
                    EstateId = document.EstateId,
                    CatalogueTypeId = document.CatalogueTypeId,
                    ContentCategoryGroup = groupedByContentCategoryGroup.ContentCategoryGroup,
                    Document = document.Document
                  })))))));

    return await ExportToExcelAsync(flatOutputs, distributedCache, exportService, cancellationToken);
  }

  [BackOfficePermission(Features.DOCUMENTS_BASE, Permission.Read)]
  [UseFiltering<SubjectDocumentsFlatOutput>]
  [UseSorting<SubjectDocumentsOutput>]
  public async Task<FileUrlOutput> ExportSubjectDocumentsToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IRepository<Document> documentRepository,
    [Service] IDocumentService documentService,
    [Service] IDistributedCache distributedCache,
    [Service] IExportService<SubjectDocumentsFlatOutput> exportService,
    CancellationToken cancellationToken)
  {
    var outputs = await documentService.GetSubjectDocumentsAsync(
      query => query.FilterPatched(resolverContext, documentRepository),
      query => query.Sort(resolverContext),
      cancellationToken);

    var flatOutputs = outputs
      .SelectMany(groupedBySubject => groupedBySubject.SubRows
        .Select(document => new SubjectDocumentsFlatOutput
        {
          SubjectName = groupedBySubject.SubjectName,
          SubjectInternalCode = groupedBySubject.SubjectInternalCode,
          Document = document
        }));

    return await ExportToExcelAsync(flatOutputs, distributedCache, exportService, cancellationToken);
  }

  [BackOfficePermission(Features.DOCUMENTS_BASE, Permission.Read)]
  [UseFiltering<TicketDocumentsFlatOutput>]
  [UseSorting<TicketDocumentsOutput>]
  public async Task<FileUrlOutput> ExportTicketDocumentsToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IRepository<Document> documentRepository,
    [Service] IDocumentService documentService,
    [Service] IDistributedCache distributedCache,
    [Service] IExportService<TicketDocumentsFlatOutput> exportService,
    CancellationToken cancellationToken)
  {
    var outputs = await documentService.GetTicketDocumentsAsync(
      query => query.FilterPatched(resolverContext, documentRepository),
      query => query.Sort(resolverContext),
      cancellationToken);

    var flatOutputs = outputs
      .SelectMany(groupedByTicket => groupedByTicket.SubRows
        .Select(document => new TicketDocumentsFlatOutput
        {
          IsTicketExcludedFromMaintenanceContract = groupedByTicket.IsTicketExcludedFromMaintenanceContract,
          TicketInternalCode = groupedByTicket.TicketInternalCode,
          Document = document
        }));

    return await ExportToExcelAsync(flatOutputs, distributedCache, exportService, cancellationToken);
  }

  [BackOfficePermission(Features.DOCUMENTS_BASE, Permission.Read)]
  [UseFiltering<ContractDocumentsFlatOutput>]
  [UseSorting<ContractDocumentsOutput>]
  public async Task<FileUrlOutput> ExportContractDocumentsToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IRepository<Document> documentRepository,
    [Service] IDocumentService documentService,
    [Service] IDistributedCache distributedCache,
    [Service] IExportService<ContractDocumentsFlatOutput> exportService,
    CancellationToken cancellationToken)
  {
    var outputs = await documentService.GetContractDocumentsAsync(
      query => query.FilterPatched(resolverContext, documentRepository),
      query => query.Sort(resolverContext),
      cancellationToken);

    var flatOutput = outputs
      .SelectMany(groupedByContract => groupedByContract.SubRows
        .SelectMany(groupedByContentCategoryGroup => groupedByContentCategoryGroup.SubRows
          .SelectMany(groupedByContentCategory => groupedByContentCategory.SubRows
            .Select(flat => new ContractDocumentsFlatOutput
            {
              ContractInternalCode = groupedByContract.ContractInternalCode,
              ContentCategoryGroup = groupedByContentCategoryGroup.ContentCategoryGroup,
              Document = flat.Document
            }))));

    return await ExportToExcelAsync(flatOutput, distributedCache, exportService, cancellationToken);
  }


  [BackOfficePermission(Features.DOCUMENTS_BASE, Permission.Read)]
  [UseFiltering<FcltContractDocumentsFlatOutput>]
  [UseSorting<FcltContractDocumentsOutput>]
  public async Task<FileUrlOutput> ExportFcltContractDocumentsToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IRepository<Document> documentRepository,
    [Service] IDocumentService documentService,
    [Service] IDistributedCache distributedCache,
    [Service] IExportService<FcltContractDocumentsFlatOutput> exportService,
    CancellationToken cancellationToken)
  {
    var outputs = await documentService.GetFcltContractDocumentsAsync(
      query => query.FilterPatched(resolverContext, documentRepository),
      query => query.Sort(resolverContext),
      cancellationToken);

    var flatOutput = outputs
      .SelectMany(groupedByContract => groupedByContract.SubRows
        .SelectMany(groupedByContentCategoryGroup => groupedByContentCategoryGroup.SubRows
          .SelectMany(groupedByContentCategory => groupedByContentCategory.SubRows
            .Select(document => new FcltContractDocumentsFlatOutput
            {
              FcltContractInternalCode = groupedByContract.FcltContractInternalCode,
              ContentCategoryGroup = groupedByContentCategoryGroup.ContentCategoryGroup,
              Document = document
            }))));

    return await ExportToExcelAsync(flatOutput, distributedCache, exportService, cancellationToken);
  }
}
