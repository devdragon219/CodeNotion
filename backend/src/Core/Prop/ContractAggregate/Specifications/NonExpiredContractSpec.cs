using Ardalis.Specification;

namespace RealGimm.Core.Prop.ContractAggregate.Specifications;

public class NonExpiredContractSpec : Specification<Contract>
{
  public NonExpiredContractSpec(DateOnly? expirationOverride = null)
  {
    var expiration = expirationOverride
      ?? DateOnly.FromDateTime(DateTime.UtcNow);
      
    Query
      .Where(contract =>
        contract.SecondTermExpirationDate == null ||
        contract.SecondTermExpirationDate.Value > expiration);
  }
}
