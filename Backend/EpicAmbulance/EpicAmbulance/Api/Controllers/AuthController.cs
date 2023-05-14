using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using EpicAmbulance.Database;
using EpicAmbulance.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace EpicAmbulance.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ISystemUserRepository _systemUserRepository;
        private readonly IHospitalUserRepository _hospitalUserRepository;
        private readonly IAmbulanceCrewMemberRepository _ambulanceCrewMemberRepository;
        private readonly IConfiguration _configuration;

        public AuthController(
            IUserRepository userRepository,
            ISystemUserRepository systemUserRepository,
            IHospitalUserRepository hospitalUserRepository,
            IAmbulanceCrewMemberRepository ambulanceCrewMemberRepository,
            IConfiguration configuration
            )
        {
            _userRepository = userRepository;
            _systemUserRepository = systemUserRepository;
            _hospitalUserRepository = hospitalUserRepository;
            _ambulanceCrewMemberRepository = ambulanceCrewMemberRepository;
            _configuration = configuration;
        }

        // Create JWT key
        public string GenerateJWTKey(Claim[] claims)
        {
            var secretKey = _configuration["JWT:SecretKey"]!;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:ValidIssuer"],
                _configuration["Jwt:ValidAudience"],
                claims,
                expires: null,
                signingCredentials: signIn);

            var JWTKey = new JwtSecurityTokenHandler().WriteToken(token);

            return JWTKey;
        }

        // Route for admin login
        [HttpPost("login/admin")]
        public ActionResult<AuthLoginModel> AdminLogin(AuthModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Guid? userId = null;
            string? userRole = "";
            string? userName = "";
            var permissions = new List<string>();


            var systemUser = _systemUserRepository.GetByNic(model.UserName);
            if (systemUser != null)
            {
                if (systemUser.Password == model.Password)
                {
                    userId = systemUser.Id;
                    userRole = "SystemUser";
                    userName = model.UserName;
                    permissions.Add("systemAdmin");
                }
            }

            if (userId == null)
            {
                var hospitalUser = _hospitalUserRepository.GetByNic(model.UserName);
                if (hospitalUser != null)
                {
                    if (hospitalUser.Password == model.Password)
                    {
                        userId = hospitalUser.Id;
                        userRole = "HospitalUser";
                        userName = model.UserName;
                        permissions.Add("hospitalUser");
                    }
                }
            }

            if (userId != null)
            {
                var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()!),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("userRole", userRole),
                    new Claim("userName", userName),
                    new Claim("permissions", JsonSerializer.Serialize(permissions)),
                };

                var JWTKey = GenerateJWTKey(claims);
                if (JWTKey != null)
                {
                    return Ok(JWTKey);
                }

                return Problem();
            }

            return NotFound("User not found.");
        }

        // Route for user login
        [HttpPost("login/user")]
        public ActionResult<AuthLoginModel> UserLogin(AuthModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            bool isEmail = true;
            try
            {
                var emailAddress = new MailAddress(model.UserName);
            }
            catch
            {
                isEmail = false;
            }

            Guid? userId = null;
            string? userRole = "";
            string? userName = "";
            var permissions = new List<string>();


            if (isEmail == true)
            {
                var systemUser = _userRepository.GetByEmail(model.UserName);
                if (systemUser != null)
                {
                    if (systemUser.Password == model.Password)
                    {
                        userId = systemUser.Id;
                        userRole = "AppUser";
                        userName = model.UserName;
                        permissions.Add("appUser");
                    }
                }
            }

            if (userId == null && isEmail == false)
            {
                var ambulanceUser = _ambulanceCrewMemberRepository.GetByNic(model.UserName);
                if (ambulanceUser != null)
                {
                    if (ambulanceUser.Password == model.Password)
                    {
                        userId = ambulanceUser.Id;
                        userRole = "AmbulanceCrewMember";
                        userName = model.UserName;
                        permissions.Add("ambulanceCrewMember");
                    }
                }
            }

            if (userId != null)
            {
                var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()!),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("userRole", userRole),
                    new Claim("userName", userName),
                    new Claim("permissions", JsonSerializer.Serialize(permissions)),
                };

                var JWTKey = GenerateJWTKey(claims);
                if (JWTKey != null)
                {
                    return Ok(JWTKey);
                }

                return Problem();
            }

            return NotFound("User not found.");
        }

    }
}