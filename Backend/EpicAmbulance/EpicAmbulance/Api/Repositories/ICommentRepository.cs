using EpicAmbulance.Database;

namespace EpicAmbulance.Repositories
{
    public interface ICommentRepository
    {
        IEnumerable<Comment> GetAllByBooking(Guid bookingId);

        void Create(Comment comment);
    }
}