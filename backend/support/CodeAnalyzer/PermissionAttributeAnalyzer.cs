using System.Collections.Immutable;
using System.Text.RegularExpressions;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.Diagnostics;

namespace CodeAnalyzer;

[DiagnosticAnalyzer(LanguageNames.CSharp)]
public partial class AttributeEnforcementAnalyzer : DiagnosticAnalyzer
{
  public override void Initialize(AnalysisContext context)
  {
    context.EnableConcurrentExecution();
    context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.Analyze | GeneratedCodeAnalysisFlags.ReportDiagnostics);
    context.RegisterSymbolAction(AnalyzeMethod, SymbolKind.Method);
  }

  public override ImmutableArray<DiagnosticDescriptor> SupportedDiagnostics
      => [new DiagnosticDescriptor(
      "RG002",
      "Public GraphQL operation needs a PermissionAttribute",
      "Public GraphQL queries and mutations in {0} must have a PermissionAttribute applied",
      "Design",
      DiagnosticSeverity.Error,
      isEnabledByDefault: true)];

  private void AnalyzeMethod(SymbolAnalysisContext context)
  {
    var methodSymbol = (IMethodSymbol)context.Symbol;

    // Check if it's a public method and in the specific namespace
    if (methodSymbol.DeclaredAccessibility == Accessibility.Public &&
        NamespaceMatch().IsMatch(methodSymbol.ContainingNamespace.ToDisplayString()))
    {
      var isExcluded =
        //Exclude methods from an abstract class
        methodSymbol.ContainingType.IsAbstract
        || // Exclude specific methods
        methodSymbol.ContainingNamespace.ToDisplayString().EndsWith(".User.Mutations")
        || (methodSymbol.ContainingNamespace.ToDisplayString().EndsWith(".User.Queries")
          && methodSymbol.Name is "GetMe" or "GetSessions")
        || // exlude NotificationQueries
        (methodSymbol.ContainingNamespace.ToDisplayString().EndsWith(".Common.Queries")
          && methodSymbol.ContainingType.Name == "NotificationQueries")
        || // exlude NotificationMutations
        (methodSymbol.ContainingNamespace.ToDisplayString().EndsWith(".Common.Mutations")
          && methodSymbol.ContainingType.Name == "NotificationMutations");
      
      if (isExcluded)
      {
        return;
      }

      // Check for the attribute
      var hasAttribute = methodSymbol.GetAttributes().Any(attr =>
        attr.AttributeClass is not null &&
        attr.AttributeClass.Name.EndsWith("PermissionAttribute"));

      if (!hasAttribute)
      {
        var diagnostic = Diagnostic.Create(SupportedDiagnostics[0],
          methodSymbol.Locations[0],
          methodSymbol.ContainingNamespace);
        context.ReportDiagnostic(diagnostic);
      }
    }
  }

  [GeneratedRegex("^RealGimm\\.Web[a-zA-Z0-9]*\\..*(\\.Queries|\\.Mutations)$", RegexOptions.Compiled)]
  private static partial Regex NamespaceMatch();
}
