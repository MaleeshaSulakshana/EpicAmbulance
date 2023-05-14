using System.ComponentModel.DataAnnotations;
using EpicAmbulance.Database;

namespace EpicAmbulance
{
    public class DashboardSummaryModel
    {
        public DashboardSummaryModel()
        {

        }

        public DashboardSummaryModel(
            int userCount,
            int ambulanceCount,
            int crewMemberCount,
            int hospitalCount,
            int hospitalUserCount,
            int systemUserCount,
            int completedBookingCount,
            int pendingBookingCount
            )
        {
            UserCount = userCount;
            AmbulanceCount = ambulanceCount;
            CrewMemberCount = crewMemberCount;
            HospitalCount = hospitalCount;
            HospitalUserCount = hospitalUserCount;
            SystemUserCount = systemUserCount;
            CompletedBookingCount = completedBookingCount;
            PendingBookingCount = pendingBookingCount;
        }

        // Read only
        public int UserCount { get; set; }

        // Read only
        public int AmbulanceCount { get; set; }

        // Read only
        public int CrewMemberCount { get; set; }

        // Read only
        public int HospitalCount { get; set; }

        // Read only
        public int HospitalUserCount { get; set; }

        // Read only
        public int SystemUserCount { get; set; }

        // Read only
        public int CompletedBookingCount { get; set; }

        // Read only
        public int PendingBookingCount { get; set; }
    }

    public class DashboardBookingSummaryModel
    {
        public DashboardBookingSummaryModel()
        {

        }

        public DashboardBookingSummaryModel(string date, int count)
        {
            Date = date;
            Count = count;
        }

        // Read only
        public string? Date { get; set; }

        // Read only
        public int Count { get; set; }
    }
}