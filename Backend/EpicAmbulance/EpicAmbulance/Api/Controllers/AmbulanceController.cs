using EpicAmbulance.Database;
using EpicAmbulance.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace EpicAmbulance.Controllers
{
    [ApiController]
    [Route("api/ambulances")]
    public class AmbulanceController : ControllerBase
    {
        private readonly IAmbulanceRepository _repository;

        public AmbulanceController(IAmbulanceRepository ambulanceRepository)
        {
            _repository = ambulanceRepository;
        }

        [HttpGet]
        public IEnumerable<AmbulanceModel> GetAll([FromQuery(Name = "hospitalId")] Guid? hospitalId)
        {
            var result = new List<AmbulanceModel>();
            var ambulances = _repository.GetAll().AsEnumerable();

            foreach (var ambulance in ambulances)
            {
                if (hospitalId == null)
                {
                    result.Add(new AmbulanceModel(ambulance));
                }
                else if (hospitalId != null && ambulance.Hospital.Id == hospitalId)
                {
                    result.Add(new AmbulanceModel(ambulance));
                }
            }
            return result;
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<AmbulanceModel> Get(Guid id)
        {
            var ambulance = _repository.Get(id);

            if (ambulance != null)
            {
                return new AmbulanceModel(ambulance);
            }

            return NotFound();
        }

        [HttpPost]
        public ActionResult<AmbulanceModel> Create(AmbulanceModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var existAmbulance = _repository.GetByVehicleNumber(model.VehicleNo);
            if (existAmbulance != null)
            {
                return Conflict("Email exists");
            }

            int type = (int)AmbulanceType.Small;
            if (AmbulanceType.Small.ToString() == model.Type)
            {
                type = (int)AmbulanceType.Small;
            }
            else if (AmbulanceType.Normal.ToString() == model.Type)
            {
                type = (int)AmbulanceType.Normal;
            }
            else
            {
                type = (int)AmbulanceType.Large;
            }

            var ambulance = new Ambulance()
            {
                Id = model.Id!,
                VehicleNo = model.VehicleNo!,
                Type = (AmbulanceType)type,
                AvailableStatus = (bool)(model.AvailableStatus != null ? model.AvailableStatus : true),
                HospitalId = model.HospitalId!
            };

            _repository.Create(ambulance);
            return Ok(Get(ambulance.Id));
        }

        [HttpPut]
        [Route("{id}")]
        public ActionResult<AmbulanceModel> Put(Guid id, AmbulanceModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var ambulance = _repository.Get(id);
            if (ambulance == null)
            {
                return NotFound("Ambulance not found!");
            }

            int type = (int)AmbulanceType.Small;
            if (AmbulanceType.Small.ToString() == model.Type)
            {
                type = (int)AmbulanceType.Small;
            }
            else if (AmbulanceType.Normal.ToString() == model.Type)
            {
                type = (int)AmbulanceType.Normal;
            }
            else
            {
                type = (int)AmbulanceType.Large;
            }

            ambulance.VehicleNo = model.VehicleNo!;
            ambulance.Type = (AmbulanceType)type;

            _repository.Update(ambulance);
            return Ok(Get(id));
        }

        [HttpPut]
        [Route("status/{id}")]
        public ActionResult<AmbulanceModel> PutStatus(Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var ambulance = _repository.Get(id);
            if (ambulance == null)
            {
                return NotFound("Ambulance not found!");
            }

            ambulance.AvailableStatus = ambulance.AvailableStatus == true ? false : true;

            _repository.Update(ambulance);
            return Ok(Get(id));
        }

        [HttpDelete]
        [Route("{id}")]
        public ActionResult Remove(Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var ambulance = _repository.Get(id);
            if (ambulance == null)
            {
                return NotFound("Ambulance not found!");
            }

            ambulance.IsDeleted = true;

            _repository.Remove(ambulance);
            return Ok("Ambulance removed");
        }

    }
}