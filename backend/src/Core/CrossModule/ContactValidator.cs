using System.Text.RegularExpressions;

namespace RealGimm.Core.CrossModule;

public partial class ContactValidator
{
    public static bool CheckEmail(string email)
    {
        return rgxEmail().IsMatch(email);
    }

    public static bool CheckPhone(string phone)
    {
        return rgxPhone().IsMatch(phone);
    }

  [GeneratedRegex("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", RegexOptions.Compiled)]
  private static partial Regex rgxEmail();
  [GeneratedRegex("^(?:\\+?\\d{1,4}[-\\s]?)?(?:\\(\\d{1,3}\\)[-.\\s]?)?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}$", RegexOptions.Compiled)]
  private static partial Regex rgxPhone();
}