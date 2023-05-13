using System.ComponentModel.DataAnnotations;

namespace EpicAmbulance
{
    public class AuthModel
    {
        [Required]
        public string UserName { get; set; } = null!;

        [Required]
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