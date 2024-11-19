using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Asst.Models;

public record FloorInput(int? Id, string Name, float Position, Guid TemplateReference) : IMaybeIdentifiable;
