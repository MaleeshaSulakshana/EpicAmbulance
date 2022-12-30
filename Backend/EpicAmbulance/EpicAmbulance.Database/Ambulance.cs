using System.ComponentModel.DataAnnotations;

namespace EpicAmbulance.Database;

public class Ambulance
{
    private List<AmbulanceCrewMember>? _crewMembers;

    public Guid Id { get; set; }

    [MaxLength(8)]
    public string VehicleNo { get; set; } = null!;

    public AmbulanceType Type { get; set; }

    public bool AvailableStatus { get; set; }

    public Guid HospitalId { get; set; }

    public Hospital Hospital { get; set; } = null!;

    public bool IsDeleted { get; set; }

    public List<AmbulanceCrewMember> CrewMembers
    {
        get => _crewMembers ?? (_crewMembers = new List<AmbulanceCrewMember>());
        set => _crewMembers = value;
    }
}

public enum AmbulanceType
{
    Small = 0,
    Normal = 1,
    Large = 2
}