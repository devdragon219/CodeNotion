using System.Diagnostics.CodeAnalysis;
using System.Linq.Expressions;
using HotChocolate.Data.Sorting;
using HotChocolate.Data.Sorting.Expressions;
using HotChocolate.Language;
using HotChocolate.Language.Visitors;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.WebCommons.Sorting;

public class ExternalEntityFieldSortHandler<TEntity, TExternalEntity> : QueryableDefaultSortFieldHandler
  where TExternalEntity : class, IAggregateRoot, IIdentifiable
{
  private readonly IServiceProvider _serviceProvider;
  private readonly Expression<Func<TExternalEntity, string>> _orderWeightExpression;
  private readonly Func<Dictionary<int, int>, Expression<Func<TEntity, int>>> _orderExpressionMaker;

  public ExternalEntityFieldSortHandler(
    IServiceProvider serviceProvider,
    Expression<Func<TExternalEntity, string>> orderWeightExpression,
    Func<Dictionary<int, int>, Expression<Func<TEntity, int>>> orderExpressionMaker)
  {
    _serviceProvider = serviceProvider;
    _orderWeightExpression = orderWeightExpression;
    _orderExpressionMaker = orderExpressionMaker;
  }

  public override bool TryHandleEnter(QueryableSortContext context,
    ISortField field,
    ObjectFieldNode node,
    [NotNullWhen(true)] out ISyntaxVisitorAction? action)
  {
    action = SyntaxVisitor.SkipAndLeave;

    if (node.Value.GetValueKind() == ValueKind.Enum
        && node.Value.Value is not null)
    {
      var repository = _serviceProvider.GetRequiredService<IReadRepository<TExternalEntity>>();

      var isAsc = "ASC" == (string)node.Value.Value;

      var idArray = repository
        .AsQueryable()
        .OrderBy(_orderWeightExpression)
        .Select(e => e.Id)
        .ToArray();

      var idDictionary = idArray
        .Select((element, index) => new { element, index })
        .ToDictionary(o => o.element, o => o.index);
            
      var orderExpressionLambda = _orderExpressionMaker(idDictionary);
      var orderExpressionParameter = orderExpressionLambda.Parameters.Single();
      var orderExpressionBody = orderExpressionLambda.Body;

      var operation = new ExternalSortOperation(
        isAsc,
        ReplaceParameterVisitor.Replace(orderExpressionBody, orderExpressionParameter, context.Instance.First().Selector),
        context.Instance.Last().ParameterExpression);

      context.Operations.Enqueue(operation);

      return true;
    }

    return false;
  }
}
