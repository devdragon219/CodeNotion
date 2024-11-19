using Ardalis.Specification;

namespace RealGimm.Core.Anag.SubjectAggregate.Specifications;

public class SubjectIncludeForListSpec : Specification<Subject>
{
  public SubjectIncludeForListSpec()
  {
    Query
      .Include(subject => subject.Addresses.OrderBy(sc => sc.Id))
      .Include(subject => subject.Contacts.OrderBy(sc => sc.Id))
      .Include(subject => subject.BankAccounts.OrderBy(sc => sc.Id));
  }
}

