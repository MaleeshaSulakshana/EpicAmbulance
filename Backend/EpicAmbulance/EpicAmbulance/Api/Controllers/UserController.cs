using EpicAmbulance.Database;
using EpicAmbulance.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace EpicAmbulance.Controllers
{
    [ApiController]
    [Route("users")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repository;

        public UserController(IUserRepository userRepository)
        {
            _repository = userRepository;
        }

        [HttpGet]
        public IEnumerable<UserModel> GetAll()
        {
            var result = new List<UserModel>();
            var users = _repository.GetAll().AsEnumerable();

            foreach (var user in users)
            {
                result.Add(new UserModel(user));
            }
            return result;
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<UserModel> Get(Guid id)
        {
            var user = _repository.Get(id);

            if (user != null)
            {
                return new UserModel(user);
            }

            return NotFound();
        }

        [HttpPost]
        public ActionResult<UserModel> Create(UserModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var existUser = _repository.GetByTpNumber(model.TpNumber);
            if (existUser != null)
            {
                return Conflict("Email exists");
            }

            var user = new User()
            {
                Name = model.Name!,
                Address = model.Address!,
                Nic = model.Nic!,
                TpNumber = model.TpNumber!,
                Email = model.Email!,
                Password = model.Password!
            };

            _repository.Create(user);
            return Ok(Get(user.Id));
        }

        [HttpPut]
        [Route("{id}")]
        public ActionResult<UserModel> Put(Guid id, UserModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = _repository.Get(id);
            if (user == null)
            {
                return NotFound("User not found!");
            }

            user.Name = model.Name!;
            user.Address = model.Address!;
            user.Nic = model.Nic!;
            user.TpNumber = model.TpNumber!;

            _repository.Update(user);
            return Ok(Get(id));
        }

        [HttpPut]
        [Route("{id}/psw")]
        public ActionResult<UserModel> PutPsw(Guid id, UserModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = _repository.Get(id);
            if (user == null)
            {
                return NotFound("User not found!");
            }

            if (model.Password.Length < 8)
            {
                return BadRequest("Password must contains 8 charterers.");
            }

            user.Password = model.Password!;

            _repository.Update(user);
            return Ok("Password update successfull");
        }

        [HttpDelete]
        [Route("{id}")]
        public ActionResult Remove(Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = _repository.Get(id);
            if (user == null)
            {
                return NotFound("User not found!");
            }

            user.IsDeleted = true;

            _repository.Remove(user);
            return Ok("User removed");
        }

    }
}