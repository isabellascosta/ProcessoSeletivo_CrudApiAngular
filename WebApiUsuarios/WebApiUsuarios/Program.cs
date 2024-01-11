using Microsoft.EntityFrameworkCore;
using WebApiUsuarios.Data;
namespace WebApiUsuarios
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var myAllowSpecificOrigins = "myAllowSpecificOrigins";
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            //montando o builder para configuração do servidor
            builder.Services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
            }
            );
            //habilitando o Cor para ser utilizado
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: myAllowSpecificOrigins,
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:4200")
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                    });
            });
                var app = builder.Build();

                // Configure the HTTP request pipeline.
                if (app.Environment.IsDevelopment())
                {
                    app.UseSwagger();
                    app.UseSwaggerUI();
                }

                app.UseHttpsRedirection();
                //Usando o Cors
                app.UseCors(myAllowSpecificOrigins);
                app.UseAuthorization();


                app.MapControllers();

                app.Run();
            }
    }
    }