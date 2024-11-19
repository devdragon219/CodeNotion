using HotChocolate.Language;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;

namespace RealGimm.Core.Prop.Services;

public static class RegistryCommunicationReceiptParser
{
  public static bool DetectIsSuccessfull(string fileName)
    => Path.GetExtension(fileName) switch
    {
      ".err" => false,
      ".rel" => true,
      _ => throw new NotSupportedException()
    };

  public static (string RequestCode, RegistryCommunicationReceipt Receipt) Parse(string text, bool isSuccess)
  {
    ArgumentException.ThrowIfNullOrWhiteSpace(text);

    var lines = text.Split(Environment.NewLine);
    string requestCode;

    if (!isSuccess)
    {
      requestCode = lines[0].Substring(
        ContractRequestCodeGenerator.CodeLenght,
        lines[0].ToLower().IndexOf(".ccf") - ContractRequestCodeGenerator.CodeLenght);

      // TODO: find out how to parse failure message
      var failureMessage = string.Empty;

      return (requestCode, RegistryCommunicationReceipt.Failure(failureMessage));
    }

    var recordType = lines[0].Substring(27, 5).ToUpperInvariant();
    if (recordType != "RLI12")
    {
      throw new InvalidFormatException();
    }

    var receiptLine = lines.Single(line =>
      line.Length >= 114 + 7 &&
      line.Substring(114, 7).Trim() == "1000001");

    var receiptType = receiptLine.Substring(17, 1).ToUpperInvariant();
    if (receiptType != "R")
    {
      throw new InvalidFormatException();
    }

    requestCode = receiptLine.Substring(
      receiptLine.IndexOf(ContractRequestCodeGenerator.CodePrefix),
      ContractRequestCodeGenerator.CodeLenght);
    
    var contractAssignedNumber = receiptLine.Substring(receiptLine.IndexOf("e codice identificativo ") + 24, 17);    
    var registrationSeries = receiptLine.Substring(1174, 6);
    var registrationNumber = receiptLine.Substring(1187, 2);

    return (requestCode, RegistryCommunicationReceipt.Success(contractAssignedNumber, registrationSeries, registrationNumber));
  }
}
