using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.IAM.UserAggregate;

namespace RealGimm.Core.Fclt.Services;

public partial class DeletedUserNameSuggestionService
{
  private readonly IReadRepository<User> _repository;

  public DeletedUserNameSuggestionService(IReadRepository<User> repository)
  {
    _repository = repository;
  }

  public async Task<string> SuggestAsync(string originalUserName, string[]? additionallyOccupiedUserNames = null)
  {
    var occupiedUserNames = await _repository
      .AsQueryable()
      .Select(user => user.UserName)
      .ToArrayAsync();

    occupiedUserNames = [..occupiedUserNames, originalUserName];

    if (additionallyOccupiedUserNames is not null)
    {
      occupiedUserNames = [..occupiedUserNames, ..additionallyOccupiedUserNames];
    }

    var suggestedUserName = $"{originalUserName} (deleted user)";
    var counter = 1;

    while (occupiedUserNames.Any(userName => userName.Equals(suggestedUserName, StringComparison.OrdinalIgnoreCase)))
    {
      counter++;
      suggestedUserName = $"{originalUserName} (deleted user, #{counter})";
    }

    return suggestedUserName;
  }
}
