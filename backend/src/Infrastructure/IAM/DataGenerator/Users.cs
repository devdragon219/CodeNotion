using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure.IAM.DataGenerator;

public class Users : IUserDataGenerator
{
  public (string, string, string) GetAdminUsernamePasswordAndHash(string tenantName)
  {
    tenantName = new string(tenantName
        // Remove existing dots (e.g. abbreviations, initialisms)
        .Replace(".", string.Empty)
        // All punctuation or spaces to dot
        .Select(c => !char.IsLetterOrDigit(c) ? '.' : c)
        .ToArray())
        // Remove double dots
        .Replace("..", ".")
        // Remove dots at beginning/end of string
        .Trim('.');

    var (password, hash) = Passwords.MakePasswordAndHash(12);

    return ("admin@" + tenantName, password, hash);
  }

  public static (string, string, string) GetAdminData(string tenantName, string password)
  {
    tenantName = new string(tenantName
        // Remove existing dots (e.g. abbreviations, initialisms)
        .Replace(".", string.Empty)
        // All punctuation or spaces to dot
        .Select(c => !char.IsLetterOrDigit(c) ? '.' : c)
        .ToArray())
        // Remove double dots
        .Replace("..", ".")
        // Remove dots at beginning/end of string
        .Trim('.');

    var hash = Passwords.MakePasswordHash(password);

    return ("admin@" + tenantName, password, hash);
  }
}