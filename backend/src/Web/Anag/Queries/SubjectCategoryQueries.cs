using RealGimm.Core;
using RealGimm.Core.Anag.SubjectCategoryAggregate;
using RealGimm.Core.IAM;
using RealGimm.Web.Anag.DataLoaders;
using RealGimm.Web.Anag.Queries.Filters;
using RealGimm.Web.Anag.Queries.Sorting;

namespace RealGimm.Web.Anag.Queries;

public class SubjectCategoryQueries
{
  [BackOfficePermission(Features.ANAG_SUBJECT_CATEGORY, Permission.Read)]
  public async Task<SubjectCategory?> GetSubjectCategory(
    int subjectCategoryId,
    SubjectCategoryDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(subjectCategoryId, cancellationToken);

  [BackOfficePermission(Features.ANAG_SUBJECT_CATEGORY, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(SubjectCategoryFilterType))]
  [UseSorting(typeof(SubjectCategorySortInputType))]
  public IQueryable<SubjectCategory> ListSubjectCategories([Service] IReadRepository<SubjectCategory> repository)
    => repository.AsQueryable();

  [BackOfficePermission(Features.ANAG_SUBJECT_CATEGORY, Permission.Read)]
  [UseFiltering(typeof(SubjectCategoryFilterType))]
  [UseSorting(typeof(SubjectCategorySortInputType))]
  public IQueryable<SubjectCategory> AllSubjectCategories([Service] IReadRepository<SubjectCategory> repository)
    => repository.AsQueryable();
}
