using RealGimm.Core.CrossModule;

namespace RealGimm.Web.Admin.Models;

public record AdminContactInput(
  int? Id,
  ContactInfoType ContactInfoType,
  int? ContactId,
  string? ContactInfo,
  string? Notes);
