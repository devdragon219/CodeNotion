using System.Diagnostics;

namespace RealGimm.Core.Shared;

public static class PdfToPdfaConverter
{
  public static byte[] Convert(byte[] pdfBytes)
  {
    var pdfTempFileName = Path.GetTempFileName();
    File.WriteAllBytes(pdfTempFileName, pdfBytes);

    var pdfaTempFileName = Path.GetTempFileName();

    var processStartInfo = new ProcessStartInfo
    {
      FileName = "gs",
      Arguments = $"-dPDFA -dBATCH -dNOPAUSE -sProcessColorModel=DeviceRGB -sDEVICE=pdfwrite -sPDFACompatibilityPolicy=1 -sOutputFile={pdfaTempFileName} {pdfTempFileName}",
      RedirectStandardOutput = true,
      RedirectStandardError = true,
      UseShellExecute = false,
      CreateNoWindow = true
    };

    byte[] pdfaBytes;

    using (var process = new Process())
    {
      process.StartInfo = processStartInfo;
      process.Start();

      process.WaitForExit();

      if (process.ExitCode != 0)
      {
        throw new Exception($"Ghostscript failed with code {process.ExitCode}. Error: {process.StandardError.ReadToEnd()}");
      }

      pdfaBytes = File.ReadAllBytes(pdfaTempFileName);
    }

    File.Delete(pdfaTempFileName);
    File.Delete(pdfTempFileName);

    return pdfaBytes;
  }
}
