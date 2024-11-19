using System.Linq.Expressions;
using System.Reflection;
using Ardalis.Specification;
using RealGimm.Core;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Extensions;
using RealGimm.Core.Docs.DocumentAggregate.Specifications;

namespace RealGimm.Web.Docs.Queries.Filters;

public class PatchDocumentFiltersVisitor : ExpressionVisitor
{
  private static readonly MethodInfo s_documentContainsTextMethodInfo =
    typeof(DocumentExtensions)
    .GetMethod(nameof(DocumentExtensions.ContainsText))!;

  private static readonly ConstructorInfo s_documentByCmisIdSpecConstructorInfo = 
    typeof(DocumentByCmisIdSpec)
    .GetConstructor([typeof(string)])!;

  private static readonly MethodInfo s_documentRepositoryAsQueryableMethodInfo = typeof(IRepository<Document>)
    .GetMethods()
    .Single(methodInfo =>
      methodInfo.Name == nameof(IRepository<Document>.AsQueryable) &&
      methodInfo.GetParameters().Length == 1 &&
      methodInfo.GetParameters().Single().ParameterType == typeof(ISpecification<Document>));

  private readonly IRepository<Document> _documentRepository;

  private PatchDocumentFiltersVisitor(IRepository<Document> documentRepository)
  {
    _documentRepository = documentRepository;
  }

  public static Expression<Func<T, bool>> Patch<T>(Expression<Func<T, bool>> expression, IRepository<Document> documentRepository)
  {
    var visitor = new PatchDocumentFiltersVisitor(documentRepository);
    
    return (Expression<Func<T, bool>>)visitor.Visit(expression);
  }

  protected override Expression VisitMethodCall(MethodCallExpression node)
  {
    // document.ContainsText(...)
    if (node.Method == s_documentContainsTextMethodInfo)
    {
      var targetText = Expression.Lambda<Func<string>>(node.Arguments[1]).Compile().Invoke();

      // document.CmisId
      var documentCmisIdExpression = Expression.Property(node.Arguments[0], nameof(Document.CmisId));

      // new DocumentByCmisIdSpec(document.CmisId)
      var documentByCmisIdSpecExpression = Expression.New(s_documentByCmisIdSpecConstructorInfo, documentCmisIdExpression);

      // _documentRepository.AsQueryable(new DocumentByCmisIdSpec(document.CmisId))
      var documentByCmisIdSpecQueryableExpression = Expression.Call(
        instance: Expression.Constant(_documentRepository),
        method: s_documentRepositoryAsQueryableMethodInfo,
        arguments: documentByCmisIdSpecExpression);

      var documentParameter = Expression.Parameter(typeof(Document));
      
      // document.ContainsText(...)
      var documentContainsTextExpression = Expression.Call(
        s_documentContainsTextMethodInfo,
        documentParameter,
        Expression.Constant(targetText));

      // document => document.ContainsText(...)
      var documentContainsTextPredicateExpression = Expression.Lambda<Func<Document, bool>>(
        documentContainsTextExpression,
        documentParameter);

      // _documentRepository
      //  .AsQueryable(new DocumentByCmisIdSpec(document.CmisId))
      //  .Where(document => document.ContainsText())
      var whereExpression = Expression.Call(
        type: typeof(Queryable),
        methodName: nameof(Queryable.Where),
        typeArguments: new[] { typeof(Document) },
        documentByCmisIdSpecQueryableExpression,
        Expression.Constant(documentContainsTextPredicateExpression));

      // _documentRepository
      //  .AsQueryable(new DocumentByCmisIdSpec(document.CmisId))
      //  .Where(document => document.ContainsText())
      //  .ToList()
      var toListExpression = Expression.Call(
        type: typeof(Enumerable),
        methodName: nameof(Enumerable.ToList),
        typeArguments: [typeof(Document)],
        arguments: whereExpression);

      // _documentRepository
      //  .AsQueryable(new DocumentByCmisIdSpec(document.CmisId))
      //  .Where(document => document.ContainsText())
      //  .ToList()
      //  .Any()
      var patchedExpression = Expression.Call(
        type: typeof(Enumerable),
        methodName: nameof(Enumerable.Any),
        typeArguments: [typeof(Document)],
        arguments: toListExpression);

      return patchedExpression;
    }

    return base.VisitMethodCall(node);
  }
}
