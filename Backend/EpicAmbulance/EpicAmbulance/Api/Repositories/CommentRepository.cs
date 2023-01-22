using EpicAmbulance.Database;
using Microsoft.EntityFrameworkCore;

namespace EpicAmbulance.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        protected DataContext _context;

        public CommentRepository(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<Comment> GetAllByBooking(Guid bookingId)
        {
            return _context.Comments
                .Include(c => c.Booking)
                .AsNoTracking()
                .Where(c => c.Booking.Id == bookingId).ToList();
        }

        public void Create(Comment comment)
        {
            _context.Comments.Add(comment);
            _context.SaveChanges();
        }
    }
}