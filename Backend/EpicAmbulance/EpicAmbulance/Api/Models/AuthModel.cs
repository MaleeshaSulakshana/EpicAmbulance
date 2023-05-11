using System.ComponentModel.DataAnnotations;

namespace EpicAmbulance
{
    public class AuthModel
    {
        [Required]
        [MaxLength(12)]
        public string UserName { get; set; } = null!;

        [Required]
        [MaxLength(16)]
        public string Password { get; set; } = null!;
    }

    public class AuthLoginModel
    {
        public AuthLoginModel()
        {

        }

        public AuthLoginModel(string key)
        {
            Key = key;
        }

        // Read only
        public string? Key { get; set; }
    }
}