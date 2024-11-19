namespace RealGimm.Core.Docs.DocumentAggregate.Extensions;

public static class DocumentExtensions
{
  public static bool ContainsText(this Document document, string targetText)
    => throw new NotSupportedException("Using this method is supported only inside a server-side query.");
}
