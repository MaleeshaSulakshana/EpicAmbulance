using System.ComponentModel.DataAnnotations;

namespace EpicAmbulance.Database;

public class AmbulanceCrewMember
{
    public Guid Id { get; set; }

    [MaxLength(128)]
    public string Name { get; set; } = null!;

    public string Address { get; set; } = null!;

    [MaxLength(12)]
    public string Nic { get; set; } = null!;

    [MaxLength(10)]
    public string TpNumber { get; set; } = null!;

    [MaxLength(16)]
    public string Password { get; set; } = null!;

    public bool IsDeleted { get; set; }

    public Guid HospitalId { get; set; }

    public Hospital Hospital { get; set; } = null!;

    public Guid AmbulanceId { get; set; }

    public Ambulance Ambulance { get; set; } = null!;
}