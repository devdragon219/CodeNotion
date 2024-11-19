using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.SubjectAggregate.Events;
using RealGimm.Core.Anag.SubjectAggregate.Specifications;
using RealGimm.Core.Anag.SubjectCategoryAggregate;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.CityAggregate.Specifications;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.IAM.UserAggregate.Specifications;
using RealGimm.Core.Shared;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;
using Rebus.Bus;

namespace RealGimm.Core.Anag.Services;

public class SubjectUpsertService
{
  private readonly IRepository<Subject> _subjects;
  private readonly IRepository<City> _cities;
  private readonly IRepository<User> _users;
  private readonly CheckItalianTaxID _checkItalianTaxID;
  private readonly IBus _bus;
  private readonly IUserDataProvider _user;
  private bool _skipValidation;

  public SubjectUpsertService(
    IRepository<Subject> repository,
    IRepository<City> citiesRepository,
    IRepository<User> usersRepository,
    CheckItalianTaxID checkItalianTaxID,
    IBus bus,
    IUserDataProvider user)
  {
    _subjects = repository;
    _cities = citiesRepository;
    _users = usersRepository;
    _checkItalianTaxID = checkItalianTaxID;
    _user = user;
    _bus = bus;
  }

  public void EnableSkipValidation() => _skipValidation = true;

  public async Task<Result<TSubject>> Upsert<TSubject>(
    TSubject subject,
    CancellationToken cancellationToken = default)
    where TSubject : Subject
  {
    if(!_skipValidation) {
      var validationErrors = subject!.Validate();
      if (validationErrors.Any())
      {
        return Result<TSubject>.Invalid(validationErrors.ToList());
      }
    }

    //Check for any other subject with same parent entity and same intergroup signature
    if (subject is LegalSubject
      {
        InterGroupSignature: not "" and not null,
        CompanyGroupParent.Main: not null
      } legalSubject)
    {
      var subjectWithSameSignature = await _subjects.FirstOrDefaultAsync(
        new SubjectByGroupSignatureSpec(legalSubject.InterGroupSignature, legalSubject.CompanyGroupParent!.MainId),
        cancellationToken);

      if (subjectWithSameSignature is not null &&
        (subject.Id == default || subject.Id != subjectWithSameSignature.Id))
      {
        return Result<TSubject>.Invalid(ErrorCode.DuplicateInterGroupSignature.ToValidationError());
      }
    }

    if (subject is PhysicalSubject pSubject)
    {
      var cadastralCode = await _cities
        .AsQueryable(new CityByGuidSpec(pSubject.BirthLocation?.CityReference))
        .Select(city => city.CadastralCode)
        .FirstOrDefaultAsync(cancellationToken: cancellationToken);

      if (!_skipValidation &&
        pSubject.BirthLocation?.CountryISO?.ToUpper() == "ITA" &&
        !string.IsNullOrWhiteSpace(cadastralCode) &&
        !string.IsNullOrWhiteSpace(pSubject.FirstName) &&
        !string.IsNullOrWhiteSpace(pSubject.LastName) &&
        !string.IsNullOrWhiteSpace(pSubject.BirthCountryTaxIdCode) &&
        pSubject.BirthSex.HasValue &&
        pSubject.BirthDate.HasValue &&
        !_checkItalianTaxID.Check(
          pSubject.FirstName,
          pSubject.LastName,
          pSubject.BirthSex.Value == BirthSex.Male ? "M" : "F",
          pSubject.BirthDate.Value,
          cadastralCode,
          pSubject.BirthCountryTaxIdCode))
      {
        return Result<TSubject>.Invalid(ErrorCode.BirthCountryTaxIdCodeIsInvalid.ToValidationError());
      }
    }

    if (subject.Id is default(int))
    {
      //Check for any other subject with same internalCode
      if (await _subjects.AnyAsync(new GetByInternalCodeSpec<Subject>(subject.InternalCode), cancellationToken))
      {
        return Result<TSubject>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
      }

      await _subjects.AddAsync(subject, cancellationToken);

      if (subject is ManagementSubject)
      {
        var author = await _users
          .AsQueryable(new UserByUsernameSpec(_user.Username))
          .FirstOrDefaultAsync(cancellationToken);

        if (author is not null)
        {
          author.SetSubjectsAndOrgUnits(
            (author.Subjects ?? Array.Empty<int>())
              .Concat(new[] { subject.Id }).Distinct().ToArray(),
            author.OrgUnits);

          await _users.UpdateAsync(author, cancellationToken);
        }
      }

      await _bus.Publish(new SubjectCreatedEvent(subject.Id, _user.Username));

      return subject;
    }
    else
    {
      //Check for internalCode collision with other subjects
      var isDuplicateCode = await _subjects
        .AsQueryable(new GetByInternalCodeSpec<Subject>(subject.InternalCode), new ExcludeByIdSpec<Subject>(subject.Id))
        .AnyAsync(cancellationToken);

      if (isDuplicateCode)
      {
        return Result<TSubject>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
      }
    }

    var exists = await _subjects.AnyAsync(new GetByIdSpec<Subject>(subject.Id), cancellationToken);
    if (!exists)
    {
      return Result<TSubject>.NotFound();
    }
    _subjects.UpdateSuspend(subject);

    await _subjects.UpsertCollectionAsync(subject, x => x.Addresses, cancellationToken);
    await _subjects.UpsertCollectionAsync(subject, x => x.Contacts, cancellationToken);
    await _subjects.UpsertCollectionAsync(subject, x => x.BankAccounts, cancellationToken);
    await _subjects.UpsertCollectionAsync(subject, x => x.TaxStatuses, cancellationToken);

    //These two will apply a specific logic
    await _subjects.UpsertCollectionAsync(subject, x => x.RelationMains, cancellationToken);
    await _subjects.UpsertCollectionAsync(subject, x => x.RelationSubordinates, cancellationToken);

    await UpsertSubjectCategoriesRelationsAsync();

    await _subjects.SaveChangesAsync(cancellationToken);

    return subject;

    async Task UpsertSubjectCategoriesRelationsAsync()
    {
      var newCategories = subject.Categories.ToArray();

      subject.SetCategories(Array.Empty<SubjectCategory>());

      await _subjects.LoadCollectionAsync(subject, x => x.Categories, cancellationToken);

      var categoriesToDetach = subject.Categories
        .Where(category => !newCategories.Select(x => x.Id).Contains(category.Id))
        .ToArray();

      foreach (var category in categoriesToDetach)
      {
        subject.RemoveCategory(category);
      }

      subject.SetCategories(newCategories);
    }
  }
}
