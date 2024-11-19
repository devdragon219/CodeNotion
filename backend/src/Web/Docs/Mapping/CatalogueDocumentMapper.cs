using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Web.Docs.Models;
using RealGimm.WebCommons.Mapping;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.CatalogueTypeAggregate;

namespace RealGimm.Web.Docs.Mapping;

public class CatalogueDocumentMapper : DocumentMapperBase<CatalogueType>
{
  private readonly IRepository<CatalogueItem> _catalogueItemRepository;

  public CatalogueDocumentMapper(IRepository<CatalogueItem> catalogueItemRepository)
  {
    _catalogueItemRepository = catalogueItemRepository;
  }

  public override async Task MapAsync(int catalogueTypeId, int? estateId, DocumentInput from, Document into, CancellationToken cancellationToken)
  {
    ArgumentNullException.ThrowIfNull(estateId);
    ArgumentNullException.ThrowIfNull(from);
    ArgumentNullException.ThrowIfNull(into);

    var managementSubjectId = await _catalogueItemRepository
      .AsQueryable()
      .Where(catalogueItem => catalogueItem.CatalogueType.Id == catalogueTypeId)
      .Where(catalogueItem => catalogueItem.Estate.Id == estateId.Value)
      .GroupBy(catalogueItem => new
      {
        TypeId = catalogueItem.CatalogueType.Id,
        EstateId = catalogueItem.Estate.Id,
        catalogueItem.Estate.ManagementSubjectId
      })
      .Select(group => (int?)group.Key.ManagementSubjectId)
      .SingleOrDefaultAsync(cancellationToken)
      ?? throw new MappingException(ErrorCode.InvalidCatalogue.ToValidationError());

    Map(new[] { managementSubjectId }, catalogueTypeId, estateId.Value, from, into);
  }
}
