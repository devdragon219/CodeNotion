using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Shared;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateAggregate.Specifications;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Plugin.Import.Asst.Models;

namespace RealGimm.Plugin.Import.Asst;

public class EstateMapper
{
  public required IRepository<Estate> _estateRepository { protected get; init; }
  public required IReadRepository<EstateUsageType> _estateUsageType { protected get; init; }
  public required IReadRepository<EstateMainUsageType> _estateMainUsageType { protected get; init; }
  public required ICustomEstateEnumMapper _customEstateEnumMapper { protected get; init; }
  public required ILogger<EstateMapper> _logger { protected get; init; }

  public async Task<Estate> MapEstate(EstateDTO source,
    EstateImportWorkspace workspace,
    CancellationToken cancellationToken)
  {
    var localEstCandidates = (source.InternalCode is not null && workspace.EstatesByInternalCode.ContainsKey(source.InternalCode))
      ? await _estateRepository
        .AsQueryable(
          new EstateIncludeAllSpec(),
          new GetByIdsSpec<Estate>(
            workspace.EstatesByInternalCode[source.InternalCode]
          )
        )
        .ToListAsync(cancellationToken)
      : [new Estate()];

    //Search for the actual estate among the results
    var localEst = localEstCandidates
      .FirstOrDefault(e => source.EndDate.HasValue
        ? (e.DecommissioningDate.HasValue && e.DecommissioningDate.Value == source.EndDate.Value.ToDateOnly())
        : (e.DecommissioningDate.HasValue == false))
      ?? new Estate();

    //Updates
    localEst.SetName(source.Description);

    if (!string.IsNullOrEmpty(source.InternalCode))
    {
      localEst.SetInternalCode(source.InternalCode);
    }
    else
    {
      localEst.SetInternalCode(source.Id);
    }

    localEst.SetStatus(
      source.EndDate.HasValue
        ? EstateStatus.Decommissioned
        : EstateStatus.Operational);

    if (source.ManagementOwnerCode is not null
      && workspace.ManagementSubjectCodesIds.ContainsKey(source.ManagementOwnerCode))
    {
      localEst.SetManagement(
        workspace.ManagementSubjectCodesIds[source.ManagementOwnerCode],
        null
      );
    }

    localEst.SetNotes(
      string.Join("; ", new[] {
          source.EstateNotes?.Trim(),
          source.Notes?.Trim()
        }.Where(s => !string.IsNullOrEmpty(s))
      )
    );

    localEst.SetName(source.Description ?? "-");

    localEst.SetBuildYear(source.BuildYear);

    var umt = (source.UsageMacroTypeId is not null
      && workspace.UsageMacroTypes.ContainsKey(source.UsageMacroTypeId))
      ? await _estateMainUsageType
        .GetByIdAsync(workspace.UsageMacroTypes[source.UsageMacroTypeId], cancellationToken)
      : await _estateMainUsageType
        .GetByIdAsync(workspace.UsageMacroTypes.Values.Min(), cancellationToken);

    if (umt is not null)
    {
      localEst.SetMainUsageType(umt);
    }

    var ut = (source.UsageTypeId is not null
      && workspace.UsageTypes.TryGetValue(source.UsageTypeId, out var usageTypeId))
      ? await _estateUsageType
        .GetByIdAsync(usageTypeId, cancellationToken)
      : await _estateUsageType
        .GetByIdAsync(workspace.UsageTypes.Values.Min(), cancellationToken);

    if (ut is not null)
    {
      localEst.SetUsageType(ut);
    }

    localEst.SetOwnership(await _customEstateEnumMapper
      .MapOwnership(source.OwnershipTypeId));
    localEst.SetType(await _customEstateEnumMapper
      .MapEstateType(source.EstateTypeId));

    localEst.SetDecommissioningDate(
      source.EndDate.HasValue
      ? DateOnly.FromDateTime(source.EndDate.Value)
      : null);

    var primaryAddress = localEst.PrimaryAddress;

    if (primaryAddress is null)
    {
      primaryAddress = new Address();
      primaryAddress.SetType(AddressType.Primary);
      localEst.AddAddress(primaryAddress);
    }

    if (source.CityId is not null
      && source.Address is not null)
    {
      var city = workspace.CitiesCache.TryGetValue(source.CityId, out var value)
        ? value
        : null;

      if (city is not null)
      {
        primaryAddress.SetCity(city.Name, city.Guid);
        primaryAddress.SetCounty(city.CountyName, city.CountyGuid);
        primaryAddress.SetCountry(city.CountryISO, city.CountryName);

        primaryAddress.SetLocalPostCode(source.PostCode);
        SetNumberingToponymy(primaryAddress, source.Address);

        ImportDataConverter.FixStringLengths(primaryAddress);

        if (source.Latitude is not null && source.Longitude is not null)
        {
          primaryAddress.SetLocation(
            source.Latitude.Value,
            source.Longitude.Value
          );
        }
      }
    }

    if (source.InternalCode is not null)
    {
      UpdateAddresses(localEst, source, workspace);
      UpdateFloors(localEst, source, workspace);
      UpdateStairs(localEst, source, workspace);
    }

    ImportDataConverter.FixStringLengths(localEst);

    return localEst;
  }

  private static void UpdateStairs(Estate localEst, EstateDTO source, EstateImportWorkspace workspace)
  {
    var sourceStairs =
            workspace.StairsByEstate.TryGetValue(source.InternalCode!, out var value)
            ? value
            : [];

    var existingStairs = localEst.Stairs
      .ToDictionary(f => f.Description, f => f);

    foreach (var toRemove in existingStairs
      .Where(kvp => !sourceStairs.Any(s => s.Name == kvp.Key)))
    {
      localEst.RemoveStairs(toRemove.Value);
    }

    foreach (var toAdd in sourceStairs.Where(s => !existingStairs.ContainsKey(s.Name)))
    {
      var stair = new Stair();
      stair.SetDescription(toAdd.Name ?? string.Empty);

      localEst.AddStairs(stair);
    }

    //There is nothing to update about stairs - they are matched by description
  }

  private static int UpdateFloors(Estate localEst, EstateDTO source, EstateImportWorkspace workspace)
  {
    var sourceFloors =
            workspace.FloorsByEstate.TryGetValue(source.InternalCode!, out var value)
            ? value
            : [];

    var existingFloors = localEst.Floors
      .ToDictionary(f => f.TemplateReference, f => f);

    var floorsToBe = sourceFloors
      .Select(f => workspace.Floors[f])
      .ToDictionary(f => f.TemplateId!.Value, f => f);

    foreach (var toRemove in existingFloors
      .Where(kvp => !floorsToBe.ContainsKey(kvp.Key)))
    {
      localEst.RemoveFloor(toRemove.Value);
    }

    foreach (var toAdd in floorsToBe.Where(kvp => !existingFloors.ContainsKey(kvp.Key)))
    {
      var floor = new Floor();
      floor.SetName(toAdd.Value.Name ?? string.Empty);
      floor.SetPosition(toAdd.Value.Ordering ?? 0);
      floor.SetReference(toAdd.Value.TemplateId!.Value);

      localEst.AddFloor(floor);
    }

    //There is nothing to update about floors

    return floorsToBe.Count;
  }

  private static void UpdateAddresses(Estate localEst, EstateDTO source, EstateImportWorkspace workspace)
  {
    var sourceAddr =
            workspace.EstateAddresses.TryGetValue(source.InternalCode!, out var value)
            ? value
            : [];

    //Update all nonprimary addresses
    var existingAddr = localEst.Addresses
      .Where(a => a.AddressType == AddressType.OtherAddress)
      .Select(a => new
      {
        Address = a,
        Key = $"{a.CityName ?? "-"}%{a.Toponymy ?? "-"}%{a.Numbering ?? "-"}%{a.LocalPostCode ?? "-"}"
          .ToLowerInvariant()
      })
      .ToDictionary(a => a.Key, a => a.Address);

    var newAddr = sourceAddr
      .Select(FixNumberingToponymy)
      .Select(a => new
      {
        Address = a,
        CityName = a.CityId is not null && workspace.CitiesCache.ContainsKey(a.CityId)
          ? workspace.CitiesCache[a.CityId].Name
          : "-"
      })
      .Select(a => new
      {
        a.Address,
        Key = $"{a.CityName}%{a.Address.Toponymy ?? "-"}%{a.Address.Numbering ?? "-"}%{a.Address.PostCode ?? "-"}"
          .ToLowerInvariant()
      })
      .GroupBy(a => a.Key)
      .ToDictionary(a => a.Key, a => a.First().Address);

    foreach (var toRemove in existingAddr.Where(kvp => !newAddr.ContainsKey(kvp.Key)))
    {
      localEst.RemoveAddress(toRemove.Value);
    }

    foreach (var toAdd in newAddr.Where(kvp => !existingAddr.ContainsKey(kvp.Key)))
    {
      var address = new Address();
      address.SetType(AddressType.OtherAddress);

      UpdateAddress(workspace, address, toAdd.Value);
    }

    foreach (var toUpdate in existingAddr.Where(kvp => newAddr.ContainsKey(kvp.Key)))
    {
      var srcAddress = newAddr[toUpdate.Key];

      UpdateAddress(workspace, toUpdate.Value, srcAddress);
    }
  }

  private static void UpdateAddress(
    EstateImportWorkspace workspace,
    Address address,
    AddressDTO source)
  {
    if (source.CityId is null)
    {
      return;
    }

    var city = workspace.CitiesCache.ContainsKey(source.CityId)
            ? workspace.CitiesCache[source.CityId]
            : null;

    if (city is not null)
    {
      address.SetCity(city.Name, city.Guid);
      address.SetCounty(city.CountyName, city.CountyGuid);
      address.SetCountry(city.CountryISO, city.CountryName);

      address.SetLocalPostCode(source.PostCode);
      address.SetToponymy(source.Toponymy);
      address.SetNumbering(source.Numbering);

      ImportDataConverter.FixStringLengths(address);
    }
  }

  private static void SetNumberingToponymy(Address a, string? srcToponymy)
  {
    var (toponymy, numbering) = AddressMiner.MineData(srcToponymy);

    a.SetToponymy(toponymy);
    a.SetNumbering(numbering);
  }

  private static AddressDTO FixNumberingToponymy(AddressDTO source)
  {
    var (toponymy, numbering) = AddressMiner.MineData(source.Toponymy);

    source.Toponymy = toponymy;
    source.Numbering = numbering;

    return source;
  }
}
