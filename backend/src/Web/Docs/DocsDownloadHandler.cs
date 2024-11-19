using RealGimm.Core;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Specifications;

namespace RealGimm.Web.Docs;

public class DocsDownloadHandler
{
  private readonly IReadRepository<Document> _repository;

  public DocsDownloadHandler(IReadRepository<Document> repository)
  {
    _repository = repository;
  }

  public IResult GetFile(string cmisId, string entityId)
  {
    var document = _repository
      .AsQueryable(new DocumentByIdAndEntityIdFullSpec(entityId, cmisId))
      .FirstOrDefault();

    if (document is null)
    {
      return Results.NotFound();
    }

    if (document.Data is null)
    {
      return Results.Empty;
    }

    return Results.File(document.Data, document.MimeType, document.FileName);
  }
}
