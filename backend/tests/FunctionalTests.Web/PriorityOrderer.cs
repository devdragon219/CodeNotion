﻿using Xunit.Abstractions;
using Xunit.Sdk;

[assembly: TestCaseOrderer("RealGimm.FunctionalTests.Web.PriorityOrderer", "RealGimm.FunctionalTests.Web")]
[assembly: TestCollectionOrderer("RealGimm.FunctionalTests.Web.PriorityOrderer", "RealGimm.FunctionalTests.Web")]

namespace RealGimm.FunctionalTests.Web;

public class PriorityOrderer : ITestCaseOrderer, ITestCollectionOrderer
{
  public IEnumerable<TTestCase> OrderTestCases<TTestCase>(
    IEnumerable<TTestCase> testCases) where TTestCase : ITestCase
  {
    string assemblyName = typeof(TestPriorityAttribute).AssemblyQualifiedName!;
    var sortedMethods = new SortedDictionary<int, List<TTestCase>>();
    foreach (TTestCase testCase in testCases)
    {
      int priority = testCase.TestMethod.Method
        .GetCustomAttributes(assemblyName)
        .FirstOrDefault()
        ?.GetNamedArgument<int>(nameof(TestPriorityAttribute.Priority))
        ?? GetDefaultOrdering(testCase.TestMethod);

      GetOrCreate(sortedMethods, priority).Add(testCase);
    }

    foreach (TTestCase testCase in
             sortedMethods.Keys.SelectMany(
               priority => sortedMethods[priority].OrderBy(
                 testCase => testCase.TestMethod.Method.Name)))
    {
      yield return testCase;
    }
  }

  private static int GetDefaultOrdering(ITestMethod testMethod)
  {
    var str = testMethod.TestClass.Class.Name + testMethod.Method.Name;

    int djb2Hash = 5381;
    foreach (char c in str)
    {
      djb2Hash = ((djb2Hash << 5) + djb2Hash + c) % 2147483647;
    }

    return djb2Hash;
  }

  private static TValue GetOrCreate<TKey, TValue>(
    IDictionary<TKey, TValue> dictionary, TKey key)
    where TKey : struct
    where TValue : new() =>
    dictionary.TryGetValue(key, out TValue? result)
      ? result
      : (dictionary[key] = new TValue());

  public IEnumerable<ITestCollection> OrderTestCollections(IEnumerable<ITestCollection> testCollections)
  {
    foreach (var tc in testCollections.OrderBy(t =>
      {

        int djb2Hash = 5381;
        foreach (char c in t.DisplayName)
        {
          djb2Hash = ((djb2Hash << 5) + djb2Hash + c) % 2147483647;
        }

        return djb2Hash;
      }))
    {
      yield return tc;
    }
  }
}