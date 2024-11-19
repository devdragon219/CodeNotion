using System.Diagnostics.CodeAnalysis;
using System.Linq.Expressions;
using HotChocolate.Data.Filters;
using HotChocolate.Data.Filters.Expressions;
using HotChocolate.Language.Visitors;
using HotChocolate.Language;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Extensions;

namespace RealGimm.Web.Docs.Queries.Filters;

public class DocumentContentContainsFilterHandler : QueryableDefaultFieldHandler
{
  public override bool TryHandleEnter(
    QueryableFilterContext context,
    IFilterField field,
    ObjectFieldNode node,
    [NotNullWhen(true)] out ISyntaxVisitorAction? action)
  {
    if (node.Value.Value is not string stringValue)
    {
      throw new NotSupportedException();
    }

    Expression<Func<Document, bool>> expression = document => document.ContainsText(stringValue);
    
    var invoke = Expression.Invoke(expression, context.GetInstance());
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
