using RealGimm.Core.Prop.BillAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Prop.Services;

public class BillCodeSuggestionService : CodeSuggestorBase<Bill>
{
  public BillCodeSuggestionService(IReadRepository<Bill> repository) : base(repository)
  {
  }

  protected override string CreateCode(int unoccupiedNumber, Bill? partialEntity)
  {
    ArgumentNullException.ThrowIfNull(partialEntity, nameof(partialEntity));

    var prefix = partialEntity.Contract is null
    ? (partialEntity.BillRows.Any(br => br.TermInstallmentSource is not null)
      ? "MPA"
      : "B") //Should never happen - this bill is neither from a contract nor from an administration term
    : partialEntity.Contract.Type.IsActive ? "AP" : "MP";

    return $"{prefix}{unoccupiedNumber.ToString().PadLeft(5, '0')}";
  }
}
