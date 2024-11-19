﻿using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Anag.Models;

public record AddressInput : IMaybeIdentifiable
{
  public int? Id { get; init; }
  public AddressType AddressType { get; init; }
  public int? CityId { get; init; }
  public string? CityName { get; init; }
  public string? Toponymy { get; init; }
  public string? CountryISO { get; init; }
  public string? RegionName { get; init; }
  public string? CountyName { get; init; }
  public string? LocalPostCode { get; init; }
  public string? Numbering { get; init; }
  public string? Notes { get; init; }
}
