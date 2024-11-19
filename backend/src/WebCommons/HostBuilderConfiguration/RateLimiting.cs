using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace RealGimm.WebCommons.HostBuilderConfiguration;

public static class RateLimiting
{
  public const string RATE_LIMIT_BY_USER = "RateLimit-ByUsername";
  public const string RATE_LIMIT_BY_IP = "RateLimit-BySourceIP";
  public const int RL_CONCURRENCY = 10;
  public const int RL_CONCURRENCY_WINDOW_SECONDS = 5;
  public const int RL_CONCURRENCY_WINDOW_SEGMENTS = 4;
  public const int RL_CONCURRENCY_QUEUE = 20;

  public static IServiceCollection ConfigureRGRateLimiting(this IServiceCollection services)
  {
    return services.AddRateLimiter(options =>
    {
      options.AddPolicy(RATE_LIMIT_BY_USER, context =>
      {
        var username = "anonymous user";
        if (context.User.Identity?.IsAuthenticated is true)
        {
          username = context.User.ToString()!;
        }

        return RateLimitPartition.GetSlidingWindowLimiter(username,
            _ => new SlidingWindowRateLimiterOptions
            {
              PermitLimit = RL_CONCURRENCY,
              QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
              QueueLimit = RL_CONCURRENCY_QUEUE,
              Window = TimeSpan.FromSeconds(RL_CONCURRENCY_WINDOW_SECONDS),
              SegmentsPerWindow = RL_CONCURRENCY_WINDOW_SEGMENTS
            });
      });
    });
  }
}
