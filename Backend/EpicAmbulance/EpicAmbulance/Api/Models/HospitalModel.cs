using System.ComponentModel.DataAnnotations;
using EpicAmbulance.Database;

namespace EpicAmbulance
{
    public class HospitalModel
    {
        public HospitalModel()
        {

        }

        public HospitalModel(Hospital hospital)
        {
            Id = hospital.Id;
            Name = hospital.Name;
            Type = hospital.Type.ToString();
            Address = hospital.Address;
            TpNumber = hospital.TpNumber;
        }

        public Guid Id { get; set; }

        [Required]
        [MaxLength(128)]
        public string Name { get; set; } = null!;

        [Required]
        public string Type { get; set; }

        [Required]
        [MaxLength(128)]
        public string Address { get; set; } = null!;

        [Required]
        [MaxLength(10)]
        [MinLength(10)]
        public string TpNumber { get; set; } = null!;
    }
}