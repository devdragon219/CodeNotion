using RealGimm.Web.Prop.Queries;

namespace RealGimm.Web.Prop;

[ExtendObjectType(typeof(Query))]
public class PropQueries
{
  public ContractTypeQueries ContractType { get; } = new();
  public ContractQueries Contract { get; } = new();
  public RegistrationOfficeQueries RegistrationOffice { get; } = new();
  public BillQueries Bill { get; } = new();
  public AdministrationQueries Administration { get; } = new();
  public AdministrationTermQueries AdministrationTerm { get; } = new();
  public RegistryCommunicationQueries RegistryCommunication { get; } = new();
  public RegistrationPaymentQueries RegistrationPayment { get; } = new();
}
