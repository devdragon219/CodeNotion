using RealGimm.Web.Docs.Mutations;
using RealGimm.Web.Prop.Mutations;

namespace RealGimm.Web.Docs.Extensions;

[ExtendObjectType(typeof(ContractMutations))]
public class ContractMutationsExtension
{
  public ContractDocumentMutations Document { get; } = new();
}
