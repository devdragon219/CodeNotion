using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using RealGimm.Core.Anag.SubjectCategoryAggregate;
using RealGimm.Core.Mtnt.Interfaces;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Anag;

public class AnagDataSeeder : IModuleDataSeeder
{
  private readonly ILogger<AnagDataSeeder> _log;
  private readonly IRepository<SubjectCategory> _subjectCategories;
  private readonly IStringLocalizer _localizer;

  public AnagDataSeeder(
      ILogger<AnagDataSeeder> log,
      IRepository<SubjectCategory> categories,
      IStringLocalizer localizer
  )
  {
    _subjectCategories = categories;
    _log = log;
    _localizer = localizer;
  }

  public async Task InitializeAsync()
  {
    if (await _subjectCategories.CountAsync() > 0)
    {
      //Skip
      _log.LogInformation("Not running data seeder on already-initialized repository.");
      return;
    }

    _log.LogInformation("Adding default subject categories...");

    await _subjectCategories.AddAsync(new SubjectCategory(
        _localizer["DefaultCategory.Officer"],
        CategoryFunction.Officer
    ));

    await _subjectCategories.AddAsync(new SubjectCategory(
        _localizer["DefaultCategory.Tenant"],
        CategoryFunction.Tenant
    ));

    await _subjectCategories.AddAsync(new SubjectCategory(
        _localizer["DefaultCategory.Landlord"],
        CategoryFunction.Landlord
    ));

    await _subjectCategories.AddAsync(new SubjectCategory(
        _localizer["DefaultCategory.Supplier"],
        CategoryFunction.Supplier
    ));

    await _subjectCategories.AddAsync(new SubjectCategory(
        _localizer["DefaultCategory.AgreementParty"],
        CategoryFunction.AgreementParty
    ));

    await _subjectCategories.AddAsync(new SubjectCategory(
        _localizer["DefaultCategory.CompanyGroup"],
        CategoryFunction.CompanyGroup
    ));

    await _subjectCategories.AddAsync(new SubjectCategory(
        _localizer["DefaultCategory.Heir"],
        CategoryFunction.Heir
    ));

    await _subjectCategories.AddAsync(new SubjectCategory(
        _localizer["DefaultCategory.BuildingAdministrator"],
        CategoryFunction.BuildingAdministrator
    ));
  }

  public Task UpdateAsync()
  {
    return Task.CompletedTask;
  }
}
