using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Econ.TaxCreditAggregate;
using RealGimm.Web.Econ.Models;
using RealGimm.Core.Anag.SubjectAggregate;

namespace RealGimm.Web.Econ.Mapping;

public sealed class TaxCreditMapper : IMapper<AddTaxCreditInput, TaxCredit>
{
  private readonly IReadRepository<Subject> _subjectRepository;

  public TaxCreditMapper(IReadRepository<Subject> subjectRepository)
  {
    _subjectRepository = subjectRepository;
  }

  public async Task<TaxCredit?> MapAsync(AddTaxCreditInput? from, TaxCredit? into, CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    if (into is not null)
    {
      throw new NotSupportedException();
    }

    var taxCredit = new TaxCredit();
    taxCredit.SetTaxCode(from.TaxCode);
    taxCredit.SetDescription(from.Description);
    taxCredit.SetNotes(from.Notes);

    if (!await CheckManagementSubjectExists(from.ManagementSubjectId, cancellationToken))
    {
      throw new MappingException(ErrorCode.TaxCreditNonExistingManagementSubject.ToValidationError());
    }
    
    taxCredit.SetManagementSubjectId(from.ManagementSubjectId);

    var initialOperation = new Operation();
    initialOperation.SetAmount(from.Amount);
    initialOperation.SetDate(from.Date);

    taxCredit.Operations.Add(initialOperation);

    return taxCredit;
  }

  private async Task<bool> CheckManagementSubjectExists(int managementSubjectId, CancellationToken cancellationToken)
    => await _subjectRepository
        .AsQueryable(new GetByIdSpec<Subject>(managementSubjectId))
        .OfType<ManagementSubject>()
        .AnyAsync(cancellationToken);
}
