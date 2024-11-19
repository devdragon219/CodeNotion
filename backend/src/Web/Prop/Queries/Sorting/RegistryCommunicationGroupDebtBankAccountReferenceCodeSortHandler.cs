using System.Diagnostics.CodeAnalysis;
using HotChocolate.Data.Sorting;
using HotChocolate.Data.Sorting.Expressions;
using HotChocolate.Language.Visitors;
using HotChocolate.Language;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;
using RealGimm.WebCommons.Sorting;
using System.Linq.Expressions;

namespace RealGimm.Web.Prop.Queries.Sorting;

public class RegistryCommunicationGroupDebtBankAccountReferenceCodeSortHandler : QueryableDefaultSortFieldHandler
{
  private readonly IServiceProvider _serviceProvider;

  public RegistryCommunicationGroupDebtBankAccountReferenceCodeSortHandler(IServiceProvider serviceProvider)
  {
    _serviceProvider = serviceProvider;
  }

  public override bool TryHandleEnter(QueryableSortContext context,
    ISortField field,
    ObjectFieldNode node,
    [NotNullWhen(true)] out ISyntaxVisitorAction? action)
  {
    action = SyntaxVisitor.SkipAndLeave;

    if (node.Value.Value is not string { } value)
    {
      return false;
    }

    var repository = _serviceProvider.GetRequiredService<IReadRepository<Subject>>();
    var isAscendingOrdering = value == "ASC";

    var orderedBankAccountIds = _serviceProvider
      .GetRequiredService<IReadRepository<Subject>>()
      .AsQueryable()
      .SelectMany(subject => subject.BankAccounts)
      .OrderBy(bankAccount => bankAccount.ReferenceCode)
      .Select(bankAccount => bankAccount.Id)
      .AsEnumerable()
      .Select((bankAccount, index) => (BankAccount: bankAccount, Index: index))
      .ToDictionary(bankAccount => bankAccount.BankAccount, bankAccount => bankAccount.Index);

    Expression<Func<RegistryCommunicationGroup, int>> orderExpressionLambda = (RegistryCommunicationGroup group)
      => group.Id.RequestingSubjectLegalRepresentativeId.HasValue
        ? orderedBankAccountIds[group.Id.RequestingSubjectLegalRepresentativeId.Value]
        : int.MinValue;

    var orderExpressionParameter = orderExpressionLambda.Parameters.Single();
    var orderExpressionBody = orderExpressionLambda.Body;

    var operation = new ExternalSortOperation(
      isAscendingOrdering,
      ReplaceParameterVisitor.Replace(orderExpressionBody, orderExpressionParameter, context.Instance.First().Selector),
      context.Instance.Last().ParameterExpression);

    context.Operations.Enqueue(operation);

    return true;
  }
}
