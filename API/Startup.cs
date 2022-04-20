using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Errors;
using API.ExtentsionsStartup;
using API.Helpers;
using API.Middleware;
using AutoMapper;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Identity;
using Infrastructure.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using StackExchange.Redis;

namespace API
{
    public class Startup
    {

        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;

        }



        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<ITokenService , TokenService>()  ;    
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IBasketRepository, BasketRepository>();
            services.AddScoped(typeof(IGenericRepository<>), (typeof(GenericRepository<>)));
            services.AddAutoMapper(typeof(MappingProfiles));
            services.AddControllers();
////// this swagger service pardefault ( mba3d ma3malna l exception mte3na rja3na zedneha mn jdid
/////   mn lout 5ater tartib yefre9 )
            /*services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });*/
            services.AddDbContext<StoreContext>(x =>
                        x.UseSqlite(_configuration.GetConnectionString("DefaultConnection"))
            );
            services.AddDbContext<AppIdentityDbContext>(x =>
            
               x.UseSqlite(_configuration.GetConnectionString("IdentityConnextion"))
            );
            
            services.AddSingleton<IConnectionMultiplexer>(c => {
                var configurationRedis = ConfigurationOptions.Parse(_configuration.GetConnectionString("Redis"), true);
                return ConnectionMultiplexer.Connect(configurationRedis);
            });

            services.Configure<ApiBehaviorOptions>(
                options =>
                {
                    options.InvalidModelStateResponseFactory = actionContext =>
                   {
                       var errors = actionContext.ModelState
                                   .Where(e => e.Value.Errors.Count > 0)
                                   .SelectMany(x => x.Value.Errors)
                                   .Select(x => x.ErrorMessage).ToArray();

                       var errorsResponse = new ApiValidationErrorResponse
                       {
                           Errors = errors
                       };

                       return new BadRequestObjectResult(errorsResponse);
                   };
                }
            );

            services.AddIdentityService(_configuration);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
                var securitySchema =new OpenApiSecurityScheme
                {
                    Description="JWT Auth Bearer Scheme",
                    Name="Authorization",
                    In=ParameterLocation.Header,
                    Type=SecuritySchemeType.Http,
                    Scheme="bearer",
                    Reference=new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                };
                c.AddSecurityDefinition("Bearer",securitySchema);
                var securityRequirment = new OpenApiSecurityRequirement{{securitySchema, new[]
                {"Bearer"}}};
                c.AddSecurityRequirement(securityRequirment);


            });

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
                });
            });
        }



        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            /* if (env.IsDevelopment())
             {
                 app.UseDeveloperExceptionPage();
                 //app.UseSwagger();
                 //app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
             }*/

            app.UseMiddleware<ExceptionMiddleware>();
            app.UseStatusCodePagesWithReExecute("/errors/{0}");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseStaticFiles();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();
            

            app.UseSwagger();
            app.UseSwaggerUI(c => {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");});

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
