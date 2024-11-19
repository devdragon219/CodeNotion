using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.WebCommons.GraphQL.User;

namespace RealGimm.WebCommons;

public class UserDataProvider : IUserDataProvider
{
  private readonly IHttpContextAccessor _context;
  private Guid? _overridedTenantId;
  private string? _overridedUsername;

  public UserDataProvider(IHttpContextAccessor context)
  {
    _context = context;
  }

  public string Username
  {
    get
    {
      if (_overridedUsername is not null)
      {
        return _overridedUsername;
      }

      return _context.HttpContext?.User.Claims
        .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value ?? "Unknown";
    }
  }
  public Guid TenantId
  {
    get
    {
      if (_overridedTenantId is not null)
      {
        return _overridedTenantId.Value;
      }

      var selectedTenant = _context.HttpContext?.User.Claims
        .FirstOrDefault(c => c.Type == Jwt.SELECTED_TENANT);

      return selectedTenant is not null
        ? Guid.Parse(selectedTenant.Value)
        : Guid.Empty;
    }
  }
  public bool IsHeadlessTask => _overridedTenantId is not null;

  public void SetUsername(string username) => _overridedUsername = username ?? throw new ArgumentNullException(nameof(username));

  public void SetTenantId(Guid tenantId) => _overridedTenantId = tenantId;
}
