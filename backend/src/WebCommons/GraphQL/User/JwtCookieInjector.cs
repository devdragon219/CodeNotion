using System.Security.Claims;
using HotChocolate.Resolvers;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using RealGimm.WebCommons.GraphQL.User.Models;

namespace RealGimm.WebCommons.GraphQL.User;

public class JwtCookieInjector
{
  private readonly FieldDelegate _next;

  public JwtCookieInjector(FieldDelegate next)
  {
    _next = next ?? throw new ArgumentNullException(nameof(next));
  }

  public async Task InvokeAsync(IMiddlewareContext context)
  {
    await _next(context);

    if (context.Result is LoginResult loginResult)
    {
      var httpContext = context.Service<IHttpContextAccessor>().HttpContext;

      if (httpContext is not null)
      {
        if (loginResult.Claims is not null)
        {
          await httpContext!.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(
              new ClaimsIdentity(
                loginResult.Claims,
                CookieAuthenticationDefaults.AuthenticationScheme
              )
            )
          );
        }
        else
        {
          await httpContext!.SignOutAsync(
            CookieAuthenticationDefaults.AuthenticationScheme
          );
        }
      }
    }
  }
}