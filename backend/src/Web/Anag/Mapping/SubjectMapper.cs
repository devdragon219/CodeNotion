using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.SubjectCategoryAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Anag.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Anag.Mapping;

public abstract class SubjectMapper<TSubjectInput, TSubject> : MapperBase, IMapper<TSubjectInput, TSubject>
  where TSubjectInput : SubjectInput
  where TSubject : Subject
{
  protected IMapper Mapper { get; }
  protected IRepository<Subject> SubjectRepository { get; }
  protected IRepository<SubjectCategory> CategoryRepository { get; }

  public SubjectMapper(IMapper mapper, IRepository<Subject> subjectRepository, IRepository<SubjectCategory> categoryRepository)
  {
    Mapper = mapper;
    SubjectRepository = subjectRepository;
    CategoryRepository = categoryRepository;
  }

  public abstract Task<TSubject?> MapAsync(TSubjectInput? from, TSubject? into, CancellationToken cancellationToken = default);

  protected async Task MapBaseAsync(TSubjectInput input, TSubject subject, CancellationToken cancellationToken)
  {
    if (subject.Id == default && input.Id.GetValueOrDefault() != default)
    {
      subject.Id = input.Id!.Value;
    }

    subject.SetEntryStatus(
      input.EntryStatus,
      input.ClosureDate?.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc)
    );
    
    subject.SetInternalCode(input.InternalCode);
    subject.SetExternalSourceCode(input.ExternalSourceCode);
    subject.SetCustomPersonType(input.CustomPersonType);
    subject.SetCustomSubjectStatus(input.CustomSubjectStatus);

    await UpdateCollectionAsync(input.Addresses,
      Mapper,
      () => subject.Addresses,
      subject.AddAddress,
      subject.RemoveAddress,
      cancellationToken);

    await UpdateCollectionAsync(input.Contacts,
      Mapper,
      () => subject.Contacts,
      subject.AddContact,
      subject.RemoveContact,
      cancellationToken);

    await UpdateCollectionAsync(input.BankAccounts,
      Mapper,
      () => subject.BankAccounts,
      subject.AddBankAccount,
      subject.RemoveBankAccount,
      cancellationToken);

    await UpdateCollectionAsync(input.TaxStatuses,
      Mapper,
      () => subject.TaxStatuses,
      subject.AddTaxStatus,
      subject.RemoveTaxStatus,
      cancellationToken);

    var categories = await CategoryRepository
      .AsQueryable(new GetByIdsSpec<SubjectCategory>(input.CategoriesIds))
      .ToArrayAsync(cancellationToken: cancellationToken);

    subject.SetCategories(categories!);

    //Officer To Add
    var existingOfficers = subject.Officers;

    foreach (var officerToAdd in input.Officers
      .Where(off => !subject.Officers.Any(eoff => eoff.SubordinateId == off.OfficerId)))
    {
      var officerSubject = await SubjectRepository
        .AsQueryable(new GetByIdSpec<Subject>(officerToAdd.OfficerId))
        .SingleAsync(cancellationToken);

      subject.AddOfficer(officerSubject,
        officerToAdd.OfficerType,
        officerToAdd.Since,
        officerToAdd.Until,
        officerToAdd.Notes);
    }

    //Officer To Remove/Update
    foreach (var officerToUpdate in input.Officers
      .Where(fo => existingOfficers.Any(eo => eo.SubordinateId == fo.OfficerId)))
    {
      var officerRelation = existingOfficers.First(h => h.SubordinateId == officerToUpdate.OfficerId);
      officerRelation.SetTimeRange(officerToUpdate.Since, officerToUpdate.Until);
      officerRelation.SetOfficerRelationType(officerToUpdate.OfficerType);
      officerRelation.SetNotes(officerRelation.Notes);
    }

    foreach (var officerToRemove in existingOfficers.Where(eoff => !input.Officers.Any(ioff => ioff.OfficerId == eoff.SubordinateId)))
    {
      subject.RemoveOfficerById(officerToRemove.SubordinateId);
    }
  }
}
