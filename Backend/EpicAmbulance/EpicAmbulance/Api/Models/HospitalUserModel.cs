using System.ComponentModel.DataAnnotations;
using EpicAmbulance.Database;

namespace EpicAmbulance
{
    public class AddHospitalUserModel
    {
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

    }

    public class ViewEditHospitalUserModel
    {
        public ViewEditHospitalUserModel()
        {

        }

        public ViewEditHospitalUserModel(HospitalUser hospitalUser)
        {
            Id = hospitalUser.Id;
            Name = hospitalUser.Name;
            Address = hospitalUser.Address;
            Nic = hospitalUser.Nic;
            TpNumber = hospitalUser.TpNumber;
            HospitalId = hospitalUser.HospitalId;
            Hospital = new HospitalModel(hospitalUser.Hospital);
        }

        public Guid Id { get; set; }

        [Required]
        [MaxLength(128)]
        public string Name { get; set; } = null!;

        [Required]
        public string Address { get; set; } = null!;

        [MaxLength(12)]
        public string? Nic { get; set; }

        [Required]
        [MaxLength(10)]
        [MinLength(10)]
        public string TpNumber { get; set; } = null!;

        public Guid? HospitalId { get; set; }

        // Read only
        public HospitalModel? Hospital { get; set; }
    }

    public class ChangePasswordHospitalUserModel
    {
        [Required]
        [MaxLength(16)]
        public string Password { get; set; } = null!;
    }
}