using RealGimm.Core.Fclt.TicketTypeAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class TicketTypeFaker : BaseSeededFaker<TicketType>
{
  private int _generatedObjectsCount = 0;

  public TicketTypeFaker()
  {
    CustomInstantiator(faker =>
    {
      var ticketType = new TicketType();
      ticketType.SetDescription(faker.Lorem.Sentence(wordCount: 2));
      ticketType.SetInternalCode($"TTK{(_generatedObjectsCount + 1).ToString().PadLeft(2, '0')}");
      ticketType.SetOrdering(_generatedObjectsCount + 1);

      return ticketType;
    });

    FinishWith((faker, ticketType) =>
    {
      EnsureValid(ticketType);
      _generatedObjectsCount++;
    });
  }
}
