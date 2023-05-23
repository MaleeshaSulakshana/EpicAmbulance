using EpicAmbulance.Database;
using EpicAmbulance.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Device.Location;

namespace EpicAmbulance.Controllers
{
    [ApiController]
    [Route("api/hospitals")]
    public class HospitalController : ControllerBase
    {
        private readonly IHospitalRepository _repository;

        public HospitalController(IHospitalRepository hospitalRepository)
        {
            _repository = hospitalRepository;
        }

        [HttpGet]
        public IEnumerable<HospitalModel> GetAll()
        {
            var result = new List<HospitalModel>();
            var hospitals = _repository.GetAll().AsEnumerable();

            foreach (var hospital in hospitals)
            {
                result.Add(new HospitalModel(hospital));
            }
            return result;
        }

        [HttpGet]
        [Route("search")]
        public IEnumerable<HospitalModel> GetAllBySearch([FromQuery] HospitalGeoFilterQuery filter)
        {
            var result = new List<HospitalModel>();
            var hospitals = _repository.GetAll().AsEnumerable();

            GeoCoordinate? sCoord = null;
            sCoord = new GeoCoordinate(filter.Latitude, filter.Longitude);

            foreach (var hospital in hospitals)
            {
                var availableAmbulanceCount = hospital.Ambulances.Where(a => a.AvailableStatus == true).Count();

                if (availableAmbulanceCount > 0)
                {
                    double? distance = 0.0;
                    GeoCoordinate? eCoord = null;
                    if (hospital.Latitude != null && hospital.Longitude != null)
                    {
                        eCoord = new GeoCoordinate((double)hospital.Latitude, (double)hospital.Longitude);
                    }

                    if (sCoord != null && eCoord != null)
                    {
                        distance = sCoord.GetDistanceTo(eCoord);
                    }
                    result.Add(new HospitalModel(hospital, distance));
                }
            }

            return result.OrderBy(h => h.DistanceInMeters);
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<HospitalModel> Get(Guid id)
        {
            var hospital = _repository.Get(id);

            if (hospital != null)
            {
                return new HospitalModel(hospital);
            }

            return NotFound();
        }

        [HttpPost]
        public ActionResult<HospitalModel> Create(HospitalModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            // var existAmbulance = _repository.GetByVehicleNumber(model.VehicleNo);
            // if (existAmbulance != null)
            // {
            //     return Conflict("Email exists");
            // }

            int type = (int)HospitalType.Government;
            if (HospitalType.Government.ToString() == model.Type)
            {
                type = (int)HospitalType.Government;
            }
            else
            {
                type = (int)HospitalType.Private;
            }

            var hospital = new Hospital()
            {
                Id = model.Id!,
                Name = model.Name!,
                Type = (HospitalType)type,
                Address = model.Address!,
                TpNumber = model.TpNumber!,
                Latitude = model.Latitude!,
                Longitude = model.Longitude!,
                MapUrl = model.MapUrl!
            };

            _repository.Create(hospital);
            return Ok(Get(hospital.Id));
        }

        [HttpPut]
        [Route("{id}")]
        public ActionResult<HospitalModel> Put(Guid id, HospitalModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var hospital = _repository.Get(id);
            if (hospital == null)
            {
                return NotFound("Ambulance not found!");
            }

            int type = (int)HospitalType.Government;
            if (HospitalType.Government.ToString() == model.Type)
            {
                type = (int)HospitalType.Government;
            }
            else
            {
                type = (int)HospitalType.Private;
            }

            hospital.Name = model.Name!;
            hospital.Type = (HospitalType)type;
            hospital.Address = model.Address!;
            hospital.TpNumber = model.TpNumber!;
            hospital.Latitude = model.Latitude!;
            hospital.Longitude = model.Longitude!;
            hospital.MapUrl = model.MapUrl!;

            _repository.Update(hospital);
            return Ok(Get(id));
        }

        // [HttpPut]
        // [Route("status/{id}")]
        // public ActionResult<AmbulanceModel> PutStatus(Guid id)
        // {
        //     if (!ModelState.IsValid)
        //     {
        //         return BadRequest();
        //     }

        //     var ambulance = _repository.Get(id);
        //     if (ambulance == null)
        //     {
        //         return NotFound("Ambulance not found!");
        //     }

        //     ambulance.AvailableStatus = ambulance.AvailableStatus == true ? false : true;

        //     _repository.Update(ambulance);
        //     return Ok(Get(id));
        // }

        [HttpDelete]
        [Route("{id}")]
        public ActionResult Remove(Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var hospital = _repository.Get(id);
            if (hospital == null)
            {
                return NotFound("Hospital not found!");
            }

            hospital.IsDeleted = true;

            _repository.Remove(hospital);
            return Ok("Ambulance removed");
        }

    }
}