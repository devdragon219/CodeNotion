using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core;
using RealGimm.Core.Docs.DocumentAggregate.Specifications;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.WebCommons.User.DataLoaders;

namespace RealGimm.Web.Fclt.Extensions;

[ExtendObjectType(typeof(Reply))]
public sealed class ReplyExtension
{
  public async Task<User?> GetUser(
    [Parent] Reply reply,
    [Service] UserDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(reply.UserId, cancellationToken);

  public IEnumerable<Document> GetDocuments(
    [Parent] Reply reply,
    [Service] IReadRepository<Document> repository)
  {
    var documents = repository
      .AsQueryable(new DocumentsByEntityIdSpec<Reply>(reply.Id))
      .Where(document => document.ContentType != ContentType.Image)
      .ToArray();

    return documents;
  }

  public IEnumerable<Document> GetImages(
    [Parent] Reply reply,
    [Service] IReadRepository<Document> repository)
    => repository
        .AsQueryable(new DocumentsByEntityIdSpec<Reply>(reply.Id))
        .Where(document => document.ContentType == ContentType.Image)
        .AsEnumerable();
}
