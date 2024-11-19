using RealGimm.Web.Docs.Mutations;
using RealGimm.Web.Fclt.Mutations;

namespace RealGimm.Web.Docs.Extensions;

[ExtendObjectType(typeof(ContractMutations))]
public class FcltContractMutationsExtension
{
  public FcltContractDocumentMutations Document { get; } = new();
}
