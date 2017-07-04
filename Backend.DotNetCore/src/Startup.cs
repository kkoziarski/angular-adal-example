using System;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace WebApiValues
{
    using Microsoft.IdentityModel.Tokens;

    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            //Envrionment variable ASPNETCORE_ENVIRONMENT=Development must be defined
            if (env.IsDevelopment())
            {
                // dotnet user-secrets -h
                // SET VALUE: dotnet user-secrets set MySecret ValueOfMySecret
                // LIST VALUES: dotnet user-secrets list
                // %APPDATA%\microsoft\UserSecrets\<userSecretsId>\secrets.json
                builder.AddUserSecrets<Startup>();
            } 

            builder.AddEnvironmentVariables();
            this.Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddCors();
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(this.Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            var logger = loggerFactory.CreateLogger("default");

            app.UseCors(builder =>
                builder.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod()
            );
            
            string audience = this.Configuration["MicrosoftIdentity:ClientId"];
            if (audience == "YOUR CLIENT ID")
            {
                logger.LogError("Your appsettings.json has not been updated with the client id (app id) of your application");
                Environment.Exit(1);
            }

            var tokenValidationParameters = new TokenValidationParameters();
            tokenValidationParameters.ValidateIssuer = false;

            var options = new JwtBearerOptions
            {
                Audience = this.Configuration["MicrosoftIdentity:ClientId"],
                Authority = this.Configuration["MicrosoftIdentity:Authority"], // https://login.microsoftonline.com/{tenantId}
                TokenValidationParameters = tokenValidationParameters,
                //RequireHttpsMetadata = false
            };

            app.UseJwtBearerAuthentication(options);

            app.UseMvc();
        }
    }
    public class StartupBak
    {
        public StartupBak(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            this.Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(this.Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseMvc();
        }
    }
}
