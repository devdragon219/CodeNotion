using RealGimm.Core.CrossModule;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Anag.Models;

public record ContactInput(
  int? Id,
  ContactType ContactType,
  ContactInfoType ContactInfoType,
  string? ContactInfo,
  string? Notes) : IMaybeIdentifiable;
