using System.ComponentModel.DataAnnotations;

namespace EpicAmbulance.Database;

public class Hospital
{
    private List<Ambulance>? _ambulances;

    private List<AmbulanceCrewMember>? _crewMembers;

    private List<HospitalUser>? _hospitalUser;

    public Guid Id { get; set; }

    [MaxLength(128)]
    public string Name { get; set; } = null!;

    public HospitalType Type { get; set; }

    public string Address { get; set; } = null!;

    [MaxLength(10)]
    public string TpNumber { get; set; } = null!;

    public bool IsDeleted { get; set; }

    public double? Latitude { get; set; }

    public double? Longitude { get; set; }

    public string? MapUrl { get; set; }

    public List<Ambulance> Ambulances
    {
        get => _ambulances ?? (_ambulances = new List<Ambulance>());
        set => _ambulances = value;
    }

    public List<AmbulanceCrewMember> CrewMembers
    {
        get => _crewMembers ?? (_crewMembers = new List<AmbulanceCrewMember>());
        set => _crewMembers = value;
    }

    public List<HospitalUser> HospitalUser
    {
        get => _hospitalUser ?? (_hospitalUser = new List<HospitalUser>());
        set => _hospitalUser = value;
    }
}

public enum HospitalType
{
    Government = 0,
    Private = 1
}