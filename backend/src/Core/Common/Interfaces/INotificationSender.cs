namespace RealGimm.Core.Common.Interfaces;

public interface INotificationSender
{
  Task SendNotificationAsync(string to, string from, string alertBody, string textBody);
}
