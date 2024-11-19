using System.Text;

namespace RealGimm.Core.Prop.Services;

public static class ContractRequestCodeGenerator
{
  private const string _baseChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  public const string CodePrefix = "KK";
  public const int CodeLenght = 8;

  public static string Generate(int contractId)
  {
    ArgumentOutOfRangeException.ThrowIfLessThanOrEqual(contractId, 0);

    var temp = contractId;
    var builder = new StringBuilder();

    // convetring to base 36
    while (temp > 0)
    {
      builder.Append(_baseChars[temp % _baseChars.Length]);
      temp /= _baseChars.Length;
    }

    return $"{CodePrefix}{builder.ToString().PadLeft(CodeLenght - CodePrefix.Length, '0')}";
  }
}
