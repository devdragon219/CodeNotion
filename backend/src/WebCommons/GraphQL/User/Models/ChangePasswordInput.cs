namespace RealGimm.WebCommons.GraphQL.User.Models;

public record ChangePasswordInput(string Username, string CurrentPassword, string NewPassword);