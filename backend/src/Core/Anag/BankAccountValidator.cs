using System.Text.RegularExpressions;

namespace RealGimm.Core.Anag;

public partial class BankAccountValidator
{
    public static bool CheckIBAN(string code)
    {
        // Remove spaces and convert to uppercase
        code = code.Replace(" ", "").ToUpper();

        // Check if IBAN format is valid
        if (!IbanFormat().IsMatch(code))
            return false;

        // Rearrange the IBAN
        var rearrangedIBAN = code[4..] + code[..4];

        // Replace letters with corresponding digits
        var numericIBAN = "";
        foreach (var c in rearrangedIBAN)
        {
            if (char.IsLetter(c))
                numericIBAN += (c - 'A' + 10).ToString();
            else
                numericIBAN += c;
        }

        // Calculate MOD-97 remainder
        var remainder = 0;
        foreach (var c in numericIBAN)
        {
            var digit = int.Parse(c.ToString());
            remainder = (remainder * 10 + digit) % 97;
        }

        return remainder == 1;
    }

  [GeneratedRegex("^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$")]
  private static partial Regex IbanFormat();

}