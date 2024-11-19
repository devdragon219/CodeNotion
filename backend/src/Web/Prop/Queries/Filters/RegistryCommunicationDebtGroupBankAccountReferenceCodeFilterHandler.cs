using System.Diagnostics.CodeAnalysis;
using System.Linq.Expressions;
using HotChocolate.Data.Filters;
using HotChocolate.Data.Filters.Expressions;
using HotChocolate.Language.Visitors;
using HotChocolate.Language;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;

namespace RealGimm.Web.Prop.Queries.Filters;

public class RegistryCommunicationDebtGroupBankAccountReferenceCodeFilterHandler : QueryableDefaultFieldHandler
{
  private readonly IServiceProvider _serviceProvider;

  public RegistryCommunicationDebtGroupBankAccountReferenceCodeFilterHandler(IServiceProvider serviceProvider)
  {
    _serviceProvider = serviceProvider;
  }

  public override bool TryHandleEnter(
    QueryableFilterContext context,
    IFilterField field,
    ObjectFieldNode node,
    [NotNullWhen(true)] out ISyntaxVisitorAction? action)
  {
    if (node.Value is not ObjectValueNode
      {
        Fields: [ObjectFieldNode { Name.Value: "contains", Value: StringValueNode { Value: var containsTarget } }]
      })
    {
      throw new NotSupportedException();
    }

    var bankAccountIds = _serviceProvider
      .GetRequiredService<IReadRepository<Subject>>()
      .AsQueryable()
      .SelectMany(subject => subject.BankAccounts)
      .Where(bankAccount =>
        bankAccount.ReferenceCode != null &&
        bankAccount.ReferenceCode.Contains(containsTarget))
      .Select(bankAccount => bankAccount.Id)
      .ToList();

    Expression<Func<RegistryCommunicationGroup, bool>> lambdaExpression = group
      => group.Id.DebtBankAccountId.HasValue && bankAccountIds.Contains(group.Id.DebtBankAccountId.Value);

    var invokeExpression = Expression.Invoke(lambdaExpression, context.GetInstance());
    context.GetLevel().Enqueue(invokeExpression);

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
