using EpicAmbulance.Database;
using EpicAmbulance.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace EpicAmbulance.Controllers
{
    [ApiController]
    [Route("api/dashboard")]
    public class DashboardController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IAmbulanceRepository _ambulanceRepository;
        private readonly IAmbulanceCrewMemberRepository _ambulanceCrewMemberRepository;
        private readonly IHospitalRepository _hospitalRepository;
        private readonly IHospitalUserRepository _hospitalUserRepository;
        private readonly ISystemUserRepository _systemUserRepository;
        private readonly IBookingRepository _bookingRepository;

        public DashboardController(
            IUserRepository userRepository,
            IAmbulanceRepository ambulanceRepository,
            IAmbulanceCrewMemberRepository ambulanceCrewMemberRepository,
            IHospitalRepository hospitalRepository,
            IHospitalUserRepository hospitalUserRepository,
            ISystemUserRepository systemUserRepository,
            IBookingRepository bookingRepository
            )
        {
            _userRepository = userRepository;
            _ambulanceRepository = ambulanceRepository;
            _ambulanceCrewMemberRepository = ambulanceCrewMemberRepository;
            _hospitalRepository = hospitalRepository;
            _hospitalUserRepository = hospitalUserRepository;
            _systemUserRepository = systemUserRepository;
            _bookingRepository = bookingRepository;
        }

        [HttpGet]
        [Route("summary")]
        public ActionResult<DashboardSummaryModel> GetSummary()
        {
            var userCount = _userRepository.GetUserCount();
            var ambulanceCount = _ambulanceRepository.GetAmbulanceCount();
            var crewMemberCount = _ambulanceCrewMemberRepository.GetAmbulanceCrewMemberCount();
            var hospitalCount = _hospitalRepository.GetHospitalCount();
            var hospitalUserCount = _hospitalUserRepository.GetHospitalUserCount();
            var systemUserCount = _systemUserRepository.GetSystemUserCount();
            var completedBookingCount = _bookingRepository.GetCompletedBookingCount();
            var pendingBookingCount = _bookingRepository.GetPendingBookingCount();

            return new DashboardSummaryModel(
                userCount, ambulanceCount, crewMemberCount, hospitalCount,
                hospitalUserCount, systemUserCount, completedBookingCount, pendingBookingCount);
        }

        [HttpGet]
        [Route("summary/pastMonthBookings")]
        public IEnumerable<DashboardBookingSummaryModel> GetBookingSummaryForPastMonth()
        {
            var result = new List<DashboardBookingSummaryModel>();
            var bookings = _bookingRepository.GetAll();

            for (int i = 0; i < 30; i++)
            {
                var dateTime = new DateTimeOffset(DateTime.Today.AddDays((i / -1))).Date.ToShortDateString();
                var bookingCount = bookings.Where(b => b.DateTime.Date.ToShortDateString() == dateTime).Count();

                result.Add(new DashboardBookingSummaryModel(dateTime, bookingCount));
            }

            return result;
        }

    }
}