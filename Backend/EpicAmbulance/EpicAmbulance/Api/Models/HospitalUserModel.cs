using System.ComponentModel.DataAnnotations;
using EpicAmbulance.Database;

namespace EpicAmbulance
{
    public class HospitalUserModel
    {
        public HospitalUserModel()
        {

        }

        public HospitalUserModel(HospitalUser hospitalUser)
        {
            Id = hospitalUser.Id;
            Name = hospitalUser.Name;
            Address = hospitalUser.Address;
            Nic = hospitalUser.Nic;
            TpNumber = hospitalUser.TpNumber;
            Password = hospitalUser.Password;
            HospitalId = hospitalUser.HospitalId;
            Hospital = hospitalUser.Hospital;
        }

        public Guid Id { get; set; }

        [Required]
        [MaxLength(128)]
        public string Name { get; set; } = null!;

        [Required]
        public string Address { get; set; } = null!;

        [Required]
        [MaxLength(12)]
        public string Nic { get; set; } = null!;

        [Required]
        [MaxLength(10)]
        [MinLength(10)]
        public string TpNumber { get; set; } = null!;

        [Required]
        [MaxLength(16)]
        public string Password { get; set; } = null!;

        [Required]
        public Guid HospitalId { get; set; }

        // Read only
        public Hospital? Hospital { get; set; }
    }
}