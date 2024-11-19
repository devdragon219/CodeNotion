using Ardalis.Result;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.IAM;
using RealGimm.Web.Docs.Helpers;
using RealGimm.Web.Docs.Mapping;
using RealGimm.Web.Docs.Models;

namespace RealGimm.Web.Docs.Mutations;

public class SubjectDocumentMutations
{
  [BackOfficePermission(Features.ANAG_SUBJECT_BASE, Permission.Create)]
  public Task<Result<Document[]>> AddRange(
    int subjectId,
    DocumentInput[] inputs,
    [Service] IRepository<Document> repository,
    [Service] IDocumentMapper<Subject> mapper,
    CancellationToken cancellationToken)
    => DocumentMutationsHelper.AddRangeAsync(subjectId, inputs, repository, mapper, cancellationToken);

  [BackOfficePermission(Features.ANAG_SUBJECT_BASE, Permission.Update)]
  public Task<Result<Document>> Update(
    int subjectId,
    DocumentInput input,
    [Service] IRepository<Document> repository,
    [Service] IDocumentMapper<Subject> mapper,
    CancellationToken cancellationToken)
    => DocumentMutationsHelper.UpdateAsync(subjectId, input, repository, mapper, cancellationToken);

  [BackOfficePermission(Features.ANAG_SUBJECT_BASE, Permission.Delete)]
  public async Task<Result<Document[]>> DeleteRange(
    int subjectId,
    string[] cmisIds,
    [Service] IRepository<Document> repository,
    CancellationToken cancellationToken)
    => await DocumentMutationsHelper.DeleteRangeAsync<Subject>(subjectId, cmisIds, repository, cancellationToken);
}
