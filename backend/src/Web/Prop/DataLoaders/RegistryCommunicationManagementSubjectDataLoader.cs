using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.SubjectAggregate.Specifications;
using GreenDonut;
using RealGimm.WebCommons;
using Ardalis.Specification;

namespace RealGimm.Web.Prop.DataLoaders;

public class RegistryCommunicationManagementSubjectDataLoader : IdentifiableBatchDataLoader<Subject>
{
  protected override Specification<Subject>[] AdditionalSpecificationsSingle { get; } = [new SubjectIncludeForRegistryCommunicationConfirmationSpec()];
  protected override Specification<Subject>[] AdditionalSpecificationsMultiple { get; } = [new SubjectIncludeForRegistryCommunicationConfirmationSpec()];

  public RegistryCommunicationManagementSubjectDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(serviceProvider, batchScheduler, options)
  {
  }
}
