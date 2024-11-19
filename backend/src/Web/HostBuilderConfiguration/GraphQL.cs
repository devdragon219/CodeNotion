using HotChocolate.AspNetCore;
using HotChocolate.AspNetCore.Extensions;
using HotChocolate.Data.Filters;
using HotChocolate.Diagnostics;
using HotChocolate.Execution.Configuration;
using HotChocolate.Execution.Options;
using HotChocolate.Types.Pagination;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Filtering;

namespace RealGimm.Web.HostBuilderConfiguration;

public static class GraphQL
{
  public static IRequestExecutorBuilder ConfigureRGGraphQL(this IServiceCollection services)
  {
    var gqlBuilder = services
      .AddGraphQLServer()
      .SetRequestOptions(_ => new RequestExecutorOptions { ExecutionTimeout = TimeSpan.FromMinutes(1) })
      .AddConvention<IFilterConvention, CustomFilterConvention>()
      .AddSpatialTypes()
      .AddHttpRequestInterceptor<HttpRequestPermissionInterceptor>()
      .AddDiagnosticEventListener<ExecutionErrorLogger>()
      .UseField<ResultValidationLocalizer>()
      .AddAuthorization()
      .AddFiltering()
      .ModifyOptions(options =>
      {
        options.EnableFlagEnums = true;
        options.EnableOneOf = true;
      })
      .AddQueryType<Query>()
      .AddMutationType<Mutation>()
      .AddSubscriptionType<Subscription>()
      .AddInMemorySubscriptions()
      .ModifyRequestOptions(o => o.IncludeExceptionDetails = true)
      .AddCursorPagingProvider<QueryableCursorPagingProvider>(defaultProvider: true)
      .AddInstrumentation(options =>
      {
        options.RequestDetails = RequestDetails.Operation
          | RequestDetails.Query;
        options.Scopes = ActivityScopes.ExecuteHttpRequest
          | ActivityScopes.DataLoaderBatch
          | ActivityScopes.ParseHttpRequest
          | ActivityScopes.ExecuteOperation;
      });

    WebCommons.GraphQL.GraphQLCommonConfiguration.AddGqlConfig(gqlBuilder);

    Anag.AnagConfiguration.AddGqlConfig(gqlBuilder);
    Asst.AsstConfiguration.AddGqlConfig(gqlBuilder);
    Docs.DocsConfiguration.AddGqlConfig(gqlBuilder);
    Prop.PropConfiguration.AddGqlConfig(gqlBuilder);
    Admin.AdminConfiguration.AddGqlConfig(gqlBuilder);
    Common.CommonConfiguration.AddGqlConfig(gqlBuilder);
    Nrgy.NrgyConfiguration.AddGqlConfig(gqlBuilder);
    Econ.EconConfiguration.AddGqlConfig(gqlBuilder);
    Fclt.FcltConfiguration.AddGqlConfig(gqlBuilder);

    gqlBuilder
      .AddSorting()
      .AddProjections()
      .InitializeOnStartup();

    return gqlBuilder;
  }

  public static GraphQLEndpointConventionBuilder MapRGGraphQL(this WebApplication app)
  {
    var graphQLEndpointBuilder = app.MapGraphQL("/api/v1/graphql");

    if (!app.Environment.IsDevelopment())
    {
      graphQLEndpointBuilder.WithOptions(new GraphQLServerOptions { Tool = { Enable = false } });
    }

    return graphQLEndpointBuilder;
  }
}
