using System.Linq.Expressions;
using System.Reflection;
using System.Text.Json;
using HotChocolate.Data.Filters;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.WebCommons.Filtering;

namespace RealGimm.WebCommons.Extensions;

public static class FilterInputTypeDescriptorExtensions
{
  public static IFilterInputTypeDescriptor<TEntity> BindExtensionStringField<TEntity, TExternalEntity>(
    this IFilterInputTypeDescriptor<TEntity> descriptor,
    string fieldName,
    Func<string, Expression<Func<TExternalEntity, bool>>> containsExpressionMaker,
    Func<int[], Expression<Func<TEntity, bool>>> filterExpressionMaker)
    where TExternalEntity: class, IAggregateRoot, IIdentifiable
  {
    descriptor
      .Field(fieldName)
      .Type<CustomStringFilterInput>()
      .Extend()
      .OnBeforeCreate((context, definition) =>
      {
        definition.Handler = new ExternalEntityFieldFilterHandler<TEntity, TExternalEntity>(
          context.Services,
          containsExpressionMaker,
          filterExpressionMaker);
      });

    return descriptor;
  }

  public static IFilterInputTypeDescriptor<TBase> BindDerivedTypeFields<TBase, TDerived>(this IFilterInputTypeDescriptor<TBase> descriptor)
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
        return !property.IsDefined(typeof(GraphQLIgnoreAttribute), false)
          && !property.IsDefined(typeof(GraphQLFilterIgnoreAttribute), false)
          && getMethod!.GetBaseDefinition() == getMethod;
      });

    foreach (var property in properties)
    {
      var parameterExpression = Expression.Parameter(typeof(TBase), "x");
      var convertToTExpression = Expression.Convert(parameterExpression, typeof(TDerived));
      var propertyExpression = Expression.Property(convertToTExpression, property);
      var lambdaType = typeof(Func<,>).MakeGenericType(typeof(TBase), property.PropertyType);
      var lambdaExpression = Expression.Lambda(lambdaType, propertyExpression, parameterExpression);

      var name = JsonNamingPolicy.CamelCase.ConvertName(property.Name);

      ((IFilterFieldDescriptor)descriptor.Field((dynamic)lambdaExpression)).Name(name);
    }

    return descriptor;
  }
}
