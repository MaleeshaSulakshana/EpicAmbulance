using System.ComponentModel.DataAnnotations;
using EpicAmbulance.Database;

namespace EpicAmbulance
{
    public class HospitalModel
    {
        public HospitalModel()
        {

        }

        public HospitalModel(Hospital hospital, double? distance = null)
        {
            Id = hospital.Id;
            Name = hospital.Name;
            Type = hospital.Type.ToString();
            Address = hospital.Address;
            TpNumber = hospital.TpNumber;
            DistanceInMeters = distance;
            Distance = (distance / 1000)?.ToString("#.##") + " Km";
            Latitude = hospital.Latitude;
            Longitude = hospital.Longitude;
            MapUrl = hospital.MapUrl;
        }

        public Guid Id { get; set; }

        [Required]
        [MaxLength(128)]
        public string Name { get; set; } = null!;

        [Required]
        public string? Type { get; set; }

        [Required]
        [MaxLength(128)]
        public string Address { get; set; } = null!;

        [Required]
        [MaxLength(10)]
        [MinLength(10)]
        public string TpNumber { get; set; } = null!;

        [Required]
        public double? Latitude { get; set; }

        [Required]
        public double? Longitude { get; set; }

        [Required]
        [Url]
        public string? MapUrl { get; set; }

        // Read only
        public double? DistanceInMeters { get; set; }

        // Read only
        public string? Distance { get; set; }
    }
}