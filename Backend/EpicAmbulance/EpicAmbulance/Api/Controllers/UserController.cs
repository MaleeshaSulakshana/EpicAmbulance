using EpicAmbulance.Database;
using EpicAmbulance.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace EpicAmbulance.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repository;

        public UserController(IUserRepository userRepository)
        {
            _repository = userRepository;
        }

        [HttpGet]
        public IEnumerable<ViewEditUserModel> GetAll()
        {
            var result = new List<ViewEditUserModel>();
            var users = _repository.GetAll().AsEnumerable();

            foreach (var user in users)
            {
                result.Add(new ViewEditUserModel(user));
            }
            return result;
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<ViewEditUserModel> Get(Guid id)
        {
            var user = _repository.Get(id);

            if (user != null)
            {
                return new ViewEditUserModel(user);
            }

            return NotFound();
        }

        [HttpPost]
        public ActionResult<ViewEditUserModel> Create(AddUserModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (model.TpNumber.Length != 10)
            {
                return BadRequest("Mobile number not valid");
            }

            var nicLengths = new List<int> { 10, 12 };
            if (!nicLengths.Contains(model.Nic.Length))
            {
                return BadRequest("Invalid nic number");
            }

            var existUser = _repository.GetByEmail(model.Email);
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
        public ActionResult<ViewEditUserModel> Put(Guid id, ViewEditUserModel model)
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
        public ActionResult<ViewEditUserModel> PutPsw(Guid id, ChangePasswordUserModel model)
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
            return Ok("Password update successful");
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