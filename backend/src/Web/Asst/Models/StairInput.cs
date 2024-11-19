using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Asst.Models;

public record StairInput(int? Id, string Description) : IMaybeIdentifiable;
