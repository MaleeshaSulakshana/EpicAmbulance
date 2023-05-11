using System.IdentityModel.Tokens.Jwt;
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
        private readonly IConfiguration _configuration;

        public AuthController(
            IUserRepository userRepository,
            ISystemUserRepository systemUserRepository,
            IHospitalUserRepository hospitalUserRepository,
            IConfiguration configuration
            )
        {
            _userRepository = userRepository;
            _systemUserRepository = systemUserRepository;
            _hospitalUserRepository = hospitalUserRepository;
            _configuration = configuration;
        }

        // Route for admin login
        [HttpPost("login/admin")]
        // public ActionResult<Object> UserLogin(LoginModel loginModel)
        public ActionResult<AuthLoginModel> UserLogin(AuthModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            // var userDetails = _context.UserDetails.SingleOrDefault(user => user.Email == loginModel.email);

            // Check email is exist
            // if (userDetails == null)
            // {
            //     return BadRequest("Please check your email");
            // }

            // // Match password
            // if (!BCrypt.Net.BCrypt.Verify(loginModel.password, userDetails.Password))
            // {
            //     return BadRequest("Check your password");
            // }

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


            // var v = new JwtSecurityTokenHandler().WriteToken(token);

            // var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            // var token = new JwtSecurityToken(
            //     issuer: _configuration["JWT:ValidIssuer"],
            //     audience: _configuration["JWT:ValidAudience"],
            //     expires: null,
            //     signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            // );

            // return Ok(new
            // {
            //     token = new JwtSecurityTokenHandler().WriteToken(token),
            //     expiration = token.ValidTo
            // });

            return NotFound("User not found.");
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

        // [HttpGet]
        // public IEnumerable<UserModel> GetAll()
        // {
        //     var result = new List<UserModel>();
        //     var users = _repository.GetAll().AsEnumerable();

        //     foreach (var user in users)
        //     {
        //         result.Add(new UserModel(user));
        //     }
        //     return result;
        // }

        // [HttpGet]
        // [Route("{id}")]
        // public ActionResult<UserModel> Get(Guid id)
        // {
        //     var user = _repository.Get(id);

        //     if (user != null)
        //     {
        //         return new UserModel(user);
        //     }

        //     return NotFound();
        // }

        // [HttpPost]
        // public ActionResult<UserModel> Create(UserModel model)
        // {
        //     if (!ModelState.IsValid)
        //     {
        //         return BadRequest();
        //     }

        //     if (model.TpNumber.Length != 10)
        //     {
        //         return BadRequest("Mobile number not valid");
        //     }

        //     if (model.Nic.Length != 10 || model.Nic.Length != 12)
        //     {
        //         return BadRequest("Invalid nic number");
        //     }

        //     var existUser = _repository.GetByEmail(model.Email);
        //     if (existUser != null)
        //     {
        //         return Conflict("Email exists");
        //     }

        //     var user = new User()
        //     {
        //         Name = model.Name!,
        //         Address = model.Address!,
        //         Nic = model.Nic!,
        //         TpNumber = model.TpNumber!,
        //         Email = model.Email!,
        //         Password = model.Password!
        //     };

        //     _repository.Create(user);
        //     return Ok(Get(user.Id));
        // }

        // [HttpPut]
        // [Route("{id}")]
        // public ActionResult<UserModel> Put(Guid id, UserModel model)
        // {
        //     if (!ModelState.IsValid)
        //     {
        //         return BadRequest();
        //     }

        //     var user = _repository.Get(id);
        //     if (user == null)
        //     {
        //         return NotFound("User not found!");
        //     }

        //     user.Name = model.Name!;
        //     user.Address = model.Address!;
        //     user.Nic = model.Nic!;
        //     user.TpNumber = model.TpNumber!;

        //     _repository.Update(user);
        //     return Ok(Get(id));
        // }

        // [HttpPut]
        // [Route("{id}/psw")]
        // public ActionResult<UserModel> PutPsw(Guid id, UserModel model)
        // {
        //     if (!ModelState.IsValid)
        //     {
        //         return BadRequest();
        //     }

        //     var user = _repository.Get(id);
        //     if (user == null)
        //     {
        //         return NotFound("User not found!");
        //     }

        //     if (model.Password.Length < 8)
        //     {
        //         return BadRequest("Password must contains 8 charterers.");
        //     }

        //     user.Password = model.Password!;

        //     _repository.Update(user);
        //     return Ok("Password update successfull");
        // }

        // [HttpDelete]
        // [Route("{id}")]
        // public ActionResult Remove(Guid id)
        // {
        //     if (!ModelState.IsValid)
        //     {
        //         return BadRequest();
        //     }

        //     var user = _repository.Get(id);
        //     if (user == null)
        //     {
        //         return NotFound("User not found!");
        //     }

        //     user.IsDeleted = true;

        //     _repository.Remove(user);
        //     return Ok("User removed");
        // }

    }
}