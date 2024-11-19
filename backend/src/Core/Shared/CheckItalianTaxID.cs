using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;

namespace RealGimm.Core.Shared;

public partial class CheckItalianTaxID
{
  private static readonly string _months = "ABCDEHLMPRST";
  private static readonly string _vowels = "AEIOU";
  private static readonly string _consonants = "BCDFGHJKLMNPQRSTVWXYZ";
  private static readonly string _omocodeChars = "LMNPQRSTUV";
  private static readonly int[] _controlCodeArray = new[] { 1, 0, 5, 7, 9, 13, 15, 17, 19, 21, 2, 4, 18, 20, 11, 3, 6, 8, 12, 14, 16, 10, 22, 25, 24, 23 };

  public bool Check(
    string firstName,
    string lastName,
    string gender,
    DateOnly birthDate,
    string cityIstatCode,
    string taxId)
  {
    if (string.IsNullOrEmpty(taxId)
      || taxId.Length < 16
      || string.IsNullOrEmpty(firstName)
      || string.IsNullOrEmpty(lastName)
      || string.IsNullOrEmpty(cityIstatCode))
    {
      return false;
    }

    taxId = taxId.ToUpperInvariant();


    var homocody = CheckRegex().Match(taxId).Success
      ? taxId
      : ReplaceHomocodyLetters(taxId);

    if (!CheckRegex().Match(homocody).Success) return false;

    return homocody.Substring(3, 3) == NameSurnameCode(firstName, true)
      && homocody[..3] == NameSurnameCode(lastName, false)
      && homocody.Substring(6, 5) == BirthAndGenderCode(birthDate, gender)
      && homocody.Substring(11, 4) == cityIstatCode.ToUpperInvariant()
      && taxId[15] == CheckChar(taxId[..15]);
  }

  public static string NameSurnameCode(string s, bool isName)
  {
    s = Normalize(s);
    string code;
    var consonants = string.Empty;
    var i = 0;

    // Extract consonants
    while (consonants.Length < (isName ? 4 : 3) && i < s.Length)
    {
      if (_consonants.Contains(s[i]))
      {
        consonants += s[i];
      }
      i++;
    }

    // For NameCode, use first, third, and fourth consonant if more than three
    if (isName && consonants.Length > 3)
    {
      code = $"{consonants[0]}{consonants[2]}{consonants[3]}";
    }
    else
    {
      code = consonants;
    }

    // Add vowels if necessary
    i = 0;
    while (code.Length < 3 && i < s.Length)
    {
      if (_vowels.Contains(s[i]))
      {
        code += s[i];
      }
      i++;
    }

    // Pad with 'X' if less than 3 characters
    return code.Length < 3 ? code.PadRight(3, 'X') : code;
  }

  private static string BirthAndGenderCode(DateOnly birthDate, string gender)
  {
    var code = birthDate.Year.ToString().Substring(2);
    code += _months[birthDate.Month - 1];

    if (gender.ToUpper() == "M")
    {
      code += birthDate.Day <= 9 ? "0" + birthDate.Day.ToString() : birthDate.Day.ToString();
    }
    else if (gender.ToUpper() == "F")
    {
      code += (birthDate.Day + 40).ToString();
    }

    return code;
  }

  private static char CheckChar(string cchar)
  {
    var tot = 0;
    var arrCode = Encoding.ASCII.GetBytes(cchar.ToUpper());
    for (var i = 0; i < cchar.Length; i++)
    {
      if ((i + 1) % 2 == 0)
      {
        tot += char.IsLetter(cchar, i) ? arrCode[i] - (byte)'A' : arrCode[i] - (byte)'0';
      }
      else
      {
        tot += char.IsLetter(cchar, i) ? _controlCodeArray[arrCode[i] - (byte)'A'] : _controlCodeArray[arrCode[i] - (byte)'0'];
      }
    }

    tot %= 26;
    var l = (char)(tot + 'A');

    return l;
  }

  private static string ReplaceHomocodyLetters(string fiscalCode)
  {
    var cfChars = fiscalCode.ToCharArray();
    var pos = new[] { 6, 7, 9, 10, 12, 13, 14 };
    foreach (var i in pos)
    {
      if (!char.IsNumber(cfChars[i]))
      {
        cfChars[i] = _omocodeChars.IndexOf(cfChars[i]).ToString()[0];
      }
    }

    return new string(cfChars);
  }

  private static string Normalize(string s)
  {
    if (string.IsNullOrEmpty(s)) return s;
    s = s.Trim().ToUpperInvariant();

    s = s.Normalize(NormalizationForm.FormD);
    var sb = new StringBuilder();

    foreach (var c in s)
    {
      if (CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
        sb.Append(c);
    }

    return sb.ToString().Normalize(NormalizationForm.FormC);
  }

  [GeneratedRegex("^[A-Z]{6}[\\d]{2}[A-Z][\\d]{2}[A-Z][\\d]{3}[A-Z]$")]
  private static partial Regex CheckRegex();
}
