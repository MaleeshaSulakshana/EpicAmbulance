using System.ComponentModel.DataAnnotations;
using EpicAmbulance.Database;

namespace EpicAmbulance
{
    public class BookingModel
    {
        public BookingModel()
        {

        }

        public BookingModel(Booking booking)
        {
            Id = booking.Id;
            Details = booking.Details;
            HospitalId = booking.HospitalId;
            Hospital = booking.Hospital != null ? new HospitalModel(booking.Hospital) : null;
            Address = booking.Address;
            TpNumber = booking.TpNumber;
            Latitude = booking.Latitude;
            Longitude = booking.Longitude;
            Status = booking.Status == true ? "Completed" : "Pending";
            AmbulanceId = booking.AmbulanceId;
            Ambulance = booking.Ambulance != null ? new AmbulanceModel(booking.Ambulance) : null; ;
            UserId = booking.UserId;
            User = booking.User != null ? new ViewEditUserModel(booking.User) : null;
            DateTime = booking.DateTime.ToLocalTime().ToString("yyyy-MM-dd hh:mm:ss");
        }

        // Read only
        public Guid Id { get; set; }

        [Required]
        public string Details { get; set; } = null!;

        [Required]
        public Guid HospitalId { get; set; }

        // Read only
        public HospitalModel? Hospital { get; set; }

        [Required]
        public string Address { get; set; } = null!;

        [Required]
        [MaxLength(10)]
        public string TpNumber { get; set; } = null!;

        [Required]
        public double Latitude { get; set; }

        [Required]
        public double Longitude { get; set; }

        // Read only
        public string? Status { get; set; }

        // Read only
        public Guid? AmbulanceId { get; set; }

        // Read only
        public AmbulanceModel? Ambulance { get; set; }

        [Required]
        public Guid UserId { get; set; }

        // Read only
        public ViewEditUserModel? User { get; set; }

        // Read only
        public string? DateTime { get; set; }
    }
}