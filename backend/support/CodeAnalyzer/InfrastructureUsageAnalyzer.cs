using System.Collections.Immutable;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Diagnostics;

namespace CodeAnalyzer;

[DiagnosticAnalyzer(LanguageNames.CSharp)]
public class InfrastructureUsageAnalyzer : DiagnosticAnalyzer
{
  public override void Initialize(AnalysisContext context)
  {
    context.EnableConcurrentExecution();
    context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.Analyze | GeneratedCodeAnalysisFlags.ReportDiagnostics);
    context.RegisterSyntaxNodeAction(AnalyzeSyntaxNode, SyntaxKind.IdentifierName);
  }

  public override ImmutableArray<DiagnosticDescriptor> SupportedDiagnostics =>
    ImmutableArray.Create(new DiagnosticDescriptor(
      "RG001",
      "Don't use RealGimm.Infrastructure directly",
      "Identifier '{0}' should not be used directly.",
      "Design",
      DiagnosticSeverity.Error,
      isEnabledByDefault: true));

  private void AnalyzeSyntaxNode(SyntaxNodeAnalysisContext context)
  {
    var identifier = (IdentifierNameSyntax)context.Node;

    var symbol = context.SemanticModel?.GetSymbolInfo(identifier).Symbol;

    if (symbol?.ContainingNamespace?.ToDisplayString()?.StartsWith("RealGimm.Infrastructure") ?? false)
    {
      var diagnostic = Diagnostic.Create(SupportedDiagnostics[0],
        identifier.GetLocation(),
        symbol?.Name);

      context.ReportDiagnostic(diagnostic);
    }
  }
}
