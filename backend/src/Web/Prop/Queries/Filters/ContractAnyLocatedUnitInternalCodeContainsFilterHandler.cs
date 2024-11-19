using System.Diagnostics.CodeAnalysis;
using System.Linq.Expressions;
using HotChocolate.Data.Filters;
using HotChocolate.Data.Filters.Expressions;
using HotChocolate.Language.Visitors;
using HotChocolate.Language;
using RealGimm.Core;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateSubUnitAggregate;

namespace RealGimm.Web.Prop.Queries.Filters;

public class ContractAnyLocatedUnitInternalCodeContainsFilterHandler : QueryableDefaultFieldHandler
{
  private readonly IServiceProvider _serviceProvider;

  public ContractAnyLocatedUnitInternalCodeContainsFilterHandler(IServiceProvider serviceProvider)
  {
    _serviceProvider = serviceProvider;
  }

  public override bool TryHandleEnter(QueryableFilterContext context,
    IFilterField field,
    ObjectFieldNode node,
    [NotNullWhen(true)] out ISyntaxVisitorAction? action)
  {
    if (node.Value is not StringValueNode { Value: var containsTarget })
    {
      throw new NotSupportedException();
    }

    var estateUnitsIds = _serviceProvider
      .GetRequiredService<IReadRepository<EstateUnit>>()
      .AsQueryable()
      .Where(estateUnit => estateUnit.InternalCode.Contains(containsTarget))
      .Select(estateUnit => estateUnit.Id)
      .ToList();

    var estateSubUnitsIds = _serviceProvider
      .GetRequiredService<IReadRepository<EstateSubUnit>>()
      .AsQueryable()
      .Where(estateSubUnit => estateSubUnit.InternalCode.Contains(containsTarget))
      .Select(estateSubUnit => estateSubUnit.Id)
      .ToList();

    Expression<Func<Contract, bool>> lambdaExpression = (contract) =>
      contract.LocatedUnits.Any(locatedUnit =>
        locatedUnit.EstateSubUnitId.HasValue
          ? estateSubUnitsIds.Contains(locatedUnit.EstateSubUnitId.Value)
          : estateUnitsIds.Contains(locatedUnit.EstateUnitId));

    var invokeExpression = Expression.Invoke(lambdaExpression, context.GetInstance());
    context.GetLevel().Enqueue(invokeExpression);

    action = SyntaxVisitor.SkipAndLeave;

    return true;
  }

  public override bool TryHandleLeave(QueryableFilterContext context, IFilterField field, ObjectFieldNode node, [NotNullWhen(true)] out ISyntaxVisitorAction? action)
  {
    action = SyntaxVisitor.Skip;
    return true;
  }
}
