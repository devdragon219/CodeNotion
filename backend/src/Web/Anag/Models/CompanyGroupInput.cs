using RealGimm.Core.Anag.SubjectAggregate;

namespace RealGimm.Web.Anag.Models;

public record CompanyGroupInput(int? Id, CompanyGroup GroupRelation, string? Notes);
