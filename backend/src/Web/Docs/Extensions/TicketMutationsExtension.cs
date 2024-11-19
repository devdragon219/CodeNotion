using RealGimm.Web.Docs.Mutations;
using RealGimm.Web.Fclt.Mutations;

namespace RealGimm.Web.Docs.Extensions;

[ExtendObjectType(typeof(TicketMutations))]
public class TicketMutationsExtension
{
  public TicketDocumentMutations Document { get; } = new();
}
