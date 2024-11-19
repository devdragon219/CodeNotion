namespace RealGimm.Web.Asst.Models;

public sealed record CadastralLandCategoryInput(
  string Description,
  string InternalCode,
  string CountryISO,
  int Ordering);
