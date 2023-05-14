using EpicAmbulance.Database;
using EpicAmbulance.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace EpicAmbulance.Controllers
{
    [ApiController]
    [Route("api/ambulanceCrewMembers")]
    public class AmbulanceCrewMemberController : ControllerBase
    {

        private readonly IAmbulanceCrewMemberRepository _repository;

        public AmbulanceCrewMemberController(IAmbulanceCrewMemberRepository ambulanceCrewMemberRepository)
        {
            _repository = ambulanceCrewMemberRepository;
        }

        [HttpGet]
        public IEnumerable<ViewEditAmbulanceCrewMemberModel> GetAll()
        {
            var result = new List<ViewEditAmbulanceCrewMemberModel>();
            var users = _repository.GetAll().AsEnumerable();

            foreach (var user in users)
            {
                result.Add(new ViewEditAmbulanceCrewMemberModel(user));
            }
            return result;
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<ViewEditAmbulanceCrewMemberModel> Get(Guid id)
        {
            var user = _repository.Get(id);

            if (user != null)
            {
                return new ViewEditAmbulanceCrewMemberModel(user);
            }

            return NotFound();
        }

        [HttpPost]
        public ActionResult<ViewEditAmbulanceCrewMemberModel> Create(AddAmbulanceCrewMemberModel model)
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

            var user = new AmbulanceCrewMember()
            {
                Name = model.Name!,
                Address = model.Address!,
                Nic = model.Nic!,
                TpNumber = model.TpNumber!,
                Password = model.Password!,
                HospitalId = model.HospitalId!,
                AmbulanceId = model.AmbulanceId!,
            };

            _repository.Create(user);
            return Ok(Get(user.Id));
        }

        [HttpPut]
        [Route("{id}")]
        public ActionResult<ViewEditAmbulanceCrewMemberModel> Put(Guid id, ViewEditAmbulanceCrewMemberModel model)
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
            user.HospitalId = model.HospitalId!;
            user.AmbulanceId = model.AmbulanceId!;

            _repository.Update(user);
            return Ok(Get(id));
        }

        [HttpPut]
        [Route("{id}/psw")]
        public ActionResult<ViewEditAmbulanceCrewMemberModel> PutPsw(Guid id, ChangePasswordAmbulanceCrewMemberModel model)
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