using RealGimm.Core.Asst.EstateAggregate;

namespace RealGimm.Web.Asst.Models;

public sealed record EstateLocation(int EstateId, string EstateInternalCode, string? EstateName, Address? Address);
