using System.Globalization;
using MigraDoc.DocumentObjectModel;
using MigraDoc.DocumentObjectModel.Tables;

namespace RealGimm.Core.Reports.Generators.Shared;

public static class ReportGeneratorUtils
{
  public static Unit GetUnit(double cm = 2.5) => Unit.FromCentimeter(cm);
  
  public static string FormatDecimal(decimal? value)
    => Math.Round(value ?? 0, 2, MidpointRounding.AwayFromZero).ToString();

  public static string FormatCurrency(decimal? value)
    => string.Format(new CultureInfo("it-IT"), "{0:C}", Math.Round(value ?? 0, 2, MidpointRounding.AwayFromZero));

  public static void StyleDefaultHeader(Row row, double spaceBefore = 0.20, double spaceAfter = 0.25)
  {
    row.TopPadding = 1;
    row.Height = 20;
    row.Format.Font.Size = 11;
    row.Format.Font.Bold = true;
    row.Shading.Color = Colors.PaleGoldenrod;
    row.Format.SpaceBefore = GetUnit(spaceBefore);
    row.Format.SpaceAfter = GetUnit(spaceAfter);
    row.VerticalAlignment = VerticalAlignment.Center;
  }

  public static void StyleDefaultFooter(Row row, double spaceBefore = 0.25, double spaceAfter = 0.25)
  {
    row.Height = 20;
    row.Format.Font.Size = 11;
    row.Format.Font.Bold = true;
    row.Format.SpaceBefore = GetUnit(spaceBefore);
    row.Format.SpaceAfter = GetUnit(spaceAfter);
    row.VerticalAlignment = VerticalAlignment.Center;
  }

  public static void StyleParagraph(Paragraph paragraph, int fontSize, bool bold, double spaceAfter, double? spaceBefore = null, bool centered = false)
  {
    paragraph.Format.Font.Size = fontSize;
    paragraph.Format.Font.Bold = bold;
    paragraph.Format.SpaceAfter = GetUnit(spaceAfter);

    if (spaceBefore is not null)
    {
        paragraph.Format.SpaceBefore = GetUnit(spaceBefore.Value);
    }

    if (centered)
    {
      paragraph.Format.Alignment = ParagraphAlignment.Center;
    }
  }

  public static void StyleSection(Section section, PageFormat pageFormat, Orientation orientation, double? leftMargin = null)
  {
    section.PageSetup.Orientation = orientation;
    section.PageSetup.PageFormat = pageFormat;
    section.PageSetup.TopMargin = GetUnit(1);

    if (leftMargin is not null)
    {
      section.PageSetup.LeftMargin = GetUnit(leftMargin.Value);
    }
  }
}
