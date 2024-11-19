using System.Text;
using System.Text.RegularExpressions;
using Xunit.Abstractions;

namespace RealGimm.FunctionalTests.TenantCtl;

public class XunitTextWriter : TextWriter
{
  private readonly ITestOutputHelper _output;
  private readonly StringBuilder _sb = new();

  private readonly List<(Regex, Action<string>)> matchers = new List<(Regex, Action<string>)>();

  public bool SomethingWritten { get; private set; }

  private readonly bool alsoOutputConsole;

  public XunitTextWriter(ITestOutputHelper output, bool alsoOutputConsole = false)
  {
    _output = output;
    this.alsoOutputConsole = alsoOutputConsole;
  }

  public override Encoding Encoding => Encoding.Unicode;

  public void AddMatcher(Regex match, Action<string> handler)
  {
    matchers.Add((match, handler));
  }

  public override void Write(char ch)
  {
    if (!SomethingWritten) SomethingWritten = true;

    if (alsoOutputConsole) Console.Out.Write(ch);

    if (ch == '\n')
    {
      var str = _sb.ToString();
      _output.WriteLine(str);
      _sb.Clear();

      foreach (var (m, a) in matchers)
      {
        if (m.IsMatch(str))
        {
          a(str);
        }
      }
    }
    else
    {
      _sb.Append(ch);
    }
  }

  protected override void Dispose(bool disposing)
  {
    if (disposing)
    {
      if (_sb.Length > 0)
      {
        var str = _sb.ToString();
        _output.WriteLine(str);
        _sb.Clear();


        foreach (var (m, a) in matchers)
        {
          if (m.IsMatch(str))
          {
            a(str);
          }
        }
      }
    }

    base.Dispose(disposing);
  }
}