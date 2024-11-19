using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Specifications;
using RealGimm.Web.Docs.Queries.Filters;

namespace RealGimm.Web.Anag.Extensions;

[ExtendObjectType(typeof(Subject))]
public class SubjectExtension
{
  [UseFiltering<DocumentFilterType>]
  [UseSorting]
  public Document[] GetDocuments(
    [Parent] Subject subject,
    [SchemaService] IResolverContext resolverContext,
    [Service] ILogger<SubjectExtension> logger,
    [Service] IReadRepository<Document> repository)
  {
    if (subject is null)
    {
      return Array.Empty<Document>();
    }

    try
    {
      return repository
        .AsQueryable(new DocumentsByEntityIdSpec<Subject>(subject.Id))
        .Filter(resolverContext)
        .ToArray();
    }
    catch (Exception e)
    {
      logger.LogError(e, "Unable to fetch documents for subject");
      return Array.Empty<Document>();
    }
  }

  public async Task<bool> CanUseDocumentName(
    [Parent] Subject subject,
    string name,
    [Service] IReadRepository<Document> repository)
  {
    if (subject is null)
    {
      return false;
    }

    return !await repository
      .AsQueryable(new DocumentsByEntityIdAndNameSpec<Subject>(subject.Id, name))
      .AnyAsync();
  }
}
