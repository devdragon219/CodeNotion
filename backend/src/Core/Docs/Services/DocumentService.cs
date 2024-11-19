using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Models;
using RealGimm.Core.Docs.DocumentAggregate.Specifications;
using RealGimm.Core.Docs.Interfaces;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;
using FcltContract = RealGimm.Core.Fclt.ContractAggregate.Contract;

namespace RealGimm.Core.Docs.Services;

public class DocumentService : IDocumentService
{
  private readonly IReadRepository<Document> _documentRepository;
  private readonly IRepository<Subject> _subjectRepository;
  private readonly IRepository<Estate> _estateRepository;
  private readonly IRepository<EstateUnit> _estateUnitRepository;
  private readonly IRepository<CatalogueItem> _catalogueItemRepository;
  private readonly IRepository<Contract> _contractRepository;
  private readonly IRepository<CatalogueType> _catalogueTypeRepository;
  private readonly IRepository<Ticket> _ticketRepository;
  private readonly IRepository<FcltContract> _fcltContractRepository;

  public DocumentService(
    IReadRepository<Document> documentRepository,
    IRepository<Subject> subjectRepository,
    IRepository<Estate> estateRepository,
    IRepository<EstateUnit> estateUnitRepository,
    IRepository<CatalogueItem> catalogueItemRepository,
    IRepository<Contract> contractRepository,
    IRepository<CatalogueType> catalogueTypeRepository,
    IRepository<Ticket> ticketrepository,
    IRepository<FcltContract> fcltContractRepository)
  {
    _documentRepository = documentRepository;
    _subjectRepository = subjectRepository;
    _estateRepository = estateRepository;
    _estateUnitRepository = estateUnitRepository;
    _catalogueItemRepository = catalogueItemRepository;
    _contractRepository = contractRepository;
    _catalogueTypeRepository = catalogueTypeRepository;
    _ticketRepository = ticketrepository;
    _fcltContractRepository = fcltContractRepository;
  }

  public async Task<IEnumerable<DocumentRow>> GetAllDocumentAsync(CancellationToken cancellationToken)
  {
    // estates
    var (estateQuery, estateDocuments) = await GetAccessibleDocumentsAsync(_estateRepository);

    // excluding images from estate documents
    estateDocuments = estateDocuments.Where(document => document.ContentType != ContentType.Image);

    var estates = await estateQuery
      .Select(estate => new { estate.Id, estate.InternalCode })
      .ToListAsync(cancellationToken);

    var estateRows = estates.SelectMany(estate => estateDocuments
      .Where(document => document.EntityIntId == estate.Id)
      .Select(document => new DocumentRow
      {
        Document = document,
        EstateId = estate.Id,
        EstateInternalCode = estate.InternalCode
      }));

    // estate units
    var (estateUnitQuery, estateUnitDocuments) = await GetAccessibleDocumentsAsync(_estateUnitRepository);

    var estateUnits = await estateUnitQuery
      .Select(estateUnit => new
      {
        estateUnit.Id,
        estateUnit.InternalCode,
        EstateId = estateUnit.Estate.Id,
        EstateInternalCode = estateUnit.Estate.InternalCode
      })
      .ToListAsync(cancellationToken);

    var estateUnitRows = estateUnits.SelectMany(estateUnit => estateUnitDocuments
      .Where(document => document.EntityIntId == estateUnit.Id)
      .Select(document => new DocumentRow
      {
        Document = document,
        EstateId = estateUnit.EstateId,
        EstateInternalCode = estateUnit.EstateInternalCode,
        EstateUnitInternalCode = estateUnit.InternalCode
      }));

    // subjects
    var (subjectQuery, subjectDocuments) = await GetAccessibleDocumentsAsync(_subjectRepository);

    var subjects = await subjectQuery
      .Select(subject => new { subject.Id, subject.InternalCode })
      .ToListAsync(cancellationToken);

    var subjectRows = subjects.SelectMany(subject => subjectDocuments
      .Where(document => document.EntityIntId == subject.Id)
      .Select(document => new DocumentRow
      {
        Document = document,
        SubjectInternalCode = subject.InternalCode
      }));
      
    // catalogue items
    var (catalogueItemQuery, catalogueItemDocuments) = await GetAccessibleDocumentsAsync(_catalogueItemRepository);

    var catalogueItems = await catalogueItemQuery
      .Select(catalogueItem => new
      {
        catalogueItem.Id,
        catalogueItem.InternalCode,
        EstateId = catalogueItem.Estate.Id,
        EstateInternalCode = catalogueItem.Estate.InternalCode,
        TypeId = catalogueItem.CatalogueType.Id,
        Category = catalogueItem.CatalogueType.Category.Name,
        SubCategory = catalogueItem.CatalogueType.SubCategory!.Name
      })
      .ToListAsync(cancellationToken);

    var catalogueItemRows = catalogueItems.SelectMany(catalogueItem => catalogueItemDocuments
      .Where(document => document.EntityIntId == catalogueItem.Id)
      .Select(document => new DocumentRow
      {
        Document = document,
        EstateId = catalogueItem.EstateId,
        EstateInternalCode = catalogueItem.EstateInternalCode,
        CatalogueItemInternalCode = catalogueItem.InternalCode,
        CatalogueCategory = catalogueItem.Category,
        CatalogueSubCategory = catalogueItem.SubCategory,
        CatalogueTypeId = catalogueItem.TypeId
      }));

    // catalogue
    var (catalogueTypeQuery, catalogueDocuments) = await GetAccessibleDocumentsAsync(_catalogueTypeRepository);

    var catalogueTypes = await catalogueTypeQuery
      .Select(catalogueType => new
      {
        catalogueType.Id,
        catalogueType.InternalCode,
        Category = catalogueType.Category.Name,
        SubCategory = catalogueType.SubCategory!.Name
      })
      .ToListAsync(cancellationToken);

    var catalogueRows = catalogueTypes.SelectMany(catalogueType => catalogueDocuments
      .Where(document => document.EntityIntId == catalogueType.Id)
      .Select(document => new DocumentRow
      {
        Document = document,
        EstateId = int.Parse(document.EstateId!),
        CatalogueCategory = catalogueType.Category,
        CatalogueSubCategory = catalogueType.SubCategory,
        CatalogueTypeId = catalogueType.Id,
        CatalogueTypeInternalCode = catalogueType.InternalCode
      }));

    var catalogueEstatesInternalCodes = _estateRepository
      .AsQueryable()
      .Where(estate => catalogueRows.Select(row => row.EstateId).Contains(estate.Id))
      .Select(estate => new { estate.Id, estate.InternalCode })
      .ToDictionary(estate => estate.Id, estate => estate.InternalCode);

    catalogueRows = catalogueRows.Select(row => row with { EstateInternalCode = catalogueEstatesInternalCodes[row.EstateId!.Value] });

    // contracts
    var (contractQuery, contractDocuments) = await GetAccessibleDocumentsAsync(_contractRepository);

    var contracts = await contractQuery
      .Select(contract => new
      {
        contract.Id,
        contract.InternalCode,
        contract.Type.IsActive,
        IsSublocated = contract.SublocatedContract != null
      })
      .ToListAsync(cancellationToken);

    var contractRows = contracts.SelectMany(contract => contractDocuments
      .Where(document => document.EntityIntId == contract.Id)
      .Select(document => new DocumentRow
      {
        Document = document,
        ContractInternalCode = contract.InternalCode,
        IsContractActive = contract.IsActive,
        IsContractSublocated = contract.IsSublocated
      }));

    // estate units
    var (ticketQuery, ticketDocuments) = await GetAccessibleDocumentsAsync(_ticketRepository);

    // excluding images from ticket documents
    ticketDocuments = ticketDocuments.Where(document => document.ContentType != ContentType.Image);

    var tickets = await ticketQuery
      .Select(ticket => new
      {
        ticket.Id,
        ticket.InternalCode,
        ticket.LocationEstateUnitId,
        ticket.IsExcludedFromMaintenanceContract
      })
      .ToListAsync(cancellationToken);

    var ticketEstateUnits = await _estateUnitRepository
      .AsQueryable(new EntityNonDeletedSpec<EstateUnit>())
      .Where(estateUnit => tickets.Select(ticket => ticket.LocationEstateUnitId).Contains(estateUnit.Id))
      .Select(estateUnit => new
      {
        estateUnit.Id,
        estateUnit.InternalCode,
        Estate = new
        {
          estateUnit.Estate.InternalCode
        }
      })
      .ToDictionaryAsync(estateUnit => estateUnit.Id, cancellationToken);

    var ticketRows = tickets.SelectMany(ticket => ticketDocuments
      .Where(document => document.EntityIntId == ticket.Id)
      .Select(document => new DocumentRow
      {
        Document = document,
        TicketId = ticket.Id,
        TicketInternalCode = ticket.InternalCode,
        IsTicketExcludedFromMaintenanceContract = ticket.IsExcludedFromMaintenanceContract,
        EstateUnitInternalCode = ticketEstateUnits[ticket.LocationEstateUnitId].InternalCode,
        EstateInternalCode = ticketEstateUnits[ticket.LocationEstateUnitId].Estate.InternalCode
      }));

    // fclt contracts
    var (fcltContractQuery, fcltContractDocuments) = await GetAccessibleDocumentsAsync(_fcltContractRepository);

    var fcltContracts = await fcltContractQuery
      .Select(fcltContract => new
      {
        fcltContract.Id,
        fcltContract.InternalCode
      })
      .ToListAsync(cancellationToken);

    var fcltContractRows = fcltContracts.SelectMany(fcltContract => fcltContractDocuments
      .Where(document => document.EntityIntId == fcltContract.Id)
      .Select(document => new DocumentRow
      {
        Document = document,
        FcltContractInternalCode = fcltContract.InternalCode
      }));

    return estateRows
      .Concat(estateUnitRows)
      .Concat(subjectRows)
      .Concat(catalogueItemRows)
      .Concat(catalogueRows)
      .Concat(contractRows)
      .Concat(ticketRows)
      .Concat(fcltContractRows);
  }

  public async Task<IEnumerable<SubjectDocumentsOutput>> GetSubjectDocumentsAsync(
    Func<IEnumerable<SubjectDocumentsFlatOutput>, IEnumerable<SubjectDocumentsFlatOutput>> filter,
    Func<IEnumerable<SubjectDocumentsOutput>, IEnumerable<SubjectDocumentsOutput>> sort,
    CancellationToken cancellationToken)
  {
    var (query, documents) = await GetAccessibleDocumentsAsync(_subjectRepository);

    var subjects = await query
      .Select(subject => new
      {
        subject.Id,
        subject.Name,
        subject.InternalCode
      })
      .ToListAsync(cancellationToken);

    var flatOutputs = subjects
      .SelectMany(subject => documents
        .Where(document => document.EntityIntId == subject.Id)
        .Select(document => new SubjectDocumentsFlatOutput
        {
          SubjectId = subject.Id,
          SubjectName = subject.Name!,
          SubjectInternalCode = subject.InternalCode!,
          Document = document
        }));

    flatOutputs = filter(flatOutputs);

    var outputs = flatOutputs
      .GroupBy(flat => new { flat.SubjectId, flat.SubjectName, flat.SubjectInternalCode })
      .Select(groupedBySubject => new SubjectDocumentsOutput
      {
        SubjectName = groupedBySubject.Key.SubjectName,
        SubjectInternalCode = groupedBySubject.Key.SubjectInternalCode,
        SubRows = groupedBySubject.Select(flat => flat.Document)
      });

    outputs = sort(outputs);

    return outputs;
  }

  public async Task<IEnumerable<EstateDocumentsOutput>> GetEstateDocumentsAsync(
    Func<IEnumerable<EstateDocumentsFlatOutput>, IEnumerable<EstateDocumentsFlatOutput>> filter,
    Func<IEnumerable<EstateDocumentsOutput>, IEnumerable<EstateDocumentsOutput>> sort,
    CancellationToken cancellationToken)
  {
    var (query, documents) = await GetAccessibleDocumentsAsync(_estateRepository);

    // excliuding images
    documents = documents.Where(document => document.ContentType != ContentType.Image);

    var estates = await query
      .Select(estate => new
      {
        estate.Id,
        estate.InternalCode
      })
      .ToListAsync(cancellationToken);

    var flatOutputs = estates
      .SelectMany(estate => documents
        .Where(document => document.EntityIntId == estate.Id)
        .Select(document => new EstateDocumentsFlatOutput
        {
          EstateItemId = estate.Id,
          EstateInternalCode = estate.InternalCode,
          ContentCategoryGroup = document.ContentCategoryGroup,
          Document = document
        }));

    flatOutputs = filter(flatOutputs);

    var outputs = flatOutputs
      .GroupBy(flat => new { flat.EstateItemId, flat.EstateInternalCode })
      .Select(groupedByEstate => new EstateDocumentsOutput
      {
        EstateInternalCode = groupedByEstate.Key.EstateInternalCode,
        SubRows = groupedByEstate
          .GroupBy(flat => flat.ContentCategoryGroup)
          .Select(groupedByContentCategoryGroup => new DocumentsPerContentCategoryGroupOutput
          {
            ContentCategoryGroup = groupedByContentCategoryGroup.Key,
            SubRows = groupedByContentCategoryGroup
              .GroupBy(flat => flat.Document.ContentCategory)
              .Select(groupedByContentCategory => new DocumentsPerContentCategoryOutput
              {
                ContentCategory = groupedByContentCategory.Key,
                SubRows = groupedByContentCategory.Select(flat => flat.Document)
              })
          })
      });

    outputs = sort(outputs);

    return outputs;
  }

  public async Task<IEnumerable<TicketDocumentsOutput>> GetTicketDocumentsAsync(
    Func<IEnumerable<TicketDocumentsFlatOutput>, IEnumerable<TicketDocumentsFlatOutput>> filter,
    Func<IEnumerable<TicketDocumentsOutput>, IEnumerable<TicketDocumentsOutput>> sort,
    CancellationToken cancellationToken)
  {
    var (query, documents) = await GetAccessibleDocumentsAsync(_ticketRepository);

    // excliuding images
    documents = documents.Where(document => document.ContentType != ContentType.Image);

    var tickets = await query
      .Select(ticket => new
      {
        ticket.Id,
        ticket.InternalCode,
        ticket.IsExcludedFromMaintenanceContract
      })
      .ToListAsync(cancellationToken);

    var flatOutputs = tickets
      .SelectMany(ticket => documents
        .Where(document => document.EntityIntId == ticket.Id)
        .Select(document => new TicketDocumentsFlatOutput
        {
          TicketId = ticket.Id,
          TicketInternalCode = ticket.InternalCode,
          IsTicketExcludedFromMaintenanceContract = ticket.IsExcludedFromMaintenanceContract,
          Document = document
        }));

    flatOutputs = filter(flatOutputs);

    var outputs = flatOutputs
      .GroupBy(flat => new { flat.TicketId, flat.TicketInternalCode, flat.IsTicketExcludedFromMaintenanceContract })
      .Select(groupedByEstate => new TicketDocumentsOutput
      {
        TicketInternalCode = groupedByEstate.Key.TicketInternalCode,
        IsTicketExcludedFromMaintenanceContract = groupedByEstate.Key.IsTicketExcludedFromMaintenanceContract,
        SubRows = groupedByEstate.Select(flat => flat.Document)
      });

    outputs = sort(outputs);

    return outputs;
  }

  public async Task<IEnumerable<EstateUnitDocumentsOutput>> GetEstateUnitDocumentsAsync(
    Func<IEnumerable<EstateUnitDocumentsFlatOutput>, IEnumerable<EstateUnitDocumentsFlatOutput>> filter,
    Func<IEnumerable<EstateUnitDocumentsOutput>, IEnumerable<EstateUnitDocumentsOutput>> sort,
    CancellationToken cancellationToken)
  {
    var (query, documents) = await GetAccessibleDocumentsAsync(_estateUnitRepository);

    var estateUnits = await query
      .Select(estateUnit => new
      {
        estateUnit.Id,
        estateUnit.InternalCode
      })
      .ToListAsync(cancellationToken);

    var flatOutputs = estateUnits
      .SelectMany(estateUnit => documents
        .Where(document => document.EntityIntId == estateUnit.Id)
        .Select(document => new EstateUnitDocumentsFlatOutput
        {
          EstateUnitId = estateUnit.Id,
          EstateUnitInternalCode = estateUnit.InternalCode,
          ContentCategoryGroup = document.ContentCategoryGroup,
          Document = document
        }));

    flatOutputs = filter(flatOutputs);

    var outputs = flatOutputs
      .GroupBy(flat => new { flat.EstateUnitId, flat.EstateUnitInternalCode })
      .Select(groupedByEstateUnit => new EstateUnitDocumentsOutput
      {
        EstateUnitInternalCode = groupedByEstateUnit.Key.EstateUnitInternalCode,
        SubRows = groupedByEstateUnit
          .GroupBy(flat => flat.ContentCategoryGroup)
          .Select(groupedByContentCategoryGroup => new DocumentsPerContentCategoryGroupOutput
          {
            ContentCategoryGroup = groupedByContentCategoryGroup.Key,
            SubRows = groupedByContentCategoryGroup
              .GroupBy(flat => flat.Document.ContentCategory)
              .Select(groupedByContentCategory => new DocumentsPerContentCategoryOutput
              {
                ContentCategory = groupedByContentCategory.Key,
                SubRows = groupedByContentCategory.Select(flat => flat.Document)
              })
          })
      });

    outputs = sort(outputs);

    return outputs;
  }

  public async Task<IEnumerable<FcltContractDocumentsOutput>> GetFcltContractDocumentsAsync(
    Func<IEnumerable<FcltContractDocumentsFlatOutput>, IEnumerable<FcltContractDocumentsFlatOutput>> filter,
    Func<IEnumerable<FcltContractDocumentsOutput>, IEnumerable<FcltContractDocumentsOutput>> sort,
    CancellationToken cancellationToken)
  {
    var (query, documents) = await GetAccessibleDocumentsAsync(_fcltContractRepository);

    var contracts = await query
      .Select(contract => new
      {
        contract.Id,
        contract.InternalCode
      })
      .ToListAsync(cancellationToken);

    var flatOutputs = contracts
      .SelectMany(contract => documents
        .Where(document => document.EntityIntId == contract.Id)
        .Select(document => new FcltContractDocumentsFlatOutput
        {
          FcltContractId = contract.Id,
          FcltContractInternalCode = contract.InternalCode,
          ContentCategoryGroup = document.ContentCategoryGroup,
          Document = document
        }));

    flatOutputs = filter(flatOutputs);

    var outputs = flatOutputs
      .GroupBy(flat => new { flat.FcltContractId, flat.FcltContractInternalCode })
      .Select(groupedByEstateUnit => new FcltContractDocumentsOutput
      {
        FcltContractInternalCode = groupedByEstateUnit.Key.FcltContractInternalCode,
        SubRows = groupedByEstateUnit
          .GroupBy(flat => flat.ContentCategoryGroup)
          .Select(groupedByContentCategoryGroup => new DocumentsPerContentCategoryGroupOutput
          {
            ContentCategoryGroup = groupedByContentCategoryGroup.Key,
            SubRows = groupedByContentCategoryGroup
              .GroupBy(flat => flat.Document.ContentCategory)
              .Select(groupedByContentCategory => new DocumentsPerContentCategoryOutput
              {
                ContentCategory = groupedByContentCategory.Key,
                SubRows = groupedByContentCategory.Select(flat => flat.Document)
              })
          })
      });

    outputs = sort(outputs);

    return outputs;
  }

  public async Task<IEnumerable<ContractDocumentsOutput>> GetContractDocumentsAsync(
    Func<IEnumerable<ContractDocumentsFlatOutput>, IEnumerable<ContractDocumentsFlatOutput>> filter,
    Func<IEnumerable<ContractDocumentsOutput>, IEnumerable<ContractDocumentsOutput>> sort,
    CancellationToken cancellationToken)
  {
    var (query, documents) = await GetAccessibleDocumentsAsync(_contractRepository);

    var contracts = await query
      .Select(contract => new
      {
        contract.Id,
        contract.InternalCode,
        contract.Type.IsActive,
        IsSublocated = contract.SublocatedContract != null
      })
      .ToListAsync(cancellationToken);

    var flatOutputs = contracts
      .SelectMany(contract => documents
        .Where(document => document.EntityIntId == contract.Id)
        .Select(document => new ContractDocumentsFlatOutput
        {
          ContractId = contract.Id,
          IsContractActive = contract.IsActive,
          IsContractSublocated = contract.IsSublocated,
          ContractInternalCode = contract.InternalCode,
          ContentCategoryGroup = document.ContentCategoryGroup,
          Document = document
        }));

    flatOutputs = filter(flatOutputs);

    var outputs = flatOutputs
      .GroupBy(flat => new { flat.ContractId, flat.ContractInternalCode })
      .Select(groupedByContract => new ContractDocumentsOutput
      {
        ContractInternalCode = groupedByContract.Key.ContractInternalCode,
        SubRows = groupedByContract
          .GroupBy(flat => flat.ContentCategoryGroup)
          .Select(groupedByContentCategoryGroup => new ContractDocumentsPerContentCategoryGroupOutput
          {
            ContentCategoryGroup = groupedByContentCategoryGroup.Key,
            SubRows = groupedByContentCategoryGroup
              .GroupBy(flat => flat.Document.ContentCategory)
              .Select(groupedByContentCategory => new ContractDocumentsPerContentCategoryOutput
              {
                ContentCategory = groupedByContentCategory.Key,
                SubRows = groupedByContentCategory
                  .Select(flat => new ContractDocumentOutput
                  {
                    Document = flat.Document,
                    IsContractActive = flat.IsContractActive,
                    IsContractSublocated = flat.IsContractSublocated,
                    EntityId = flat.Document.EntityId,
                    EntityIntId = flat.Document.EntityIntId,
                    CmisId = flat.Document.CmisId,
                    Name = flat.Document.Name,
                    FileName = flat.Document.FileName,
                    Since = flat.Document.Since,
                    Until = flat.Document.Until,
                    ProtocolNumber = flat.Document.ProtocolNumber,
                    IssueDate = flat.Document.IssueDate,
                    Issuer = flat.Document.Issuer,
                    UploaderName = flat.Document.UploaderName,
                    CreationDate = flat.Document.CreationDate,
                    Notes = flat.Document.Notes
                  })
              })
          })
      });

    outputs = sort(outputs);

    return outputs;
  }

  public async Task<IEnumerable<CatalogueDocumentsOutput>> GetCatalogueDocumentsAsync(
    Func<IEnumerable<CatalogueDocumentsFlatOutput>, IEnumerable<CatalogueDocumentsFlatOutput>> filter,
    Func<IEnumerable<CatalogueDocumentsOutput>, IEnumerable<CatalogueDocumentsOutput>> sort,
    CancellationToken cancellationToken)
  {
    var flatOutputs = await GetFlatCatalogueDocumentsAsync(cancellationToken);

    flatOutputs = filter(flatOutputs);

    var outputs = flatOutputs
      .GroupBy(flat => new { flat.EstateId, flat.EstateInternalCode })
      .Select(groupedByEstate => new CatalogueDocumentsOutput
      {
        EstateInternalCode = groupedByEstate.Key.EstateInternalCode,
        SubRows = GroupCatalogueDocumentsByCategory(groupedByEstate)
      });

    outputs = sort(outputs);

    return outputs;
  }

  public async Task<IEnumerable<CatalogueDocumentsCategoryOutput>> GetCatalogueDocumentsGroupedByCategoryAsync(
    Func<IEnumerable<CatalogueDocumentsFlatOutput>, IEnumerable<CatalogueDocumentsFlatOutput>> filter,
    Func<IEnumerable<CatalogueDocumentsCategoryOutput>, IEnumerable<CatalogueDocumentsCategoryOutput>> sort,
    CancellationToken cancellationToken)
  {
    var flatOutputs = filter(await GetFlatCatalogueDocumentsAsync(cancellationToken));
    var outputs = sort(GroupCatalogueDocumentsByCategory(flatOutputs));

    return outputs;
  }

  public async Task<IEnumerable<CatalogueDocumentsPerContentCategoryGroupOutput>> GetCatalogueDocumentsGroupedByContentCategoryGroupAsync(
    Func<IEnumerable<CatalogueDocumentsFlatOutput>, IEnumerable<CatalogueDocumentsFlatOutput>> filter,
    Func<IEnumerable<CatalogueDocumentsPerContentCategoryGroupOutput>, IEnumerable<CatalogueDocumentsPerContentCategoryGroupOutput>> sort,
    CancellationToken cancellationToken)
  {
    var flatOutputs = filter(await GetFlatCatalogueDocumentsAsync(cancellationToken));
    var outputs = sort(GroupCtatlogueDocumentsByContentCategoryGroup(flatOutputs));

    return outputs;
  }

  public async Task<(IQueryable<T> Entities, IEnumerable<Document> Documents)> GetAccessibleDocumentsAsync<T>(
    IRepository<T> repository)
    where T : EntityBase, IAggregateRoot
  {
    var documents = await _documentRepository.AsQueryable(new DocumentsByEntitySpec<T>()).ToListAsync();
    var entityIds = documents.Select(e => e.EntityIntId!.Value).Distinct();
    var entities = repository.AsQueryable(new GetByIdsSpec<T>(entityIds));
    var filteredDocuments = documents.Where(doc => entityIds.Contains(doc.EntityIntId!.Value)).ToList();

    return (entities, filteredDocuments);
  }

  public IEnumerable<DocumentsPerContentCategoryGroupOutput> GroupDocumentsByContentCategoryGroup(IEnumerable<Document> documents)
    => documents
        .GroupBy(document => document.ContentCategoryGroup)
        .Select(groupedByContentCategoryGroup => new DocumentsPerContentCategoryGroupOutput
        {
          ContentCategoryGroup = groupedByContentCategoryGroup.Key,
          SubRows = groupedByContentCategoryGroup
            .GroupBy(document => document.ContentCategory)
            .Select(groupedByContentCategory => new DocumentsPerContentCategoryOutput
            {
              ContentCategory = groupedByContentCategory.Key,
              SubRows = groupedByContentCategory
            })
        });

  private async Task<IEnumerable<CatalogueDocumentsFlatOutput>> GetFlatCatalogueDocumentsAsync(CancellationToken cancellationToken)
  {
    // catalogue items
    var (catalogueItemQuery, catalogueItemDocuments) = await GetAccessibleDocumentsAsync(_catalogueItemRepository);

    var catalogueItems = await catalogueItemQuery
      .Select(catalogueItem => new
      {
        catalogueItem.Id,
        catalogueItem.InternalCode,
        Estate = new
        {
          catalogueItem.Estate.Id,
          catalogueItem.Estate.InternalCode
        },
        Type = new
        {
          catalogueItem.CatalogueType.Id,
          catalogueItem.CatalogueType.Name
        },
        Category = new
        {
          catalogueItem.CatalogueType.Category.Id,
          catalogueItem.CatalogueType.Category.Name
        },
        SubCategory = new
        {
          Id = (int?)catalogueItem.CatalogueType.SubCategory!.Id,
          catalogueItem.CatalogueType.SubCategory!.Name
        }
      })
      .ToListAsync(cancellationToken);

    var catalogueItemOutputs = catalogueItems
      .SelectMany(catalogueItem => catalogueItemDocuments
        .Where(document => document.EntityIntId == catalogueItem.Id)
        .Select(document => new CatalogueDocumentsFlatOutput
        {
          CatalogueItemId = catalogueItem.Id,
          CatalogueItemInternalCode = catalogueItem.InternalCode,
          EstateId = catalogueItem.Estate.Id,
          EstateInternalCode = catalogueItem.Estate.InternalCode,
          CatalogueTypeId = catalogueItem.Type.Id,
          CatalogueTypeName = catalogueItem.Type.Name!,
          CategoryId = catalogueItem.Category.Id,
          CategoryName = catalogueItem.Category.Name!,
          SubCategoryId = catalogueItem.SubCategory.Id,
          SubCategoryName = catalogueItem.SubCategory.Name!,
          ContentCategoryGroup = document.ContentCategoryGroup,
          Document = document
        }));

    // catalogue
    var (catalogueTypeQuery, catalogueDocuments) = await GetAccessibleDocumentsAsync(_catalogueTypeRepository);

    var catalogueTypes = await catalogueTypeQuery
      .Select(catalogueType => new
      {
        catalogueType.Id,
        catalogueType.Name,
        Category = new
        {
          catalogueType.Category.Id,
          catalogueType.Category.Name
        },
        SubCategory = new
        {
          Id = (int?)catalogueType.SubCategory!.Id,
          catalogueType.SubCategory!.Name
        }
      })
      .ToListAsync(cancellationToken);

    var catalogueOutputs = catalogueTypes
      .SelectMany(catalogueType => catalogueDocuments
        .Where(document => document.EntityIntId == catalogueType.Id)
        .Select(document => new CatalogueDocumentsFlatOutput
        {
          EstateId = int.Parse(document.EstateId!),
          CatalogueTypeId = catalogueType.Id,
          CatalogueTypeName = catalogueType.Name!,
          CategoryId = catalogueType.Category.Id,
          CategoryName = catalogueType.Category.Name!,
          SubCategoryId = catalogueType.SubCategory.Id,
          SubCategoryName = catalogueType.SubCategory.Name!,
          ContentCategoryGroup = document.ContentCategoryGroup,
          Document = document
        }));

    var catalogueEstatesInternalCodes = _estateRepository
      .AsQueryable()
      .Where(estate => catalogueOutputs.Select(output => output.EstateId).Contains(estate.Id))
      .Select(estate => new { estate.Id, estate.InternalCode })
      .ToDictionary(estate => estate.Id, estate => estate.InternalCode);

    catalogueOutputs = catalogueOutputs
      .Select(output => output with { EstateInternalCode = catalogueEstatesInternalCodes[output.EstateId] });

    return catalogueItemOutputs.Concat(catalogueOutputs);
  }

  private static IEnumerable<CatalogueDocumentsCategoryOutput> GroupCatalogueDocumentsByCategory(
    IEnumerable<CatalogueDocumentsFlatOutput> flat)
    => flat
        .GroupBy(flat => new { flat.CategoryId, flat.CategoryName })
        .Select(groupedByCategory => new CatalogueDocumentsCategoryOutput
        {
          CategoryName = groupedByCategory.Key.CategoryName,
          SubRows = groupedByCategory
            .GroupBy(flat => new { flat.SubCategoryId, flat.SubCategoryName })
            .Select(groupedBySubCategory => new CatalogueDocumentsSubCategoryOutput
            {
              SubCategoryName = groupedBySubCategory.Key.SubCategoryName!,
              SubRows = groupedBySubCategory
                .GroupBy(flat => new { flat.CatalogueTypeId, TypeName=flat.CatalogueTypeName })
                .Select(groupedByType => new CatalogueDocumentsTypeOutput
                {
                  CatalogueTypeName = groupedByType.Key.TypeName,
                  SubRows = GroupCtatlogueDocumentsByContentCategoryGroup(groupedByType)
                })
            })
        });

  private static IEnumerable<CatalogueDocumentsPerContentCategoryGroupOutput> GroupCtatlogueDocumentsByContentCategoryGroup(
    IEnumerable<CatalogueDocumentsFlatOutput> flat)
    => flat
        .GroupBy(flat => flat.ContentCategoryGroup)
        .Select(groupedByContentCategoryGroup => new CatalogueDocumentsPerContentCategoryGroupOutput
        {
          ContentCategoryGroup = groupedByContentCategoryGroup.Key,
          SubRows = groupedByContentCategoryGroup
            .GroupBy(flat => flat.Document.ContentCategory)
            .Select(groupedByContentCategory => new CatalogueDocumentsPerContentCategoryOutput
            {
              ContentCategory = groupedByContentCategory.Key,
              SubRows = groupedByContentCategory
                .Select(flat => new CatalogueDocumentOutput
                {
                  Document = flat.Document,
                  CatalogueItemInternalCode = flat.CatalogueItemInternalCode,
                  EstateId = flat.EstateId,
                  CatalogueTypeId = flat.CatalogueTypeId,
                  EntityId = flat.Document.EntityId,
                  CatalogueItemId = flat.CatalogueItemId,
                  CmisId = flat.Document.CmisId,
                  Name = flat.Document.Name,
                  FileName = flat.Document.FileName,
                  Since = flat.Document.Since,
                  Until = flat.Document.Until,
                  ProtocolNumber = flat.Document.ProtocolNumber,
                  IssueDate = flat.Document.IssueDate,
                  Issuer = flat.Document.Issuer,
                  UploaderName = flat.Document.UploaderName,
                  CreationDate = flat.Document.CreationDate,
                  Notes = flat.Document.Notes
                })
            })
        });
}
