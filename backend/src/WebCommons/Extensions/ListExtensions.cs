using RealGimm.WebCommons.GraphQL.User.Models;

namespace RealGimm.WebCommons.Extensions;

public static class ListExtensions
{
  public static void FixOrderFields(this IList<WidgetSectionInput> sections)
  {
    for (int sectionIndex = 0; sectionIndex < sections.Count; sectionIndex++)
    {
      var section = sections[sectionIndex];
      section.Order = sectionIndex;

      for (int rowIndex = 0; rowIndex < section.Rows.Length; rowIndex++)
      {
        var row = section.Rows[rowIndex];
        row.Order = rowIndex;

        for (int widgetIndex = 0; widgetIndex < row.Widgets.Length; widgetIndex++)
        {
          var widget = row.Widgets[widgetIndex];
          widget.Order = widgetIndex;
        }
      }
    }
  }
}
