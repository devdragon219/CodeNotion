using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.SubjectAggregate.Specifications;
using Ardalis.Specification;

namespace RealGimm.WebCommons.Anag.DataLoaders;

public class SubjectDataLoader : IdentifiableBatchDataLoader<Subject>
{
  protected override Specification<Subject>[] AdditionalSpecificationsSingle { get; } = [new SubjectIncludeAllSpec()];
  protected override Specification<Subject>[] AdditionalSpecificationsMultiple { get; } = [new SubjectIncludeForListSpec()];

  public SubjectDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(serviceProvider, batchScheduler, options)
  {
  }
}
