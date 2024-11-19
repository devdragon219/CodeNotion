using RealGimm.Core.Anag.SubjectCategoryAggregate;
using GreenDonut;
using RealGimm.WebCommons;
using Ardalis.Specification;

namespace RealGimm.Web.Anag.DataLoaders;

public class SubjectCategoryDataLoader : IdentifiableBatchDataLoader<SubjectCategory>
{
  protected override Specification<SubjectCategory>[] AdditionalSpecificationsMultiple => [];
  protected override Specification<SubjectCategory>[] AdditionalSpecificationsSingle => [];
  public SubjectCategoryDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(serviceProvider, batchScheduler, options)
  {
  }
}
