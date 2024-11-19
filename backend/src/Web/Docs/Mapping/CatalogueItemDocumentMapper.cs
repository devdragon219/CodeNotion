using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Web.Docs.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Shared.Specifications;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.Web.Docs.Mapping;

public class CatalogueItemDocumentMapper : EstateLinkedDocumentMapperBase<CatalogueItem>
{
  private readonly IRepository<CatalogueItem> _catalogueItemRepository;

  public CatalogueItemDocumentMapper(IRepository<CatalogueItem> catalogueItemRepository)
  {
    _catalogueItemRepository = catalogueItemRepository;
  }

  public override async Task MapAsync(int catalogueItemId, DocumentInput from, Document into, CancellationToken cancellationToken)
  {
    ArgumentNullException.ThrowIfNull(from);
    ArgumentNullException.ThrowIfNull(into);

    var catalogueItem = await _catalogueItemRepository
      .AsQueryable(new GetByIdSpec<CatalogueItem>(catalogueItemId))
      .Select(catalogueItem => new
      {
        EstateId = catalogueItem.Estate.Id,
        catalogueItem.Estate.ManagementSubjectId,
      })
      .SingleOrDefaultAsync(cancellationToken)
      ?? throw new MappingException(ErrorCode.InvalidCatalogueItem.ToValidationError());

    Map(new[] { catalogueItem.ManagementSubjectId }, catalogueItemId, catalogueItem.EstateId, from, into);
  }
}
