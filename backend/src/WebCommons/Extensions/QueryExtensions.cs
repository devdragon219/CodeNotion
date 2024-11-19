using HotChocolate.Data.Filters;
using HotChocolate.Data.Sorting;
using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using RealGimm.SharedKernel;

namespace RealGimm.WebCommons.Extensions;

public static class QueryExtensions
{
  public static async Task<IQueryable<T>> MaterializeIfRequiredAsync<T>(
    this IQueryable<T> query,
    IResolverContext resolverContext)
  {
    return await (await query
      .FilterWithPossibleMaterializationAsync(resolverContext))
      .SortWithPossibleMaterializationAsync(resolverContext);
  }

  public static async Task<IQueryable<T>> FilterWithPossibleMaterializationAsync<T>(
    this IQueryable<T> query,
    IResolverContext resolverContext)
  {
    if (resolverContext.GetFilterContext() is { } filterContext)
    {
      if (filterContext.GetFields().Any(IsFieldMaterializationRequired))
      {
        query = await MaterializeQueryAsync(query);
      }

      filterContext.Handled(false);

      return query.Filter(resolverContext);
    }

    return query;
  }
  
  public static async Task<IQueryable<T>> SortWithPossibleMaterializationAsync<T>(
    this IQueryable<T> query,
    IResolverContext resolverContext)
  {
    if (resolverContext.GetSortingContext() is { } sortingContext)
    {
      if (sortingContext.GetFields().Any(fields => fields.Any(IsFieldMaterializationRequired)))
      {
        query = await MaterializeQueryAsync(query);
      }

      sortingContext.Handled(false);

      return query.Sort(resolverContext);
    }

    return query;
  }

  private static async Task<IQueryable<T>> MaterializeQueryAsync<T>(IQueryable<T> query)
  {
    if (query is EnumerableQuery)
    {
      return query;
    }

    return (await query.ToListAsync()).AsQueryable();
  }

  private static bool IsFieldMaterializationRequired(IField field)
    => field.ContextData.TryGetValue(Constants.FIELD_REQUIRES_MATERIALIZATION, out var isMaterializationRequired) &&
        isMaterializationRequired != null &&
        (bool)isMaterializationRequired;

  private static bool IsFieldMaterializationRequired(IFilterFieldInfo fieldInfo)
  {
    if (IsFieldMaterializationRequired(fieldInfo.Field))
    {
      return true;
    }

    if (fieldInfo.Value is IFilterInfo filterInfo)
    {
      return filterInfo.GetFields().Any(IsFieldMaterializationRequired);
    }

    return false;
  }

  private static bool IsFieldMaterializationRequired(ISortingFieldInfo fieldInfo)
  {
    if (IsFieldMaterializationRequired(fieldInfo.Field))
    {
      return true;
    }

    if (fieldInfo.Value is ISortingInfo sortingInfo)
    {
      return sortingInfo.GetFields().Any(IsFieldMaterializationRequired);
    }

    return false;
  }
}

