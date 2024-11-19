using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.SubjectCategoryAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Anag.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Anag.Mapping;

public class LegalSubjectMapper : SubjectMapper<LegalSubjectInput, LegalSubject>
{
  public LegalSubjectMapper(IMapper mapper, IRepository<Subject> subjectRepository, IRepository<SubjectCategory> categoryRepository)
    : base(mapper, subjectRepository, categoryRepository)
  {
  }

  public override async Task<LegalSubject?> MapAsync(LegalSubjectInput? from, LegalSubject? into, CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var subject = into ?? new LegalSubject();
    subject.SetFullName(from.FullName);
    subject.SetShorthandDescription(from.ShorthandDescription);
    subject.SetBaseCountryTaxIdCode(from.BaseCountryTaxIdCode);
    subject.SetLegalSubjectType(from.LegalSubjectType);

    await MapBaseAsync(from, subject, cancellationToken);

    subject.SetAdditionalTaxIdCode(from.AdditionalTaxIdCode);
    subject.UpdateBusinessData(from.BusinessStart, from.ShareCapital, from.CompaniesHouseIdCode, from.AdditionalGovIdCode);
    subject.UpdateGroupSignature(from.InterGroupSignature);
    subject.UpdateBankingData(from.BankingId1, from.BankingId2);

    // we are using tracking in the queries below to resolve identities:
    if (from.CompanyGroup is not null && from.CompanyGroup.Id is not null)
    {
      var group = await SubjectRepository
        .AsQueryable(new GetByIdSpec<Subject>(from.CompanyGroup.Id.Value))
        .SingleAsync(cancellationToken);

      subject!.SetCompanyGroupParent(group!,
        from.CompanyGroup.GroupRelation == CompanyGroup.Leader,
        from.CompanyGroup.Notes);
    }

    var ownerManagementSubjects = await SubjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(from.OwnerManagementSubjectIds))
      .ToArrayAsync(cancellationToken);

    subject.SetOwnerManagementSubjects(ownerManagementSubjects!);
    return subject;
  }
}
