using System.ComponentModel.DataAnnotations;

namespace EpicAmbulance.Database;

public class Booking
{
    private List<Comment>? _comments;

    public Guid Id { get; set; }

    public string Details { get; set; } = null!;

    public Guid HospitalId { get; set; }

    public Hospital Hospital { get; set; } = null!;

    public string Address { get; set; } = null!;

    [MaxLength(10)]
    public string TpNumber { get; set; } = null!;

    public double Latitude { get; set; }

    public double Longitude { get; set; }

    public bool Status { get; set; }

    public Guid AmbulanceId { get; set; }

    public Ambulance Ambulance { get; set; } = null!;

    public List<Comment> Comments
    {
        get => _comments ?? (_comments = new List<Comment>());
        set => _comments = value;
    }
}