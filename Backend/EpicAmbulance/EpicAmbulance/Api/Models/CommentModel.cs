using System.ComponentModel.DataAnnotations;
using EpicAmbulance.Database;

namespace EpicAmbulance
{
    public class CommentModel
    {
        public CommentModel()
        {

        }

        public CommentModel(Comment comment)
        {
            Id = comment.Id;
            CommentDetails = comment.CommentDetails;
            UserId = comment.UserId;
            User = comment.User;
            BookingId = comment.BookingId;
            Booking = comment.Booking;
        }

        public Guid Id { get; set; }

        [Required]
        [MaxLength(128)]
        public string CommentDetails { get; set; } = null!;

        [Required]
        public Guid UserId { get; set; }

        // Read only
        public User? User { get; set; }

        [MaxLength(10)]
        [MinLength(10)]
        public Guid BookingId { get; set; }

        // Read only
        public Booking? Booking { get; set; }
    }
}