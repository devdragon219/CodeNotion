using RealGimm.Core.Fclt.SLAAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class SLAFaker : BaseSeededFaker<SLA>
{
  private int _generatedObjectsCount = 0;

  public string? ContractInternalCode { get; init; }
  public required ComplexTicketConditionFaker ComplexTicketConditionFaker { get; init; }

  public SLAFaker()
  {
    CustomInstantiator(faker =>
    {
      var sla = new SLA();
      sla.SetInternalCode($"{ContractInternalCode}SLA{(_generatedObjectsCount + 1).ToString().PadLeft(3, '0')}");
      sla.SetDescription(faker.Lorem.Sentence(2));

      var ifCondition = ComplexTicketConditionFaker!.Generate();
      sla.SetIfCondition(ifCondition);

      var thenCondition = ComplexTicketConditionFaker.Generate();
      sla.SetThenCondition(thenCondition);

      return sla;
    });

    FinishWith((faker, sla) =>
    {
      EnsureValid(sla);
      _generatedObjectsCount++;
    });
  }
}
