using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.SubjectAggregate.Specifications;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Prop.AdministrationAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Prop.Mapping;

public class AdministrationMapper : IMapper<AdministrationInput, Administration>
{
  private readonly IReadRepository<Estate> _estateRepository;
  private readonly IReadRepository<Subject> _subjectRepository;

  public AdministrationMapper(
    IReadRepository<Estate> estateRepository,
    IReadRepository<Subject> subjectRepository)
  {
    _estateRepository = estateRepository;
    _subjectRepository = subjectRepository;
  }

  public async Task<Administration?> MapAsync(AdministrationInput? from, Administration? into, CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var item = into ?? new Administration();

    var estate = await _estateRepository.AsQueryable(new GetByIdSpec<Estate>(from.EstateId)).SingleOrDefaultAsync(cancellationToken);
    if (estate is null) throw new MappingException(ErrorCode.AdministrationNonExistingEstate.ToValidationError());

    var subject = await _subjectRepository.AsQueryable(new GetByIdSpec<Subject>(from.AdministratorSubjectId), new SubjectIncludeAllSpec()).SingleOrDefaultAsync(cancellationToken);
    if (subject is null) throw new MappingException(ErrorCode.AdministrationNonExistingSubject.ToValidationError());

    if (subject.BankAccounts.Any() 
        && from.AdministratorBankAccountId is not null
        && !subject.BankAccounts.Select(e => e.Id).Contains(from.AdministratorBankAccountId.Value))
    {
      throw new MappingException(ErrorCode.AdministrationNonExistingSubjectBankAccount.ToValidationError());
    }

    item.SetEstateId(from.EstateId);
    item.SetAdministratorSubjectId(from.AdministratorSubjectId);
    item.SetAdministratorBankAccountId(from.AdministratorBankAccountId);
    item.SetAdministrationType(from.AdministrationType);
    item.SetPaymentType(from.PaymentType);
    item.SetSince(from.Since);
    item.SetUntil(from.Until);
    item.SetNotes(from.Notes);
    item.SetIsPaymentDataIncluded(from.IsPaymentDataIncluded);

    return item;
  }
}
