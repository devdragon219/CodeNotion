using System.Security.Claims;

namespace RealGimm.WebCommons.GraphQL.User.Models;

public record LoginResult
{
  public required UserModel User { get; init; }
  public required string Jwt { get; init; }
  public string? RefreshToken { get; init; }

  [GraphQLIgnore]
  public IEnumerable<Claim>? Claims { get; init; }
};
