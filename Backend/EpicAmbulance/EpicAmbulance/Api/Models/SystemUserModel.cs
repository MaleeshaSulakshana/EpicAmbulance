using System.ComponentModel.DataAnnotations;
using EpicAmbulance.Database;

namespace EpicAmbulance
{
    public class SystemUserModel
    {
        public SystemUserModel()
        {

        }

        public SystemUserModel(SystemUser systemUser)
        {
            Id = systemUser.Id;
            Name = systemUser.Name;
            Address = systemUser.Address;
            Nic = systemUser.Nic;
            TpNumber = systemUser.TpNumber;
            Password = systemUser.Password;
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
    }
}