using System.Diagnostics.CodeAnalysis;
using System.Linq.Expressions;
using HotChocolate.Data.Filters;
using HotChocolate.Data.Filters.Expressions;
using HotChocolate.Language;
using HotChocolate.Language.Visitors;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.WebCommons.Filtering;

public class ExternalEntityFieldFilterHandler<TEntity, TExternalEntity> : QueryableDefaultFieldHandler
  where TExternalEntity : class, IAggregateRoot, IIdentifiable
{
  private readonly IServiceProvider _serviceProvider;
  private readonly Func<string, Expression<Func<TExternalEntity, bool>>> _containsExpressionMaker;
  private readonly Func<int[], Expression<Func<TEntity, bool>>> _filterExpressionMaker;

  public ExternalEntityFieldFilterHandler(
    IServiceProvider serviceProvider,
    Func<string, Expression<Func<TExternalEntity, bool>>> containsExpressionMaker,
    Func<int[], Expression<Func<TEntity, bool>>> filterExpressionMaker)
  {
    _serviceProvider = serviceProvider;
    _containsExpressionMaker = containsExpressionMaker;
    _filterExpressionMaker = filterExpressionMaker;
  }

  public override bool TryHandleEnter(QueryableFilterContext context,
    IFilterField field,
    ObjectFieldNode node,
    [NotNullWhen(true)] out ISyntaxVisitorAction? action)
  {
    if (node.Value.GetNodes().First() is ObjectFieldNode ofn)
    {
      if (ofn.Name.Value == "contains"
        && ofn.Value.GetValueKind() == ValueKind.String
        && ofn.Value.Value is not null)
      {
        var repository = _serviceProvider.GetRequiredService<IReadRepository<TExternalEntity>>();

        var cstring = (string)ofn.Value.Value;

        var contains = _containsExpressionMaker(cstring);

        var idArray = repository
          .AsQueryable()
          .Where(contains)
          .Select(e => e.Id)
          .ToArray();

        if (idArray.Length > 0)
        {
          Expression<Func<TEntity, bool>> expression = _filterExpressionMaker(idArray);

          var invoke = Expression.Invoke(expression, context.GetInstance());

          context.GetLevel().Enqueue(invoke);
        }
        else
        {
          var invoke = Expression.Invoke((TEntity k) => false, context.GetInstance());

          context.GetLevel().Enqueue(invoke);
        }
      }
    }

    action = SyntaxVisitor.SkipAndLeave;
    return true;
  }

  public override bool TryHandleLeave(QueryableFilterContext context, IFilterField field, ObjectFieldNode node, [NotNullWhen(true)] out ISyntaxVisitorAction? action)
  {
    action = SyntaxVisitor.Skip;
    return true;
  }
}
