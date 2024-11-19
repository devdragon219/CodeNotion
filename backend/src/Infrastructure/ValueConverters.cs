using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace RealGimm.Infrastructure;

public static class ValueConverters
{
  public static readonly ValueConverter<string?, string?> UpperNullableConverter = new (
    from => from == null ? null : from.ToUpper(),
    to => to == null ? null : to.ToUpper()
  );

  public static readonly ValueConverter<string, string> UpperConverter = new (
    from => from.ToUpper(),
    to => to.ToUpper()
  );
}