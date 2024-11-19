using RealGimm.Core;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public class AddressMapper : IMapper<AddressInput, Address>
{
  private readonly IRepository<City> _cityRepository;
  public AddressMapper(IRepository<City> cityRepository)
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
      ? await _cityRepository.GetByIdAsync(from.CityId.Value, cancellationToken)
      : null;

    var address = into ?? new Address();

    address.SetCity(city?.Name ?? from.CityName, city?.Guid);
    address.SetToponymy(from.Toponymy);
    address.SetType(from.AddressType);

    address.SetNumbering(from.Numbering);
    address.SetLocation(from.LocationLatLon);
    address.SetCounty(from.CountyName ?? city?.CountyName, city?.CountyGuid);
    address.SetRegion(from.RegionName ?? city?.RegionName, city?.RegionGuid);
    address.SetCountry(from.CountryISO ?? city?.CountryISO, city?.CountryName);
    address.SetLocalPostCode(from.LocalPostCode);
    address.SetNotes(from.Notes);

    if (into is null)
    {
      address.Id = from.Id.GetValueOrDefault();
    }

    return address;
  }
}
