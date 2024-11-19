using Ardalis.Specification;

namespace RealGimm.Core.Anag.SubjectAggregate.Specifications;

public class SubjectIncludeForRegistryCommunicationConfirmationSpec : Specification<Subject>
{
  public SubjectIncludeForRegistryCommunicationConfirmationSpec()
  {
    Query
      .Include(subject => subject.BankAccounts.OrderBy(bankAccount => bankAccount.Id))
      .Include(subject => subject.RelationMains.OrderBy(relation => relation.Id))
        .ThenInclude(relation => relation.Subordinate)
      .Include(subject => subject.RelationSubordinates.OrderBy(relation => relation.Id))
        .ThenInclude(relation => relation.Main);
  }
}

