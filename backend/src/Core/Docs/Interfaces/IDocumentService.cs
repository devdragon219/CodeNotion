using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Models;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Docs.Interfaces;

public interface IDocumentService
{
  public Task<IEnumerable<DocumentRow>> GetAllDocumentAsync(CancellationToken cancellationToken);

  public Task<IEnumerable<SubjectDocumentsOutput>> GetSubjectDocumentsAsync(
    Func<IEnumerable<SubjectDocumentsFlatOutput>, IEnumerable<SubjectDocumentsFlatOutput>> filter,
    Func<IEnumerable<SubjectDocumentsOutput>, IEnumerable<SubjectDocumentsOutput>> sort,
    CancellationToken cancellationToken);

  public Task<IEnumerable<EstateDocumentsOutput>> GetEstateDocumentsAsync(
    Func<IEnumerable<EstateDocumentsFlatOutput>, IEnumerable<EstateDocumentsFlatOutput>> filter,
    Func<IEnumerable<EstateDocumentsOutput>, IEnumerable<EstateDocumentsOutput>> sort,
    CancellationToken cancellationToken);

  public Task<IEnumerable<TicketDocumentsOutput>> GetTicketDocumentsAsync(
    Func<IEnumerable<TicketDocumentsFlatOutput>, IEnumerable<TicketDocumentsFlatOutput>> filter,
    Func<IEnumerable<TicketDocumentsOutput>, IEnumerable<TicketDocumentsOutput>> sort,
    CancellationToken cancellationToken);

  public Task<IEnumerable<EstateUnitDocumentsOutput>> GetEstateUnitDocumentsAsync(
    Func<IEnumerable<EstateUnitDocumentsFlatOutput>, IEnumerable<EstateUnitDocumentsFlatOutput>> filter,
    Func<IEnumerable<EstateUnitDocumentsOutput>, IEnumerable<EstateUnitDocumentsOutput>> sort,
    CancellationToken cancellationToken);

  public Task<IEnumerable<FcltContractDocumentsOutput>> GetFcltContractDocumentsAsync(
    Func<IEnumerable<FcltContractDocumentsFlatOutput>, IEnumerable<FcltContractDocumentsFlatOutput>> filter,
    Func<IEnumerable<FcltContractDocumentsOutput>, IEnumerable<FcltContractDocumentsOutput>> sort,
    CancellationToken cancellationToken);

  public Task<IEnumerable<CatalogueDocumentsOutput>> GetCatalogueDocumentsAsync(
    Func<IEnumerable<CatalogueDocumentsFlatOutput>, IEnumerable<CatalogueDocumentsFlatOutput>> filter,
    Func<IEnumerable<CatalogueDocumentsOutput>, IEnumerable<CatalogueDocumentsOutput>> sort,
    CancellationToken cancellationToken);

  public Task<IEnumerable<CatalogueDocumentsCategoryOutput>> GetCatalogueDocumentsGroupedByCategoryAsync(
    Func<IEnumerable<CatalogueDocumentsFlatOutput>, IEnumerable<CatalogueDocumentsFlatOutput>> filter,
    Func<IEnumerable<CatalogueDocumentsCategoryOutput>, IEnumerable<CatalogueDocumentsCategoryOutput>> sort,
    CancellationToken cancellationToken);
    
  public Task<IEnumerable<CatalogueDocumentsPerContentCategoryGroupOutput>> GetCatalogueDocumentsGroupedByContentCategoryGroupAsync(
    Func<IEnumerable<CatalogueDocumentsFlatOutput>, IEnumerable<CatalogueDocumentsFlatOutput>> filter,
    Func<IEnumerable<CatalogueDocumentsPerContentCategoryGroupOutput>, IEnumerable<CatalogueDocumentsPerContentCategoryGroupOutput>> sort,
    CancellationToken cancellationToken);

  public Task<IEnumerable<ContractDocumentsOutput>> GetContractDocumentsAsync(
    Func<IEnumerable<ContractDocumentsFlatOutput>, IEnumerable<ContractDocumentsFlatOutput>> filter,
    Func<IEnumerable<ContractDocumentsOutput>, IEnumerable<ContractDocumentsOutput>> sort,
    CancellationToken cancellationToken);

  public Task<(IQueryable<T> Entities, IEnumerable<Document> Documents)> GetAccessibleDocumentsAsync<T>(IRepository<T> repository)
    where T : EntityBase, IAggregateRoot;

  public IEnumerable<DocumentsPerContentCategoryGroupOutput> GroupDocumentsByContentCategoryGroup(IEnumerable<Document> documents);
}
