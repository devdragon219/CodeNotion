using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Web.Anag.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Anag.Mapping;

public class AddressMapper : IMapper<AddressInput, Address>
{
  private readonly IReadRepository<City> _cityRepository;

  public AddressMapper(IReadRepository<City> cityRepository)
  {
    _cityRepository = cityRepository;
  }

  public async Task<Address?> MapAsync(AddressInput? from, Address? into, CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var city = from.CityId.HasValue
      ? await _cityRepository.AsQueryable().AsNoTracking().FirstOrDefaultAsync(city => city.Id == from.CityId.Value, cancellationToken)
      : null;

    var address = into ?? new Address();

    address.SetCity(city?.Name ?? from.CityName, city?.Guid);
    address.SetToponymy(from.Toponymy);
    address.SetType(from.AddressType);

    if (into is null && from.Id.GetValueOrDefault() != default)
    {
      address.Id = from.Id!.Value;
    }

    address.SetNumbering(from.Numbering);
    address.SetCounty(from.CountyName ?? city?.CountyName, city?.CountyGuid);
    address.SetRegion(from.RegionName ?? city?.RegionName, city?.RegionGuid);
    address.SetCountry(from.CountryISO ?? city?.CountryISO, city?.CountryName);
    address.SetLocalPostCode(from.LocalPostCode);
    address.SetNotes(from.Notes);

    return address;
  }
}
