using EpicAmbulance.Database;
using EpicAmbulance.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace EpicAmbulance.Controllers
{
    [ApiController]
    [Route("api/bookings")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IHospitalRepository _hospitalRepository;
        private readonly IUserRepository _userRepository;
        private readonly IAmbulanceCrewMemberRepository _ambulanceCrewMemberRepository;
        private readonly IAmbulanceRepository _ambulanceRepository;


        public BookingController(
            IBookingRepository bookingRepository,
            IHospitalRepository hospitalRepository,
            IUserRepository userRepository,
            IAmbulanceCrewMemberRepository ambulanceCrewMemberRepository,
            IAmbulanceRepository ambulanceRepository
            )
        {
            _bookingRepository = bookingRepository;
            _hospitalRepository = hospitalRepository;
            _userRepository = userRepository;
            _ambulanceCrewMemberRepository = ambulanceCrewMemberRepository;
            _ambulanceRepository = ambulanceRepository;
        }

        [HttpGet]
        public IEnumerable<BookingModel> GetAll()
        {
            var result = new List<BookingModel>();
            var bookings = _bookingRepository.GetAll().AsEnumerable();

            foreach (var booking in bookings)
            {
                result.Add(new BookingModel(booking));
            }
            return result;
        }

        [HttpGet]
        [Route("user/{userId}")]
        public IEnumerable<BookingModel> GetAllByUserId(Guid userId)
        {
            var result = new List<BookingModel>();
            var bookings = _bookingRepository.GetAllByUserId(userId).AsEnumerable();

            foreach (var booking in bookings)
            {
                result.Add(new BookingModel(booking));
            }
            return result;
        }

        [HttpGet]
        [Route("hospital/{hospitalId}")]
        public IEnumerable<BookingModel> GetAllByHospitalId(Guid hospitalId)
        {
            var result = new List<BookingModel>();
            var bookings = _bookingRepository.GetAllByHospitalId(hospitalId).AsEnumerable();

            foreach (var booking in bookings)
            {
                result.Add(new BookingModel(booking));
            }
            return result;
        }

        [HttpGet]
        [Route("ambulanceUser/{ambulanceUserId}")]
        public IEnumerable<BookingModel> GetAllByAmbulanceId(Guid ambulanceUserId)
        {
            var result = new List<BookingModel>();

            var ambulanceCrewMember = _ambulanceCrewMemberRepository.Get(ambulanceUserId);

            if (ambulanceCrewMember == null)
            {
                return result;
            }

            var bookings = _bookingRepository.GetAllByAmbulanceId(ambulanceCrewMember.AmbulanceId).AsEnumerable();

            foreach (var booking in bookings)
            {
                result.Add(new BookingModel(booking));
            }
            return result;
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<BookingModel> Get(Guid id)
        {
            var booking = _bookingRepository.Get(id);

            if (booking != null)
            {
                return new BookingModel(booking);
            }

            return NotFound();
        }

        [HttpPost]
        public ActionResult<BookingModel> Create(BookingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (model.TpNumber.Length != 10)
            {
                return BadRequest("Mobile number not valid");
            }

            var hospital = _hospitalRepository.Get(model.HospitalId);
            if (hospital == null)
            {
                return BadRequest("Hospital Not found.");
            }

            var ambulances = hospital.Ambulances.Where(a => a.AvailableStatus == true);
            if (ambulances.Count() == 0)
            {
                return BadRequest("No available ambulances on " + hospital.Name + ".");
            }

            var ambulanceId = ambulances.ElementAt(0).Id;

            var user = _userRepository.Get(model.UserId);
            if (user == null)
            {
                return BadRequest("Invalid user.");
            }

            var ambulance = _ambulanceRepository.Get(ambulanceId);
            ambulance!.AvailableStatus = false;

            var booking = new Booking()
            {
                Details = model.Details!,
                HospitalId = model.HospitalId!,
                Address = model.Address!,
                TpNumber = model.TpNumber!,
                Latitude = model.Latitude!,
                Longitude = model.Longitude!,
                StatusType = StatusType.Pending,
                AmbulanceId = ambulanceId!,
                UserId = model.UserId!,
                DateTime = DateTimeOffset.UtcNow,
            };

            _bookingRepository.Create(booking);
            _ambulanceRepository.Update(ambulance);

            return Ok(Get(booking.Id));
        }

        [HttpPut]
        [Route("{id}/status/ongoing")]
        public ActionResult PutStatusChangeOngoing(Guid id)
        {
            var booking = _bookingRepository.Get(id);
            if (booking == null)
            {
                return NotFound("Booking not found!");
            }

            booking.StatusType = StatusType.Ongoing;

            _bookingRepository.Update(booking);
            return Ok(Get(id));
        }

        [HttpPut]
        [Route("{id}/status/completed")]
        public ActionResult PutStatusChangeCompleted(Guid id)
        {
            var booking = _bookingRepository.Get(id);
            if (booking == null)
            {
                return NotFound("Booking not found!");
            }

            booking.StatusType = StatusType.Completed;

            var ambulance = _ambulanceRepository.Get(booking.AmbulanceId);
            ambulance!.AvailableStatus = true;

            _bookingRepository.Update(booking);
            _ambulanceRepository.Update(ambulance);

            return Ok(Get(id));
        }

    }
}