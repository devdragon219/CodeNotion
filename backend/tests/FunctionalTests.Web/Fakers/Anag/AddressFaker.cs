using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Infrastructure;

namespace RealGimm.FunctionalTests.Web.Fakers.Anag;

public sealed class AddressFaker : BaseSeededFaker<Address>
{
  public AddressFaker()
  {
    CustomInstantiator(faker =>
    {
      var address = new Address();
      address.SetCity(faker.Address.City(), null);
      address.SetToponymy(faker.Address.StreetAddress());
      address.SetLocalPostCode(faker.Address.ZipCode());

      return address;
    });

    FinishWith((_, address) => EnsureValid(address));
  }
}
