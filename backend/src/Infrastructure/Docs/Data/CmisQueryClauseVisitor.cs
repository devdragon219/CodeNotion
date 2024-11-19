using System.Collections;
using System.Collections.Immutable;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using PortCMIS;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Extensions;
using RealGimm.Infrastructure.Docs.Types;

namespace RealGimm.Infrastructure.Docs.Data;

public partial class CmisQueryClauseVisitor : ExpressionVisitor
{
  #region Methods info

  private static readonly MethodInfo s_documentContainsTextMethodInfo = typeof(DocumentExtensions).GetMethod(nameof(DocumentExtensions.ContainsText))!;

  private static readonly ImmutableArray<MethodInfo> s_stringContainsMethodsInfo = typeof(string)
    .GetMethods()
    .Where(methodInfo => methodInfo.Name == nameof(string.Contains))
    .ToImmutableArray();

  private static readonly ImmutableArray<MethodInfo> s_stringStartsWithMethodsInfo = typeof(string)
    .GetMethods()
    .Where(methodInfo => methodInfo.Name == nameof(string.StartsWith))
    .ToImmutableArray();

  private static readonly ImmutableArray<MethodInfo> s_stringToLowerMethodsInfo = typeof(string)
    .GetMethods()
    .Where(methodInfo => methodInfo.Name == nameof(string.ToLower))
    .ToImmutableArray();

  private static readonly ImmutableArray<MethodInfo> s_enumerableContainsMethodsInfo = typeof(Enumerable)
    .GetMethods()
    .Where(methodInfo => methodInfo.Name == nameof(Enumerable.Contains))
    .ToImmutableArray();

  #endregion

  private static ImmutableDictionary<string, string> s_propertyNames =
    new Dictionary<string, string>
    {
      { nameof(Document.EntityId), CmisTypes.RG_OWNER_ID },
      { nameof(Document.Since), CmisTypes.RG_VALID_SINCE },
      { nameof(Document.Until), CmisTypes.RG_VALID_UNTIL },
      { nameof(Document.ContentCategory), CmisTypes.RG_CONTENT_CATEGORY },
      { nameof(Document.ContentType), CmisTypes.RG_CONTENT_TYPE },
      { nameof(Document.ProtocolNumber), CmisTypes.RG_PROTOCOL_NUMBER },
      { nameof(Document.Issuer), CmisTypes.RG_ISSUER_NAME },
      { nameof(Document.IssuerCode), CmisTypes.RG_ISSUER_CODE },
      { nameof(Document.CmisId), PropertyIds.ObjectId },
      { nameof(Document.FileName), CmisTypes.RG_FILE_NAME },
      { nameof(Document.CreationDate), PropertyIds.CreationDate },
      { nameof(Document.IssueDate), CmisTypes.RG_ISSUE_DATE },
      { nameof(Document.Notes), CmisTypes.RG_NOTES },
      { nameof(Document.UploaderName), CmisTypes.RG_UPLOADER_NAME },
      { nameof(Document.ManagementSubjectIds), CmisTypes.RG_MANAGEMENT_SUBJECT_ID },
      { nameof(Document.TenantId), CmisTypes.RG_TENANT_ID },
      { nameof(Document.EstateId), CmisTypes.RG_ESTATE_ID },
      { nameof(Document.Name), PropertyIds.Name },
    }
    .ToImmutableDictionary();

  private readonly StringBuilder _sql = new();
  private string? _enumType;
  private EscapingType _escapeType;

  public string ToSql(Expression expression)
  {
    _sql.Clear();
    Visit(expression);

    return _sql.ToString();
  }

  protected override Expression VisitMethodCall(MethodCallExpression node)
  {
    // document.ContainsText(...)
    if (node.Method == s_documentContainsTextMethodInfo)
    {
      _sql.Append("CONTAINS('");

      using (new EscapingScope(this, EscapingType.CONTAINS))
      {
        Visit(node.Arguments[1]);
      }

      _sql.Append("')");

      return node;
    }

    // string.Contains(...)
    if (s_stringContainsMethodsInfo.Contains(node.Method))
    {
      var objectNode = node.Object;

      // ignoring .ToLower(...) before .Contains(...)
      if (objectNode is MethodCallExpression subMethodCall &&
        s_stringToLowerMethodsInfo.Contains(subMethodCall.Method))
      {
        objectNode = subMethodCall.Object;
      }

      Visit(objectNode);
      _sql.Append(" LIKE '%");

      using (new EscapingScope(this, EscapingType.LIKE))
      {
        Visit(node.Arguments[0]);
      }

      _sql.Append("%'");

      return node;
    }    
    
    // string.StartsWith(...)
    if (s_stringStartsWithMethodsInfo.Contains(node.Method))
    {
      Visit(node.Object);
      _sql.Append(" LIKE '");

      using (new EscapingScope(this, EscapingType.LIKE))
      {
        Visit(node.Arguments[0]);
      }

      _sql.Append("%'");

      return node;
    }

    // enumerable.Contains(...)
    if (node.Method.IsGenericMethod &&
       s_enumerableContainsMethodsInfo.Contains(node.Method.GetGenericMethodDefinition()))
    {
      var enumerable = node.Arguments[0] switch
      {
        ConstantExpression { Value: IEnumerable } constantExpression => ((IEnumerable)constantExpression.Value),
        Expression expression => Expression.Lambda<Func<IEnumerable>>(expression).Compile().Invoke(),
      };

      var array = enumerable as Array ?? enumerable.Cast<object>().ToArray();
      if (array.Length == 0)
      {
        // An empty '... IN ()' expression is not supported by CMIS, so we need to use 'FALSE'.
        // But CMIS also doesn't support expressions like '... AND FALSE', so we need to use always-false expression instead.
        // The object id should never be null, so this is an alternative of 'FALSE'
        _sql.Append($"{PropertyIds.ObjectId} IS NULL");

        return node;
      }

      Visit(node.Arguments[1]);
      _sql.Append(" IN (");

      for (int i = 0; i < array.Length; i++)
      {
        _sql.Append(FormatValue(array.GetValue(i)));

        if (i < array.Length - 1)
        {
          _sql.Append(", ");
        }
      }

      _sql.Append(")");

      return node;
    }

    //Convert the method call to the actual value
    var called = Expression.Lambda<Func<object>>(node).Compile();
    var value = called();
    _sql.Append(FormatValue(value));

    return node;
  }

  protected override Expression VisitBinary(BinaryExpression node)
  {
    //Suspends SQL conversion, to handle enum types if any appears
    var sqlUntilNow = _sql.ToString();

    _sql.Clear();

    //This works for nested expressions too - we expect to fix the situation
    // on the innermost instance
    _enumType = null;

    Visit(node.Left);

    switch (node.NodeType)
    {
      case ExpressionType.AndAlso:
        _sql.Append(" AND ");
        break;
      case ExpressionType.OrElse:
        _sql.Append(" OR ");
        break;
      case ExpressionType.Equal when node.Right is ConstantExpression { Value: null }:
        _sql.Append(" IS ");
        break;
      case ExpressionType.Equal:
        _sql.Append(" = ");
        break;
      case ExpressionType.NotEqual when node.Right is ConstantExpression { Value: null }:
        _sql.Append(" IS NOT ");
        break;
      case ExpressionType.NotEqual:
        _sql.Append(" <> ");
        break;
      case ExpressionType.LessThan:
        _sql.Append(" < ");
        break;
      case ExpressionType.LessThanOrEqual:
        _sql.Append(" <= ");
        break;
      case ExpressionType.GreaterThan:
        _sql.Append(" > ");
        break;
      case ExpressionType.GreaterThanOrEqual:
        _sql.Append(" >= ");
        break;
      // Handle other binary operations as needed.
      default:
        throw new NotSupportedException($"Operation {node.NodeType} is not supported");
    }

    Visit(node.Right);

    var binaryExpression = _sql.ToString();

    //If an enum type was encountered on any side, try converting numbers (strings of digits)
    // to the appropriate enum value string
    if (!string.IsNullOrEmpty(_enumType))
    {
      var tokens = binaryExpression.Split(' ');
      var first = tokens.First();
      var last = tokens.Last();
      var others = tokens[1..^1];
      if (first.All(char.IsDigit))
      {
        first = GetEnumStringValue(_enumType, first);
      }
      if (last.All(char.IsDigit))
      {
        last = GetEnumStringValue(_enumType, last);
      }
      binaryExpression = string.Join(" ",
        new[] { first }
          .Concat(others)
          .Concat(new[] { last }));
    }

    _sql.Clear();
    _sql.Append(sqlUntilNow);
    _sql.Append("(");
    _sql.Append(binaryExpression);
    _sql.Append(")");

    return node;
  }

  protected override Expression VisitMember(MemberExpression node)
  {
    if (node.Expression != null && node.Expression.Type.IsEnum)
    {
      // Convert enum to string
      var value = Expression.Lambda(node).Compile().DynamicInvoke();
      _sql.Append(value?.ToString() ?? string.Empty);
    }
    else if (node.Expression is ConstantExpression)
    {
      var value = Expression.Lambda(node).Compile().DynamicInvoke();
      _sql.Append(FormatValue(value));

      return node;
    }
    else
    {
      if (node.Member.DeclaringType is not null
        && node.Member.MemberType == System.Reflection.MemberTypes.Property
        && node.Member.DeclaringType.GetProperty(node.Member.Name)!.PropertyType.IsEnum)
      {
        _enumType = node.Member.DeclaringType
          .GetProperty(node.Member.Name)!
          .PropertyType.AssemblyQualifiedName;
      }

      if (s_propertyNames.ContainsKey(node.Member.Name))
      {
        _sql.Append(s_propertyNames[node.Member.Name]);
      }
      else
      {
        _sql.Append(node.Member.Name);
      }
    }

    return node;
  }

  protected override Expression VisitConstant(ConstantExpression node)
  {
    if (node.Type.IsEnum)
    {
      _sql.Append(node.Value?.ToString() ?? string.Empty);
    }
    else
    {
      _sql.Append(FormatValue(node.Value));
    }

    return node;
  }

  protected override Expression VisitConditional(ConditionalExpression node)
  {
    // condition ? false : boolean
    if (node.IfTrue is ConstantExpression { Value: false } && node.IfFalse.Type == typeof(bool))
    {
      // !condition && boolean
      return Visit(Expression.AndAlso(Expression.Not(node.Test), node.IfFalse));
    }

    return base.VisitConditional(node);
  }

  protected override Expression VisitUnary(UnaryExpression node)
  {
    if (node.NodeType == ExpressionType.Not)
    {
      _sql.Append("NOT (");
      Visit(node.Operand);
      _sql.Append(')');

      return node;
    }

    return base.VisitUnary(node);
  }

  private string FormatValue(object? value)
  {
    if (value is null)
    {
      return "NULL";
    }
    
    if (value is string @string)
    {
      return $"{Escape(@string)}";
    }

    if (value is Enum @enum)
    {
      return $"{Escape(@enum.ToString())}";
    }

    if (value is DateTime dateTime)
    {
      return $"TIMESTAMP '{dateTime.ToUniversalTime():yyyy-MM-dd'T'HH:mm:ss.fff'Z'}'";
    }

    if (value is DateOnly dateOnly)
    {
      return $"TIMESTAMP '{dateOnly:yyyy-MM-dd'T00:00:00.000Z'}'";
    }

    if (value is true)
    {
      return "TRUE";
    }

    if (value is false)
    {
      return "FALSE";
    }

    return value.ToString() ?? string.Empty;
  }

  private static string GetEnumStringValue(string enumType, string enumValue)
  {
    var numVal = Convert.ToInt32(enumValue);
    var type = Type.GetType(enumType)!;
    var enumStringValue = Enum.GetName(type, numVal);

    return string.IsNullOrEmpty(enumStringValue)
      ? "NULL"
      : ("'" + enumStringValue + "'");
  }

  private string Escape(string value)
    => _escapeType switch
    {
      EscapingType.DEFAULT  => EscapeDefault(value),
      EscapingType.LIKE     => EscapeLike(value),
      EscapingType.CONTAINS => EscapeContains(value),
      
      _ => throw new NotSupportedException()
    };

  /// <summary>
  /// Source: <see href="https://svn.apache.org/repos/asf/chemistry/portcmis/trunk/PortCMIS/client/ClientImpl.cs"/>.
  /// </summary>
  private static string EscapeDefault(string value)
  {
    var builder = new StringBuilder("'");
    for (int i = 0; i < value.Length; i++)
    {
      var symbol = value[i];
      if (symbol == '\'' || symbol == '\\')
      {
        builder.Append('\\');
      }

      builder.Append(symbol);
    }

    builder.Append('\'');

    return builder.ToString();
  }

  /// <summary>
  /// Source: <see href="https://svn.apache.org/repos/asf/chemistry/portcmis/trunk/PortCMIS/client/ClientImpl.cs"/>.
  /// </summary>
  private static string EscapeLike(string value)
  {
    var builder = new StringBuilder();
    for (int i = 0; i < value.Length; i++)
    {
      var symbol = value[i];

      if (symbol == '\'')
      {
        builder.Append('\\');
      }
      else if (symbol == '\\')
      {
        if (i + 1 < value.Length && (value[i + 1] == '%' || value[i + 1] == '_'))
        {
          // no additional back slash
        }
        else
        {
          builder.Append('\\');
        }
      }

      builder.Append(symbol);
    }

    return builder.ToString();
  }

  /// <summary>
  /// Source: <see href="https://svn.apache.org/repos/asf/chemistry/portcmis/trunk/PortCMIS/client/ClientImpl.cs"/>.
  /// </summary>
  private static string EscapeContains(string value)
  {
    var builder = new StringBuilder();
    for (int i = 0; i < value.Length; i++)
    {
      var symbol = value[i];

      if (symbol == '\\')
      {
        builder.Append('\\');
      }
      else if (symbol == '\'' || symbol == '\"')
      {
        builder.Append("\\\\\\");
      }

      builder.Append(symbol);
    }

    return builder.ToString();
  }
}
