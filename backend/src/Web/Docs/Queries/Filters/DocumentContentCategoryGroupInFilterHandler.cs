using System.Diagnostics.CodeAnalysis;
using System.Linq.Expressions;
using HotChocolate.Data.Filters;
using HotChocolate.Data.Filters.Expressions;
using HotChocolate.Language.Visitors;
using HotChocolate.Language;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Extensions;
using System.Reflection;

namespace RealGimm.Web.Docs.Queries.Filters;

public class DocumentContentCategoryGroupInFilterHandler : QueryableDefaultFieldHandler
{
  private static readonly MethodInfo s_ContainsMethod = typeof(Enumerable)
    .GetMethods()
    .Single(methodInfo =>
      methodInfo.Name == nameof(Enumerable.Contains) &&
      methodInfo.IsGenericMethod &&
      methodInfo.GetParameters().Length == 2)
    .MakeGenericMethod(new[] { typeof(ContentCategory) });

  private static readonly PropertyInfo s_ContentCategoryMemberInfo = typeof(Document)
    .GetProperty(nameof(Document.ContentCategory))!;
 
  public override bool TryHandleEnter(
    QueryableFilterContext context,
    IFilterField field,
    ObjectFieldNode node,
    [NotNullWhen(true)] out ISyntaxVisitorAction? action)
  {
    if (node.Value.Value is not IEnumerable<IValueNode> contentCategoryGroupNodes ||
      contentCategoryGroupNodes.Any(node => node is not IValueNode<string>))
    {
      throw new NotSupportedException();
    }

    var contentCategoryGroups = contentCategoryGroupNodes
      .Select(node => ((IValueNode<string>)node).Value)
      .Distinct()
      .ToArray();

    var contentCategories = Enum.GetValues<ContentCategory>()
      .Where(category => contentCategoryGroups.Contains(category.GetGroupName()))
      .ToArray();

    var contentCategoriesExpression = Expression.Constant(contentCategories);
    var documentParameter = Expression.Parameter(typeof(Document));

    // document.ContentCategory
    var contentCategoryMemberAccessExpression = Expression.MakeMemberAccess(documentParameter, s_ContentCategoryMemberInfo);

    // contentCategories.Contains(document.ContentCategory)
    var containsExpression = Expression.Call(s_ContainsMethod, contentCategoriesExpression, contentCategoryMemberAccessExpression);

    // document => contentCategories.Contains(document.ContentCategory)
    var lambdaExpression = Expression.Lambda(containsExpression, documentParameter);

    var invoke = Expression.Invoke(lambdaExpression, context.GetInstance());
    context.GetLevel().Enqueue(invoke);

    action = SyntaxVisitor.SkipAndLeave;

    return true;
  }

  public override bool TryHandleLeave(
    QueryableFilterContext context,
    IFilterField field,
    ObjectFieldNode node,
    [NotNullWhen(true)] out ISyntaxVisitorAction? action)
  {
    action = SyntaxVisitor.Skip;

    return true;
  }
}
