using System.Text;
using PdfSharp.Pdf.Content.Objects;
using PdfSharp.Pdf.Content;
using PdfSharp.Pdf;

namespace RealGimm.FunctionalTests.Web.Extensions;

internal static class PdfExtensions
{
  public static string ExtractText(this PdfDocument document)
  {
    var stringBuilder = new StringBuilder();

    foreach (var page in document.Pages)
    {
      foreach (var cObject in ContentReader.ReadContent(page))
      {
        foreach (var text in cObject.ExtractText())
        {
          stringBuilder.AppendLine(text);
        }
      }

      stringBuilder.AppendLine();
    }

    return stringBuilder.ToString().Trim();
  }

  private static IEnumerable<string> ExtractText(this CObject cObject)
  {
    if (cObject is COperator cOperator)
    {
      if (cOperator.OpCode.Name != OpCodeName.Tj.ToString() &&
        cOperator.OpCode.Name != OpCodeName.TJ.ToString())
      {
        yield break;
      }

      foreach (var cOperand in cOperator.Operands)
      {
        foreach (var text in ExtractText(cOperand))
        {
          yield return text;
        }
      }

      yield break;
    }

    if (cObject is CSequence cSequence)
    {
      foreach (var element in cSequence)
      {
        foreach (var text in ExtractText(element))
        {
          yield return text;
        }
      }

      yield break;
    }

    if (cObject is CString cString)
    {
      // here are some problems with text encoding, so this is a hack to decode the text
      yield return DecodeCString(cString);
    }
  }

  private static string DecodeCString(CString cString)
  {
    var bytes = Encoding.UTF8
      .GetBytes(cString.Value)
      .Select((@byte, index) => new { @byte, index })
      .Where(x => x.index % 2 != 0)
      .Select(x => x.@byte)
      .ToArray();

    var temp = Encoding.UTF8.GetString(bytes);

    var dictionary = new Dictionary<char, char>
    {
      ['\u000F'] = ',',
      ['\u0010'] = '-',
      ['\u0011'] = '.',
      ['\u0012'] = '/',
      ['\u001D'] = ':',
      ['\u0013'] = '0',
      ['\u0014'] = '1',
      ['\u0015'] = '2',
      ['\u0016'] = '3',
      ['\u0017'] = '4',
      ['\u0018'] = '5',
      ['\u0019'] = '6',
      ['\u001A'] = '7',
      ['\u001B'] = '8',
      ['\u001C'] = '9',
      ['\u0024'] = 'A',
      ['\u0025'] = 'B',
      ['\u0026'] = 'C',
      ['\u0027'] = 'D',
      ['\u0028'] = 'E',
      ['\u0029'] = 'F',
      ['\u002A'] = 'G',
      ['\u002B'] = 'H',
      ['\u002C'] = 'I',
      ['\u002D'] = 'J',
      ['\u002E'] = 'K',
      ['\u002F'] = 'L',
      ['\u0030'] = 'M',
      ['\u0031'] = 'N',
      ['\u0032'] = 'O',
      ['\u0033'] = 'P',
      ['\u0034'] = 'Q',
      ['\u0035'] = 'R',
      ['\u0036'] = 'S',
      ['\u0037'] = 'T',
      ['\u0038'] = 'U',
      ['\u0039'] = 'V',
      ['\u003A'] = 'W',
      ['\u003B'] = 'X',
      ['\u003C'] = 'Y',
      ['\u003D'] = 'Z',
      ['\u0044'] = 'a',
      ['\u0045'] = 'b',
      ['\u0046'] = 'c',
      ['\u0047'] = 'd',
      ['\u0048'] = 'e',
      ['\u0049'] = 'f',
      ['\u004A'] = 'g',
      ['\u004B'] = 'h',
      ['\u004C'] = 'i',
      ['\u004D'] = 'j',
      ['\u004E'] = 'k',
      ['\u004F'] = 'l',
      ['\u0050'] = 'm',
      ['\u0051'] = 'n',
      ['\u0052'] = 'o',
      ['\u0053'] = 'p',
      ['\u0054'] = 'q',
      ['\u0055'] = 'r',
      ['\u0056'] = 's',
      ['\u0057'] = 't',
      ['\u0058'] = 'u',
      ['\u0059'] = 'v',
      ['\u005A'] = 'w',
      ['\u005B'] = 'x',
      ['\u005C'] = 'y',
      ['\u005D'] = 'z',
      ['\u0069'] = 'á',
      ['\u006A'] = 'à'
    };

    return string.Join(null, temp.Select(c => dictionary.TryGetValue(c, out var value) ? value.ToString() : @$"[\u{(int)c:X4}]"));
  }
}
