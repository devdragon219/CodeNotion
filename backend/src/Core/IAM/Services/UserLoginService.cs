using Ardalis.Result;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.IAM.UserAggregate.Events;
using RealGimm.Core.IAM.Interfaces;
using Rebus.Bus;
using RealGimm.Core.Common.Interfaces;
using RealGimm.Core.Common.ConfigAggregate;

namespace RealGimm.Core.IAM.Services;

public class UserLoginService : IUserLoginService, IConfigurableModule
{
  private readonly IRepository<User> _repository;
  private readonly IBus _bus;

  public UserLoginService(IRepository<User> repository,
    IBus bus)
  {
    _repository = repository;
    _bus = bus;
  }

  public const string PARAM_EXPIRATION_DAYS = "expiration-days";

  public string[] ConfigurationParameters => [
    PARAM_EXPIRATION_DAYS
  ];

  public ConfigFunction Function => ConfigFunction.PasswordLogin;

  public async Task<Result> MarkUserLoginAttempt(int userId, bool successful)
  {
    var user = await _repository.GetByIdAsync(userId);
    if (user == null) return Result.NotFound();

    user.MarkLogin(successful);
    await _repository.UpdateAsync(user);

    await _bus.Publish(new UserLoginEvent(userId, user.UserName));

    return Result.Success();
  }
}
