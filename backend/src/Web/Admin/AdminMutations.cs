namespace RealGimm.Web.Admin;

[ExtendObjectType(typeof(Mutation))]
public class AdminMutations
{
  public Mutations.AdminMutations Admin { get; } = new Mutations.AdminMutations();
}