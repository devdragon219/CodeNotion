using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.SubjectCategoryAggregate;
using RealGimm.Web.Anag.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Anag.Mapping;

public class ManagementSubjectMapper : SubjectMapper<ManagementSubjectInput, ManagementSubject>
{
  public ManagementSubjectMapper(IMapper mapper, IRepository<Subject> subjectRepository, IRepository<SubjectCategory> categoryRepository)
    : base(mapper, subjectRepository, categoryRepository)
  {
  }

  public override async Task<ManagementSubject?> MapAsync(ManagementSubjectInput? from, ManagementSubject? into, CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var subject = into ?? new ManagementSubject();
    subject.SetFullName(from.FullName);
    subject.SetShorthandDescription(from.ShorthandDescription);
    subject.SetManagementCode(from.ManagementCode);
    subject.SetBaseCountryTaxIdCode(from.BaseCountryTaxIdCode);

    await MapBaseAsync(from, subject, cancellationToken);

    subject.SetCompanyGroupParent(subject,
      from.CompanyGroup?.GroupRelation == CompanyGroup.Leader,
      from.CompanyGroup?.Notes);
    subject.SetAdditionalTaxIdCode(from.AdditionalTaxIdCode);
    subject.UpdateBusinessData(from.BusinessStart, from.ShareCapital, from.CompaniesHouseIdCode, from.AdditionalGovIdCode);
    subject.UpdateGroupSignature(from.InterGroupSignature);
    subject.UpdateBankingData(from.BankingId1, from.BankingId2);

    return subject;
  }
}


