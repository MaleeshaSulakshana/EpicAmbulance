using EpicAmbulance.Database;
using EpicAmbulance.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace EpicAmbulance.Controllers
{
    [ApiController]
    [Route("api/systemUsers")]
    public class SystemUserController : ControllerBase
    {
        private readonly ISystemUserRepository _repository;

        public SystemUserController(ISystemUserRepository systemUserRepository)
        {
            _repository = systemUserRepository;
        }

        [HttpGet]
        public IEnumerable<ViewEditSystemUserModel> GetAll()
        {
            var result = new List<ViewEditSystemUserModel>();
            var users = _repository.GetAll().AsEnumerable();

            foreach (var user in users)
            {
                result.Add(new ViewEditSystemUserModel(user));
            }
            return result;
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<ViewEditSystemUserModel> Get(Guid id)
        {
            var user = _repository.Get(id);

            if (user != null)
            {
                return new ViewEditSystemUserModel(user);
            }

            return NotFound();
        }

        [HttpPost]
        public ActionResult<ViewEditSystemUserModel> Create(AddSystemUserModel model)
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
        public ActionResult<ViewEditSystemUserModel> Put(Guid id, ViewEditSystemUserModel model)
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
            user.TpNumber = model.TpNumber!;

            if (model.Nic != null)
            {
                user.Nic = model.Nic;
            }

            _repository.Update(user);
            return Ok(Get(id));
        }

        // [HttpPut]
        // [Route("{id}/psw")]
        // public ActionResult<ViewEditSystemUserModel> PutPsw(Guid id, ViewEditSystemUserModel model)
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