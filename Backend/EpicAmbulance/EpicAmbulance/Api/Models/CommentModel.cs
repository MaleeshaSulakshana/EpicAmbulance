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
            User = comment.User != null ? new ViewEditUserModel(comment.User) : null;
            BookingId = comment.BookingId;
            Booking = comment.Booking != null ? new BookingModel(comment.Booking) : null;
        }

        public Guid Id { get; set; }

        [Required]
        public string CommentDetails { get; set; } = null!;

        [Required]
        public Guid UserId { get; set; }

        // Read only
        public ViewEditUserModel? User { get; set; }

        [Required]
        public Guid BookingId { get; set; }

        // Read only
        public BookingModel? Booking { get; set; }
    }
}