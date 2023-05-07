using EpicAmbulance.Database;
using EpicAmbulance.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Register configuration
ConfigurationManager configuration = builder.Configuration;

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add database service
builder.Services.AddDbContext<DataContext>(option => option.UseNpgsql(configuration.GetConnectionString("DefaultConnection"),
    b => b.MigrationsAssembly("EpicAmbulance")));

// Add repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAmbulanceRepository, AmbulanceRepository>();
builder.Services.AddScoped<ISystemUserRepository, SystemUserRepository>();
builder.Services.AddScoped<IHospitalUserRepository, HospitalUserRepository>();
builder.Services.AddScoped<IAmbulanceCrewMemberRepository, AmbulanceCrewMemberRepository>();
builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<IHospitalRepository, HospitalRepository>();

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy",
            builder =>
            {
                builder.WithOrigins(new string[] { "http://localhost:4200" }).AllowAnyMethod().AllowAnyHeader();
            });
        });
}

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("CorsPolicy");

app.Run();
