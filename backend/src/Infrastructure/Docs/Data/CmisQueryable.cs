using System.Collections;
using System.Linq.Expressions;

namespace RealGimm.Infrastructure.Docs.Data;

public class CmisQueryable<T> : IQueryable<T>, IOrderedQueryable<T>, IAsyncEnumerable<T>
{
  public Type ElementType => typeof(T);

  public Expression Expression { get; private set; }

  public IQueryProvider Provider { get; }

  public CmisQueryable(Expression expression, IQueryProvider provider)
  {
    Provider = provider;
    Expression = expression.NodeType == ExpressionType.Default && expression.Type == typeof(void)
      ? Expression.Constant(this)
      : expression;
  }

  public IEnumerator<T> GetEnumerator()
  {
    return Provider.Execute<IEnumerable<T>>(Expression).GetEnumerator();
  }

  IEnumerator IEnumerable.GetEnumerator()
  {
    return Provider.Execute<IEnumerable>(Expression).GetEnumerator();
  }

  public IAsyncEnumerator<T> GetAsyncEnumerator(CancellationToken cancellationToken = default)
  {
    return new FakeAsyncEnumeratorAdapter<T>(
      Provider.Execute<IEnumerable<T>>(Expression).GetEnumerator()
      );
  }

  public class FakeAsyncEnumeratorAdapter<K> : IAsyncEnumerator<K>
  {
    private readonly IEnumerator<K> _enumerator;

    public FakeAsyncEnumeratorAdapter(IEnumerator<K> enumerator)
    {
      _enumerator = enumerator;
    }

    public K Current => _enumerator.Current;

    public ValueTask DisposeAsync()
    {
      _enumerator.Dispose();
      return ValueTask.CompletedTask;
    }

    public ValueTask<bool> MoveNextAsync()
    {
      return new ValueTask<bool>(_enumerator.MoveNext());
    }
  }
}
