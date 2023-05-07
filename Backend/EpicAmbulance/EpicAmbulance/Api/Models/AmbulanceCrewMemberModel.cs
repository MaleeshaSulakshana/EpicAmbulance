using System.ComponentModel.DataAnnotations;
using EpicAmbulance.Database;

namespace EpicAmbulance
{
    public class AddAmbulanceCrewMemberModel
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

        [Required]
        public Guid AmbulanceId { get; set; }

    }

    public class ViewEditAmbulanceCrewMemberModel
    {
        public ViewEditAmbulanceCrewMemberModel()
        {

        }

        public ViewEditAmbulanceCrewMemberModel(AmbulanceCrewMember ambulanceCrewMember)
        {
            Id = ambulanceCrewMember.Id;
            Name = ambulanceCrewMember.Name;
            Address = ambulanceCrewMember.Address;
            Nic = ambulanceCrewMember.Nic;
            TpNumber = ambulanceCrewMember.TpNumber;

            HospitalId = ambulanceCrewMember.HospitalId;
            Hospital = ambulanceCrewMember.Hospital != null ? new HospitalModel(ambulanceCrewMember.Hospital) : null;

            AmbulanceId = ambulanceCrewMember.AmbulanceId;
            Ambulance = ambulanceCrewMember.Ambulance != null ? new AmbulanceModel(ambulanceCrewMember.Ambulance) : null;
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
        public Guid HospitalId { get; set; }

        // Read only
        public HospitalModel? Hospital { get; set; }

        [Required]
        public Guid AmbulanceId { get; set; }

        // Read only
        public AmbulanceModel? Ambulance { get; set; }
    }
}