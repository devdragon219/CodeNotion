using System.Data.Common;
using System.Linq.Expressions;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure.Interceptors;

public abstract class AccessFilterInterceptor : DbCommandInterceptor, IQueryExpressionInterceptor
{
  const string FILTER_TYPE_TAG = "FILTER_TAG_TYPE:";
  const int PLACEHOLDER_1 = 465024378;
  const int PLACEHOLDER_2 = 94563215;
  const int PLACEHOLDER_3 = 911212127;

  //This is very postgresql-specific
  const string PLACEHOLDER_MATCH = $"IN (465024378 + 94563215, 911212127)";
  const string PLACEHOLDER_REPLACE = "= ANY (@__afipr99)";
  const string PLACEHOLDER_DISABLE = "IS NOT NULL";
  const string PLACEHOLDER_PARAM_NAME = "__afipr99";

  private readonly IServiceProvider _serviceProvider;

  public AccessFilterInterceptor(IServiceProvider serviceProvider)
  {
    _serviceProvider = serviceProvider;
  }

  public Expression QueryCompilationStarting(Expression queryExpression,
    QueryExpressionEventData eventData)
  {
    return new AccessFilterVisitor(this).Visit(queryExpression);
  }

  public override DbCommand CommandInitialized(CommandEndEventData eventData, DbCommand result)
  {
    //If the command has the placeholder, replace it with the parameter name
    // and add the parameter to the dbcommand instance with an empty array
    if (result.CommandText.Contains(PLACEHOLDER_MATCH))
    {
      if (eventData.Context is TrackableDbContext trackableDbContext
        && trackableDbContext.UserDataProvider is not null
        && !trackableDbContext.UserDataProvider.IsHeadlessTask)
      {
        result.CommandText = result.CommandText.Replace(PLACEHOLDER_MATCH, PLACEHOLDER_REPLACE);
        var nparam = result.CreateParameter();
        nparam.ParameterName = PLACEHOLDER_PARAM_NAME;
        nparam.Value = Array.Empty<int>();
        result.Parameters.Add(nparam);
      }
      else
      {
        //We expect a filter, but have no data to filter. Exclude the filter.
        result.CommandText = result.CommandText.Replace(
          PLACEHOLDER_MATCH, PLACEHOLDER_DISABLE);
      }
    }

    return base.CommandInitialized(eventData, result);
  }

  public override InterceptionResult<DbDataReader> ReaderExecuting(DbCommand command, CommandEventData eventData, InterceptionResult<DbDataReader> result)
  {
    //If there is a parameter to be filled in, and we have the data
    if (command.Parameters.Contains(PLACEHOLDER_PARAM_NAME)
      && eventData.Context is TrackableDbContext trackableDbContext
      && trackableDbContext.UserDataProvider is not null)
    {
      var commandTags = command.CommandText.Split(Environment.NewLine)
        .TakeWhile(l => string.IsNullOrEmpty(l) || l.StartsWith("-- "));

      if (commandTags.Any(ct => ct.Contains(FILTER_TYPE_TAG)))
      {
        //Get the type name from the tags in the SQL command
        var type = commandTags.First(ct => ct.Contains(FILTER_TYPE_TAG));

        type = type[(type.IndexOf(FILTER_TYPE_TAG) + FILTER_TYPE_TAG.Length)..];

        //Ask the actual implementation for the ID array value
        var arrayValue = GetFilterIdsAsync(type).Result;

        command.Parameters[PLACEHOLDER_PARAM_NAME].Value = arrayValue;
      }

    }

    return base.ReaderExecuting(command, eventData, result);
  }

  public override async ValueTask<InterceptionResult<DbDataReader>> ReaderExecutingAsync(DbCommand command, CommandEventData eventData, InterceptionResult<DbDataReader> result, CancellationToken cancellationToken = default)
  {
    //If there is a parameter to be filled in, and we have the data
    if (command.Parameters.Contains(PLACEHOLDER_PARAM_NAME)
      && eventData.Context is TrackableDbContext trackableDbContext
      && trackableDbContext.UserDataProvider is not null)
    {
      var commandTags = command.CommandText.Split(Environment.NewLine)
        .TakeWhile(l => string.IsNullOrEmpty(l) || l.StartsWith("-- "));

      if (commandTags.Any(ct => ct.Contains(FILTER_TYPE_TAG)))
      {
        //Get the type name from the tags in the SQL command
        var type = commandTags.First(ct => ct.Contains(FILTER_TYPE_TAG));

        type = type[(type.IndexOf(FILTER_TYPE_TAG) + FILTER_TYPE_TAG.Length)..];

        //Ask the actual implementation for the ID array value
        var arrayValue = await GetFilterIdsAsync(type, cancellationToken);

        command.Parameters[PLACEHOLDER_PARAM_NAME].Value = arrayValue;
      }
    }

    return await base.ReaderExecutingAsync(command, eventData, result, cancellationToken);
  }

  protected abstract Type[] SupportedTypes { get; }

  protected bool CanHandle(Type collectionType)
  {
    return SupportedTypes.Any(t => t.IsAssignableFrom(collectionType));
  }

  protected async Task<int[]> GetFilterIdsAsync(string collectionTypeName, CancellationToken cancellationToken = default)
  {
    var type = SupportedTypes.FirstOrDefault(t => t.FullName == collectionTypeName)
      ?? throw new InvalidOperationException();

    var accessFilter = _serviceProvider.GetRequiredService(typeof(IAccessFilter<>).MakeGenericType(type)) as IAccessFilter
      ?? throw new InvalidOperationException();
    var provider = _serviceProvider.GetRequiredService<IUserDataProvider>();
    return await accessFilter.ReachableEntitiesAsync(provider, cancellationToken);
  }

  public void InvalidateAccessCaches()
  {
    foreach (var type in SupportedTypes)
    {
      var accessFilter = _serviceProvider.GetRequiredService(typeof(IAccessFilter<>).MakeGenericType(type)) as IAccessFilter
        ?? throw new InvalidOperationException();
      accessFilter.InvalidationSource.Cancel();
    }
  }

  private class AccessFilterVisitor : ExpressionVisitor
  {
    private readonly AccessFilterInterceptor _interceptor;

    public AccessFilterVisitor(AccessFilterInterceptor interceptor)
    {
      _interceptor = interceptor;
    }

    private static readonly MethodInfo _genericWhere = typeof(Queryable).GetMethods()
        .FirstOrDefault(m => m.Name == nameof(Queryable.Where)
                             && m.GetParameters().Length == 2
                             && m.IsGenericMethod)!;

    private static readonly MethodInfo _genericTagWith =
      typeof(EntityFrameworkQueryableExtensions).GetMethods()
        .FirstOrDefault(m => m.Name == nameof(EntityFrameworkQueryableExtensions.TagWith)
                             && m.GetParameters().Length == 2
                             && m.IsGenericMethod)!;

    private static readonly MethodInfo _contains;

    static AccessFilterVisitor()
    {
      var genericContains = typeof(Enumerable).GetMethods()
          .FirstOrDefault(m => m.Name == nameof(Enumerable.Contains)
                          && m.GetParameters().Length == 2
                          && m.IsGenericMethod)!;

      _contains = genericContains.MakeGenericMethod(typeof(int));
    }

    private bool _skipProcessing = false;

    protected override Expression VisitMethodCall(MethodCallExpression node)
    {
      if (node.Method.DeclaringType == typeof(EntityFrameworkQueryableExtensions)
          && node.Method.Name == nameof(EntityFrameworkQueryableExtensions.TagWith)
          && node.Arguments[1] is ConstantExpression constant
          && (string?)constant.Value == Constants.SKIP_ACCESS_FILTER)
      {
        _skipProcessing = true;
      }

      if (!_skipProcessing
          && node.Arguments.Any()
          && node.Arguments[0] is EntityQueryRootExpression expression
          && expression.Type.GetGenericTypeDefinition() == typeof(IQueryable<>)
          && _interceptor.CanHandle(expression.EntityType.ClrType))
      {
        var whereParam = Expression.Parameter(expression.EntityType.ClrType);

        // This is very postgresql-specific, because with this nontrivial
        // array we get the "= ANY" construct that we will replace.
        var arrayValue = Expression.NewArrayInit(
          typeof(int),
          Expression.Add(Expression.Constant(PLACEHOLDER_1),Expression.Constant(PLACEHOLDER_2)),
          Expression.Constant(PLACEHOLDER_3));

        var containsLambda = Expression.Lambda(Expression.Call(_contains,
          arrayValue,
          Expression.MakeMemberAccess(whereParam,
            typeof(IIdentifiable).GetMember(nameof(IIdentifiable.Id))[0])),
          whereParam);

        var _where = _genericWhere.MakeGenericMethod(expression.EntityType.ClrType);

        var whereFilter = Expression.Call(_where, node.Arguments[0], containsLambda);

        //Add a tag to current query with the type name of the enumeration root
        var tagWith = _genericTagWith.MakeGenericMethod(expression.EntityType.ClrType);

        var taggedFilter = Expression.Call(tagWith,
          whereFilter,
          Expression.Constant(FILTER_TYPE_TAG + expression.EntityType.ClrType.FullName));

        var originalArguments = new Expression[] {
                    taggedFilter
                }.Concat(node.Arguments.Skip(1)).ToArray();

        _skipProcessing = true;

        return Expression.Call(node.Method, originalArguments);
      }

      return base.VisitMethodCall(node);
    }
  }
}
