using System.Linq.Expressions;
using System.Reflection;
using Humanizer;
using RealGimm.FunctionalTests.Web.Extensions;

namespace RealGimm.FunctionalTests.Web;

public class PropertyNameExtractorVisitor<TEntity> : ExpressionVisitor
{
  private readonly List<string> _propertyNames = new();

  public IEnumerable<string> ExtractPropertyNames(Expression<Func<TEntity, object>> expression)
  {
    Visit(expression);
    return _propertyNames;
  }

  protected override Expression VisitMember(MemberExpression node)
  {
    if (node.Member is PropertyInfo propertyInfo)
    {
      string pName = propertyInfo.Name;

      if (IsObject(propertyInfo.PropertyType))
      {
        List<string> cpNames = new List<string>();
        foreach (PropertyInfo pInfoChild in
          (propertyInfo.PropertyType.GetGenericArguments().Length > 0 ? 
          propertyInfo.PropertyType.GetGenericArguments().Single().GetProperties() : 
          propertyInfo.PropertyType.GetProperties()))
        {
          if (!IsObject(pInfoChild.PropertyType))
          {
            cpNames.Add(pInfoChild.Name.CamelizeRespectingAcronyms());
          }
        }
        pName += (cpNames.Count > 0 ? $"{{{string.Join(System.Environment.NewLine, cpNames)}}}" : string.Empty);
      }

      _propertyNames.Add(pName);

      return node;
    }

    throw new NotSupportedException($"Member '{node.Member.Name}' is not a PropertyInfo.");
  }

  private bool IsObject(Type type)
  {
    if (Nullable.GetUnderlyingType(type) is Type { } underlyingType)
    {
      return IsObject(underlyingType);
    }

    return 
      type != typeof(string) &&
      type != typeof(int) &&
      type != typeof(decimal) &&
      type != typeof(float) &&
      type != typeof(double) &&
      type != typeof(DateTime) &&
      type != typeof(DateOnly) &&
      type != typeof(TimeOnly) &&
      type != typeof(int[]) &&
      type != typeof(string[]) &&
      type != typeof(decimal[]) &&
      type != typeof(float[]) &&
      type != typeof(double[]);
  }
}
