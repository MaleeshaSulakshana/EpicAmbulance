using System.ComponentModel.DataAnnotations;
using EpicAmbulance.Database;

namespace EpicAmbulance
{
    public class AddUserModel
    {
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
        [EmailAddress]
        [MaxLength(128)]
        public string Email { get; set; } = null!;

        [Required]
        [MaxLength(16)]
        public string Password { get; set; } = null!;
    }

    public class ViewEditUserModel
    {
        public ViewEditUserModel()
        {

        }

        public ViewEditUserModel(User user)
        {
            Id = user.Id;
            Name = user.Name;
            Address = user.Address;
            Nic = user.Nic;
            TpNumber = user.TpNumber;
            Email = user.Email;
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
        [EmailAddress]
        [MaxLength(128)]
        public string Email { get; set; } = null!;
    }

    public class ChangePasswordUserModel
    {
        [Required]
        [MaxLength(16)]
        public string Password { get; set; } = null!;
    }
}