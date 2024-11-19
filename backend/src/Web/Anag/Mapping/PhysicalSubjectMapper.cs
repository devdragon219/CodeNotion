using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.SubjectAggregate.Specifications;
using RealGimm.Core.Anag.SubjectCategoryAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Anag.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Anag.Mapping;

public class PhysicalSubjectMapper : SubjectMapper<PhysicalSubjectInput, PhysicalSubject>
{
  public PhysicalSubjectMapper(IMapper mapper, IRepository<Subject> subjectRepository, IRepository<SubjectCategory> categoryRepository)
    : base(mapper, subjectRepository, categoryRepository)
  {
  }

  public override async Task<PhysicalSubject?> MapAsync(PhysicalSubjectInput? from, PhysicalSubject? into, CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var subject = into ?? new PhysicalSubject();

    await MapBaseAsync(from, subject, cancellationToken);

    subject.SetCustomGender(from.CustomGender);
    subject.SetNames(from.FirstName, from.LastName);
    subject.SetBirthCountryTaxIdCode(from.BirthCountryTaxIdCode);
    subject.SetProfessionalTaxIdCode(from.ProfessionalTaxIdCode);
    subject.SetLifePeriod(
      from.BirthDate,
      from.DeathDate
    );
    subject.SetBirthSex(from.BirthSex);

    if (from.BirthLocation is not null)
    {
      subject.SetBirthLocation((await Mapper.MapAsync(
        from.BirthLocation,
        into?.BirthLocation,
        cancellationToken))!);
    }

    //Heir To Add
    foreach (var heirInputToAdd in into is null
      ? from.Heirs
      : from.Heirs.Where(h => !into.Heirs.Any(ih => ih.SubordinateId == h.Id)))
    {
      var heirSubject = await SubjectRepository
        .AsQueryable(new GetByIdSpec<Subject>(heirInputToAdd.Id), new SubjectRelationsSpec())
        .SingleAsync(cancellationToken);

      if (!heirSubject.OwningMgmtSubjects.Select(sr => sr.MainId)
        .Intersect(from.OwnerManagementSubjectIds)
        .Any())
      {
        throw new MappingException(ErrorCode.HeirMustBeManagedByCommonManagementSubject.ToValidationError());
      }

      if (heirSubject is PhysicalSubject physicalHeir)
      {
        subject.AddHeir(physicalHeir, heirInputToAdd.Since, heirInputToAdd.Notes);
      }
      else
      {
        throw new ArgumentOutOfRangeException($"Heir {heirInputToAdd.Id} is not a physical subject");
      }
    }

    //Heir To Remove/Update
    if (into is not null)
    {
      foreach (var heirToUpdate in from.Heirs.Where(fh => into.Heirs.Any(ih => ih.Subordinate.Id == fh.Id)))
      {
        var heirRelation = into.Heirs.First(h => h.Subordinate.Id == heirToUpdate.Id);
        heirRelation.SetTimeRange(heirToUpdate.Since, null);
        heirRelation.SetNotes(heirRelation.Notes);
      }

      foreach (var heirToRemove in into.Heirs.Where(ih => !from.Heirs.Any(fh => fh.Id == ih.Subordinate.Id)))
      {
        subject.RemoveHeirById(heirToRemove.Subordinate.Id);
      }
    }

    var ownerManagementSubjects = await SubjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(from.OwnerManagementSubjectIds))
      .ToArrayAsync(cancellationToken);

    subject.SetOwnerManagementSubjects(ownerManagementSubjects!);

    return subject;
  }
}
