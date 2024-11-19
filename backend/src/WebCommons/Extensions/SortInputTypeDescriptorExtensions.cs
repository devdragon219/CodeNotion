using HotChocolate.Data.Sorting;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.WebCommons.Sorting;
using System.Linq.Expressions;
using System.Reflection;
using System.Text.Json;

namespace RealGimm.WebCommons.Extensions;

public static class SortInputTypeDescriptorExtensions
{
  public static ISortInputTypeDescriptor<TEntity> BindExtensionStringField<TEntity, TExternalEntity>(
    this ISortInputTypeDescriptor<TEntity> descriptor,
    string fieldName,
    Expression<Func<TExternalEntity, string>> orderWeightExpressionMaker,
    Func<IDictionary<int, int>, Expression<Func<TEntity, int>>> orderExpressionMaker
    )
    where TExternalEntity: class, IAggregateRoot, IIdentifiable
  {
    descriptor
      .Field(fieldName)
      .Type<DefaultSortEnumType>()
      .RequiresMaterialization()
      .Extend()
      .OnBeforeCreate((context, definition) =>
      {
        definition.Handler = new ExternalEntityFieldSortHandler<TEntity, TExternalEntity>(
          context.Services,
          orderWeightExpressionMaker,
          orderExpressionMaker);
      });

    return descriptor;
  }

  public static ISortInputTypeDescriptor<TBase> BindDerivedTypeFields<TBase, TDerived>(this ISortInputTypeDescriptor<TBase> descriptor)
    where TDerived : TBase
  {
    ArgumentNullException.ThrowIfNull(descriptor);

    if (typeof(TBase) == typeof(TDerived))
    {
      throw new ArgumentException("Binding derived type fields is impossible because the derived type is equal to the base type.");
    }

    // extracting unique properties only
    var properties = typeof(TDerived)
      .GetProperties(BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly | BindingFlags.GetProperty)
      .Where(property =>
      {
        var getMethod = property.GetGetMethod(false);
        return getMethod!.GetBaseDefinition() == getMethod;
      });

    foreach (var property in properties)
    {
      var parameterExpression = Expression.Parameter(typeof(TBase), "x");
      var convertToTExpression = Expression.Convert(parameterExpression, typeof(TDerived));
      var propertyExpression = Expression.Property(convertToTExpression, property);
      var lambdaType = typeof(Func<,>).MakeGenericType(typeof(TBase), property.PropertyType);
      var lambdaExpression = Expression.Lambda(lambdaType, propertyExpression, parameterExpression);

      var name = JsonNamingPolicy.CamelCase.ConvertName(property.Name);

      ((ISortFieldDescriptor)descriptor.Field((dynamic)lambdaExpression)).Name(name);
    }

    return descriptor;
  }
}
