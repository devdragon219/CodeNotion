namespace RealGimm.SharedKernel;

public static class RuntimeEnv
{
  public static readonly string ENV = "ENV";
  public static readonly string DEV = "DEV";
  public static readonly string PROD = "PROD";
  public static bool IsDevelopment(IDictionary<string, object?> builderProperties)
  {
    if (!builderProperties.ContainsKey(ENV))
    {
      return false;
    }

    var env = builderProperties[ENV] as string;

    if (string.IsNullOrEmpty(env))
    {
      return false;
    }

    return env == DEV;
  }
}