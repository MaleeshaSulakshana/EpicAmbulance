using System.ComponentModel.DataAnnotations;

namespace EpicAmbulance.Database;

public class User
{
    private List<Booking>? _bookings;

    public Guid Id { get; set; }

    [MaxLength(128)]
    public string Name { get; set; } = null!;

    public string Address { get; set; } = null!;

    [MaxLength(12)]
    public string Nic { get; set; } = null!;

    public int TpNumber { get; set; }

    [MaxLength(128)]
    public string Email { get; set; } = null!;

    [MaxLength(16)]
    public string Password { get; set; } = null!;

    public bool IsDeleted { get; set; }

    public List<Booking> Bookings
    {
        get => _bookings ?? (_bookings = new List<Booking>());
        set => _bookings = value;
    }
}