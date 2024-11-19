using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Common.InterestRateAggregate;
using RealGimm.Core.Common.InterestRateAggregate.Specification;
using RealGimm.Core.Common.Interfaces;
using RealGimm.Infrastructure.Common.InterestRateProvider.Models;

namespace RealGimm.Infrastructure.Common.InterestRateProvider;

public class InterestRateProviderIta : IInterestRateProvider
{
  private readonly ILogger<InterestRateProviderIta> _logger;
  private readonly IRepository<InterestRate> _repository;

  public InterestRateProviderIta(ILogger<InterestRateProviderIta> logger,
    IRepository<InterestRate> repository)
  {
    _logger = logger;
    _repository = repository;
  }

  public Guid Id => new("a046ddea-8d19-4175-afe2-70ac4566679b");

  public bool CanHandleCountry(string countryIso3)
  {
    return countryIso3.ToUpperInvariant() == CountryISO3.ITA;
  }

  public async Task ImportUpdatesMasterList(string countryIso3, CancellationToken cancellationToken = default)
  {
    if (countryIso3.ToUpperInvariant() != CountryISO3.ITA)
    {
      throw new ArgumentOutOfRangeException(nameof(countryIso3));
    }

    var current = await _repository
      .AsQueryable(new InterestRateByCountrySpec(CountryISO3.ITA))
      .ToListAsync(cancellationToken);

    foreach (var toUpdate in current.Where(cd =>
      _localData.Any(ld => cd.Since == ld.StartDate && cd.Until == ld.EndDate && cd.Rate != ld.InterestRate)))
    {
      toUpdate.SetRate(
        _localData.First(
          ld => ld.StartDate == toUpdate.Since && ld.EndDate == toUpdate.Until
        ).InterestRate);

      await _repository.UpdateAsync(toUpdate, cancellationToken);
    }

    await _repository.AddRangeAsync(_localData
      .Where(ld =>
        !current.Any(cd => cd.Since == ld.StartDate && cd.Until == ld.EndDate))
      .Select(ld =>
      {
        var newInterestRate = new InterestRate();
        newInterestRate.SetDates(ld.StartDate, ld.EndDate);
        newInterestRate.SetRate(ld.InterestRate);
        newInterestRate.SetCountry(CountryISO3.ITA);
        return newInterestRate;
      }),
      cancellationToken
      );

    _logger.LogInformation("Interest rates imported/updated for Italy.");
  }

  static readonly InterestRateDto[] _localData = {
    new(1942, 4, 21, 1990, 12, 15, 5),
    new(1990, 12, 16, 1996, 12, 31, 10),
    new(1997, 1, 1, 1998, 12, 31, 5),
    new(1999, 1, 1, 2000, 12, 31, 2.5M),
    new(2001, 1, 1, 2001, 12, 31, 3.5M),
    new(2002, 1, 1, 2003, 12, 31, 3),
    new(2004, 1, 1, 2007, 12, 31, 2.5M),
    new(2008, 1, 1, 2009, 12, 31, 3),
    new(2010, 1, 1, 2010, 12, 31, 1),
    new(2011, 1, 1, 2011, 12, 31, 1.5M),
    new(2012, 1, 1, 2013, 12, 31, 2.5M),
    new(2014, 1, 1, 2014, 12, 31, 1),
    new(2015, 1, 1, 2015, 12, 31, 0.5M),
    new(2016, 1, 1, 2016, 12, 31, 0.2M),
    new(2017, 1, 1, 2017, 12, 31, 0.1M),
    new(2018, 1, 1, 2018, 12, 31, 0.3M),
    new(2019, 1, 1, 2019, 12, 31, 0.8M),
    new(2020, 1, 1, 2020, 12, 31, 0.05M),
    new(2021, 1, 1, 2021, 12, 31, 0.01M),
    new(2022, 1, 1, 2022, 12, 31, 1.25M),
    new(2023, 1, 1, 2023, 12, 31, 5),
    new(2024, 1, 1, 2024, 12, 31, 2.5M)
  };

}
