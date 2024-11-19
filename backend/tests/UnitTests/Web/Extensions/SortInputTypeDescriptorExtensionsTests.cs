using System.Linq.Expressions;
using System.Reflection;
using HotChocolate.Data.Sorting;
using HotChocolate.Types.Descriptors;
using HotChocolate.Types.Descriptors.Definitions;
using NSubstitute;
using RealGimm.WebCommons.Extensions;
using Xunit;

namespace RealGimm.UnitTests.Web.Extensions;

// BaseClass & DerivedClass should be public.
// .Field(...) method of sorting descriptor expecting strong typed lambda.
// It fails in runtime if a class is not reachable, like a private one
public class SortInputTypeDescriptorExtensionsTests
{
  public class BaseClass
  {
    public virtual string Property1 => null!;
    public string Property2 => null!;
  }

  public class DerivedClass : BaseClass
  {
    public override string Property1 => null!;
    public string Property3 { get; } = null!;
    public int Property4 { get; set; }
  }

  private static ISortInputTypeDescriptor<T> CreateSortInputTypeDescriptor<T>()
  {
    var contextMock = Substitute.For<IDescriptorContext>();

    var descriptor = (ISortInputTypeDescriptor<T>)typeof(SortInputTypeDescriptor<T>)
      .GetConstructor(BindingFlags.Instance | BindingFlags.NonPublic, new[] { typeof(IDescriptorContext), typeof(string) })!
      .Invoke(new object?[] { contextMock, null });

    return descriptor;
  }

  private static IBindableList<SortFieldDescriptor> GetSortInputTypeDescriptorFields<T>(ISortInputTypeDescriptor<T> descriptor)
    => (IBindableList<SortFieldDescriptor>)descriptor
      .GetType()
      .GetProperty("Fields", BindingFlags.NonPublic | BindingFlags.Instance)!
      .GetValue(descriptor)!;

  private static SortFieldDefinition GetSortFieldDescriptorDefinition(SortFieldDescriptor descriptor)
    => (SortFieldDefinition)descriptor
      .GetType()
      .GetProperty("Definition", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly)!
      .GetValue(descriptor)!;

  [Fact]
  public void Should_BindUniquiePropertiesOnly()
  {
    // Arrange
    var descriptor = CreateSortInputTypeDescriptor<BaseClass>();
    var fields = GetSortInputTypeDescriptorFields(descriptor);
    
    Expression expectedProperty3Expression = (BaseClass x) => ((DerivedClass)x).Property3;
    Expression expectedProperty4Expression = (BaseClass x) => ((DerivedClass)x).Property4;

    // Act
    descriptor.BindDerivedTypeFields<BaseClass, DerivedClass>();

    // Assert
    Assert.Equal(2, fields.Count);

    var definitions = fields
      .Select(GetSortFieldDescriptorDefinition)
      .ToDictionary(definition => definition.Name, definition => definition);

    Assert.Equal(expectedProperty3Expression.ToString(), definitions["property3"].Expression!.ToString());
    Assert.Equal(expectedProperty4Expression.ToString(), definitions["property4"].Expression!.ToString());
  }
}
