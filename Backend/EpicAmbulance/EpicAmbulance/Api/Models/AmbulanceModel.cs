using System.ComponentModel.DataAnnotations;
using EpicAmbulance.Database;

namespace EpicAmbulance
{
    public class AmbulanceModel
    {
        public AmbulanceModel()
        {

        }

        public AmbulanceModel(Ambulance ambulance)
        {
            Id = ambulance.Id;
            VehicleNo = ambulance.VehicleNo;
            Type = ambulance.Type.ToString();
            AvailableStatus = ambulance.AvailableStatus;
            HospitalId = ambulance.HospitalId;
            Hospital = ambulance.Hospital != null ? new HospitalModel(ambulance.Hospital) : null;
        }

        public Guid Id { get; set; }

        [Required]
        [MaxLength(8)]
        public string VehicleNo { get; set; } = null!;

        [Required]
        public string? Type { get; set; }

        public bool? AvailableStatus { get; set; }

        [Required]
        public Guid HospitalId { get; set; }

        // Read only
        public HospitalModel? Hospital { get; set; }
    }
}