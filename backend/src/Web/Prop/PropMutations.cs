using RealGimm.Web.Prop.Mutations;

namespace RealGimm.Web.Prop;

[ExtendObjectType(typeof(Mutation))]
public class PropMutations
{
  public ContractTypeMutations ContractType { get; } = new();
  public RegistrationOfficeMutations RegistrationOffice { get; } = new();
  public ContractMutations Contract { get; } = new();
  public ActiveContractMutations ActiveContract { get; } = new();
  public PassiveContractMutations PassiveContract { get; } = new();
  public BillMutations Bill { get; } = new();
  public AdministrationMutations Administration { get; } = new();
  public AdministrationTermMutations AdministrationTerm { get; } = new();
  public RegistryCommunicationMutations RegistryCommunication { get; } = new();
  public TemporaryRegistryCommunicationMutations TemporaryRegistryCommunication { get; } = new();
  public ConfirmedRegistryCommunicationMutations ConfirmedRegistryCommunication { get; } = new();
  public RegistrationPaymentMutations RegistrationPayment { get; } = new();
}
