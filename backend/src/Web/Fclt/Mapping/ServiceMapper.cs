using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueCategoryAggregate.Specifications;
using RealGimm.Core.Fclt.ServiceAggregate;
using RealGimm.Core.Fclt.ServiceCategoryAggregate;
using RealGimm.Core.Fclt.ServiceCategoryAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public sealed class ServiceMapper : IMapper<ServiceInput, Service>
{
  private readonly IMapper _mapper;
  private readonly IReadRepository<ServiceCategory> _serviceCategoryRepository;

  public ServiceMapper(IMapper mapper, IReadRepository<ServiceCategory> serviceCategoryRepository)
  {
    _mapper = mapper;
    _serviceCategoryRepository = serviceCategoryRepository;
  }

  public async Task<Service?> MapAsync(
    ServiceInput? from,
    Service? into,
    CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var item = into ?? new Service();
    item.SetInternalCode(from.InternalCode);
    item.SetName(from.Name);

    var category = await _serviceCategoryRepository
      .AsQueryable(new GetByIdSpec<ServiceCategory>(from.CategoryId), new ServiceCategoryIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);
    MappingException.ThrowIfNull(category, ErrorCode.CatalogueTypeNonExistingCategory.ToValidationError());

    var subCategory = category.SubCategories.SingleOrDefault(subCategory => subCategory.Id == from.SubCategoryId);
    MappingException.ThrowIfNull(subCategory, ErrorCode.CatalogueTypeNonExistingSubCategory.ToValidationError());
    
    item.SetCategory(category, subCategory);
    
    await _mapper.UpdateCollectionAsync(from.Activities, item.Activities, cancellationToken);

    return item;
  }
}
