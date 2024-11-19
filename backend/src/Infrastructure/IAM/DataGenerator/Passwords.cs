using Microsoft.AspNetCore.Identity;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure.IAM.DataGenerator;

public class Passwords : IPasswordAndHashGenerator
{
  private const string LowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  private const string UppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private const string Digits = "0123456789";
  private const string Symbols = "!@#$*-=?";

  private static readonly Random _rnd = new ();

  public (string, string) MakePasswordAndHash()
  {
    return MakePasswordAndHash(8, 0, 2);
  }

  public static string MakePasswordHash(string password)
  {
    var ph = new PasswordHasher<object>();

    return ph.HashPassword(new object(), password);
  }

  public static (string, string) MakePasswordAndHash(int length, int numSymbols = 2, int numDigits = 2)
  {
    if (length <= numSymbols + numDigits)
    {
      throw new ArgumentException("Password length must be greater than the sum of symbol count and digit count.");
    }

    int numLowercase = length - numSymbols - numDigits;
    int numUppercase = (numLowercase + 1) / 2; // Ensure at least one uppercase letter

    string password = GenerateRandomString(numLowercase, LowercaseLetters);
    password += GenerateRandomString(numUppercase, UppercaseLetters);
    password += GenerateRandomString(numSymbols, Symbols);
    password += GenerateRandomString(numDigits, Digits);

    // Shuffle the password string to ensure symbols and digits are spread out.
    password = ShuffleString(password);

    return (password, MakePasswordHash(password));
  }

  private static string GenerateRandomString(int length, string characters)
  {
    byte[] randomBytes = new byte[length];
    _rnd.NextBytes(randomBytes);
    char[] randomChars = new char[length];

    for (int i = 0; i < length; i++)
    {
      randomChars[i] = characters[randomBytes[i] % characters.Length];
    }

    return new string(randomChars);
  }

  private static string ShuffleString(string input)
  {
    char[] chars = input.ToCharArray();
    int n = chars.Length;

    while (n > 1)
    {
      n--;
      int k = _rnd.Next(n + 1);
      (chars[n], chars[k]) = (chars[k], chars[n]);
    }
    return new string(chars);
  }
}
