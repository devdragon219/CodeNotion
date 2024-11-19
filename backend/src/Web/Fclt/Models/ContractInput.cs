using RealGimm.Core.Common;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Core;

namespace RealGimm.Web.Fclt.Models;

[GraphQLName($"{nameof(Fclt)}{nameof(ContractInput)}")]
public record ContractInput
{
  public string InternalCode { get; set; } = default!;
  public string? ExternalCode { get; set; }
  public string Description { get; set; } = default!;
  public int TypeId { get; set; } = default!;
  public int? OriginalTemplateId { get; set; }
  public EntryStatus EntryStatus { get; set; }
  public int ProviderSubjectId { get; set; }
  public DateOnly? AgreementDate { get; set; }
  public DateOnly EffectiveDate { get; set; }
  public DateOnly ExpirationDate { get; set; }
  public int? CancellationNoticeDaysCount { get; set; }
  public int? RenewalNoticeDaysCount { get; set; }
  public int? MaximumRenewalDaysCount { get; set; }
  public FrameworkAgreementInput[] FrameworkAgreements { get; set; } = [];
  public int? OriginalEstateUnitGroupId { get; set; }
  public int[] EstateUnitIds { get; set; } = [];
  public int[] CatalogueTypeIds { get; set; } = [];

  [GraphQLName("slas")]
  public SLAInput[] SLAs { get; set; } = [];

  public PenaltyInput[] Penalties { get; set; } = [];
  public BillingInfoInput BillingInfo { get; set; } = default!;
  public int[] PriceListIds { get; set; } = [];
  public TermExtensionInput[] TermExtensions { get; set; } = [];
}
