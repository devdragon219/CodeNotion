namespace RealGimm.SharedKernel;

public static class HumanBoolean
{
  public static bool IsHumanTrue(this string? source)
  {
    return source is not null && affirmations.Contains(source.Trim().ToLowerInvariant());
  }

  static readonly string[] affirmations = new[]{
    "yes",
    "1",
    "true",
    "ok"
  };
}