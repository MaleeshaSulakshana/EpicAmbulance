using System.ComponentModel.DataAnnotations;

namespace EpicAmbulance.Database;

public class Comment
{
    public Guid Id { get; set; }

    public string CommentDetails { get; set; } = null!;

    public Guid UserId { get; set; }

    public User User { get; set; } = null!;

    public Guid BookingId { get; set; }

    public Booking Booking { get; set; } = null!;
}