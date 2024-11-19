using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.Infrastructure;
using RealGimm.Web.Prop.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Prop.Contract;

public sealed class CounterpartInputFaker : BaseSeededFaker<CounterpartInput>
{
  public IEnumerable<int> SubjectsIds { get; private set; } = Enumerable.Empty<int>();

  public CounterpartInputFaker()
  {
    CustomInstantiator(faker =>
    {
      var input = new CounterpartInput();
      input.SubjectId = CounterpartFaker.PickSubjectId(faker, SubjectsIds);
      (input.Since, input.Until) = CounterpartFaker.GenerateDateRange(faker);
      input.ContractSharePercent = CounterpartFaker.GenerateContractSharePercent(faker);
      input.Type = CounterpartFaker.PickType(faker);

      return input;
    });
  }
  public CounterpartInputFaker UseSubjectsIds(IEnumerable<int> subjectsIds)
  {
    SubjectsIds = subjectsIds ?? throw new ArgumentNullException(nameof(subjectsIds));

    return this;
  }
}
