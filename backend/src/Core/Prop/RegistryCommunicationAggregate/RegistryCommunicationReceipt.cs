using System.ComponentModel.DataAnnotations;

namespace RealGimm.Core.Prop.RegistryCommunicationAggregate;

public class RegistryCommunicationReceipt
{
  public bool IsSuccessful { get; private set; }

  [MaxLength(StrFieldSizes.NOTES)]
  public string? FailureMessage { get; private set; }

  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? ContractAssignedNumber { get; private set; } = default!;
  
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? RegistrationSeries { get; private set; }
  
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? RegistrationNumber { get; private set; }

  private RegistryCommunicationReceipt()
  {
  }

  public static RegistryCommunicationReceipt Success(
    string contractAssignedNumber,
    string registrationSeries,
    string registrationNumber)
    => new()
    {
      IsSuccessful = true,
      ContractAssignedNumber = contractAssignedNumber,
      RegistrationSeries = registrationSeries,
      RegistrationNumber = registrationNumber
    };

  public static RegistryCommunicationReceipt Failure(string? failureMessage = null)
    => new()
    {
      IsSuccessful = false,
      FailureMessage = failureMessage
    };
}
