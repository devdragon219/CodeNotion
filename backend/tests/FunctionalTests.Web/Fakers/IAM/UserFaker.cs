using RealGimm.Core.IAM.GroupAggregate;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Infrastructure;

namespace RealGimm.FunctionalTests.Web.Fakers.IAM;

public sealed class UserFaker : BaseSeededFaker<User>
{
  public UserFaker()
  {
    CustomInstantiator(faker =>
    {
      var user = new User(
        userName: faker.Internet.UserName(),
        type: UserType.Internal,
        passwordHash: faker.Random.String2(10));

      user.SetName(faker.Name.FirstName(), faker.Name.LastName());

      var userGroup = new Group(faker.Lorem.Sentence(2));
      user.AddGroup(userGroup);

      return user;
    });
  }
}
