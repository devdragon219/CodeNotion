using System.Reflection;
using System.Text.RegularExpressions;
using McMaster.Extensions.CommandLineUtils;
using Xunit.Abstractions;

namespace RealGimm.FunctionalTests.TenantCtl;

public class TestConsole : IConsole
{
  private readonly ITestOutputHelper _output;

  public XunitTextWriter Out { get; set; }
  public XunitTextWriter Error { get; set; }

  TextWriter IConsole.Out => Out;
  TextWriter IConsole.Error => Error;

  public TestConsole(ITestOutputHelper output)
  {
    _output = output;
    Out = new XunitTextWriter(_output);
    Error = new XunitTextWriter(_output);
  }

  public bool OutWritten => Out.SomethingWritten;
  public bool ErrWritten => Error.SomethingWritten;

  public void Reset()
  {
    Out = new XunitTextWriter(_output);
    Error = new XunitTextWriter(_output);
  }

  public void AddOutMatcher(Regex match, Action<string> handler)
  {
    Out.AddMatcher(match, handler);
  }

  public void AddErrMatcher(Regex match, Action<string> handler)
  {
    Error.AddMatcher(match, handler);
  }

  public TextReader In => throw new NotImplementedException();

  public bool IsInputRedirected => throw new NotImplementedException();

  public bool IsOutputRedirected => true;

  public bool IsErrorRedirected => true;

  public ConsoleColor ForegroundColor { get; set; }
  public ConsoleColor BackgroundColor { get; set; }

  public event ConsoleCancelEventHandler? CancelKeyPress;

  public void ResetColor()
  {
  }

  public void RaiseCancelKeyPress()
  {
    // See https://github.com/dotnet/corefx/blob/f2292af3a1794378339d6f5c8adcc0f2019a2cf9/src/System.Console/src/System/ConsoleCancelEventArgs.cs#L14
    var eventArgs = typeof(ConsoleCancelEventArgs)
        .GetConstructors(BindingFlags.NonPublic | BindingFlags.Instance)
        .First()
        .Invoke(new object[] { ConsoleSpecialKey.ControlC });
    CancelKeyPress?.Invoke(this, (ConsoleCancelEventArgs)eventArgs);
  }
}
