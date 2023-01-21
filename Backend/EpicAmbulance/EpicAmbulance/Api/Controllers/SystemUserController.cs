using EpicAmbulance.Database;
using EpicAmbulance.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace EpicAmbulance.Controllers
{
    [ApiController]
    [Route("systemUsers")]
    public class SystemUserController : ControllerBase
    {
        private readonly ISystemUserRepository _repository;

        public SystemUserController(ISystemUserRepository systemUserRepository)
        {
            _repository = systemUserRepository;
        }

        [HttpGet]
        public IEnumerable<SystemUserModel> GetAll()
        {
            var result = new List<SystemUserModel>();
            var users = _repository.GetAll().AsEnumerable();

            foreach (var user in users)
            {
                result.Add(new SystemUserModel(user));
            }
            return result;
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<SystemUserModel> Get(Guid id)
        {
            var user = _repository.Get(id);

            if (user != null)
            {
                return new SystemUserModel(user);
            }

            return NotFound();
        }

        [HttpPost]
        public ActionResult<SystemUserModel> Create(SystemUserModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (model.TpNumber.Length != 10)
            {
                return BadRequest("Mobile number not valid");
            }

            if (model.Nic.Length != 10 || model.Nic.Length != 12)
            {
                return BadRequest("Invalid nic number");
            }

            var existUser = _repository.GetByNic(model.Nic);
            if (existUser != null)
            {
                return Conflict("Nic exists");
            }

            var user = new SystemUser()
            {
                Name = model.Name!,
                Address = model.Address!,
                Nic = model.Nic!,
                TpNumber = model.TpNumber!,
                Password = model.Password!
            };

            _repository.Create(user);
            return Ok(Get(user.Id));
        }

        [HttpPut]
        [Route("{id}")]
        public ActionResult<SystemUserModel> Put(Guid id, SystemUserModel model)
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
        public ActionResult<SystemUserModel> PutPsw(Guid id, SystemUserModel model)
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