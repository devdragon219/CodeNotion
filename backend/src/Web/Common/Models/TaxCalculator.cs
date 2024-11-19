using RealGimm.Core.Taxes.Interfaces;

namespace RealGimm.Web.Common.Models;

public record TaxCalculator(Guid Id, string Description, ITaxConfiguration Configuration);
