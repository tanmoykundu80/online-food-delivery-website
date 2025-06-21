using Microsoft.EntityFrameworkCore;
using Yammiee.Models;
using Yammiee.Models.Datamanager;
using Yammiee.Models.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// Database
builder.Services.AddDbContext<ProjectContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ProjectCon")));

// Dependency Injection
builder.Services.AddTransient<Idatarepository<User>, UserManager>(); // ✅ Keep your original
builder.Services.AddTransient<Idatarepository<Admin>, AdminManager>();

// CORS policy for Angular frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", builder =>
    {
        builder.WithOrigins("http://localhost:4200")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();

// Use CORS policy
app.UseCors("AllowFrontend");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
