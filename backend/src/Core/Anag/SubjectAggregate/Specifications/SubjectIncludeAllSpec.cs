using Ardalis.Specification;

namespace RealGimm.Core.Anag.SubjectAggregate.Specifications;

public class SubjectIncludeAllSpec : Specification<Subject>
{
  public SubjectIncludeAllSpec()
  {
    Query
      .Include(subject => subject.Addresses.OrderBy(sc => sc.Id))
      .Include(subject => subject.Contacts.OrderBy(sc => sc.Id))
      .Include(subject => subject.BankAccounts.OrderBy(sc => sc.Id))
      .Include(subject => subject.TaxStatuses)
      .Include(subject => subject.Categories.OrderBy(sc => sc.Id))
      .Include(subject => subject.RelationMains)
        .ThenInclude(relation => relation.Subordinate)
      .Include(subject => subject.RelationSubordinates)
        .ThenInclude(relation => relation.Main)
      .AsSplitQuery();
  }
}

