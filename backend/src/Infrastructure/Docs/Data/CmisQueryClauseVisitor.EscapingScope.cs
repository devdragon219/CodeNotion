namespace RealGimm.Infrastructure.Docs.Data;

public partial class CmisQueryClauseVisitor
{
  /// <summary>
  /// Restores initial escaping type of the visitor when disposed.
  /// </summary>
  private class EscapingScope : IDisposable
  {
    private readonly CmisQueryClauseVisitor _visitor;
    private readonly EscapingType _escapingTypeToRestore;

    public EscapingScope(CmisQueryClauseVisitor visitor, EscapingType escapingType)
    {
      _visitor = visitor;
      _escapingTypeToRestore = _visitor._escapeType;
      _visitor._escapeType = escapingType;
    }

    public void Dispose() => _visitor._escapeType = _escapingTypeToRestore;
  }
}
