using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Anag.Models;

public record TaxStatusInput(
  int? Id,
  TaxStatusType TaxStatusType,
  DateOnly? Since,
  DateOnly? Until) : IMaybeIdentifiable;
