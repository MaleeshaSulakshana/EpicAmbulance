using EpicAmbulance.Database;
using Microsoft.EntityFrameworkCore;

namespace EpicAmbulance.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        protected DataContext _context;

        public BookingRepository(DataContext context)
        {
            _context = context;
        }

        public Booking? Get(Guid id)
        {
            return _context.Bookings
                .Include(a => a.Hospital)
                .Include(a => a.Ambulance)
                .Include(a => a.User)
                .Include(a => a.Comments)
                .AsNoTracking()
                .FirstOrDefault(a => a.Id == id);
        }

        public IEnumerable<Booking> GetAll()
        {
            return _context.Bookings
                .Include(a => a.Hospital)
                .Include(a => a.Ambulance)
                .Include(a => a.User)
                .Include(a => a.Comments)
                .AsNoTracking().ToList();
        }

        public IEnumerable<Booking> GetAllByUserId(Guid userId)
        {
            return _context.Bookings
                .Include(a => a.Hospital)
                .Include(a => a.Ambulance)
                .Include(a => a.User)
                .Include(a => a.Comments)
                .Where(a => a.User.Id == userId)
                .AsNoTracking().ToList();
        }

        public IEnumerable<Booking> GetAllByHospitalId(Guid hospitalId)
        {
            return _context.Bookings
                .Include(a => a.Hospital)
                .Include(a => a.Ambulance)
                .Include(a => a.User)
                .Include(a => a.Comments)
                .Where(a => a.Hospital.Id == hospitalId)
                .AsNoTracking().ToList();
        }

        public IEnumerable<Booking> GetAllByAmbulanceId(Guid ambulanceId)
        {
            return _context.Bookings
                .Include(a => a.Hospital)
                .Include(a => a.Ambulance)
                .Include(a => a.User)
                .Include(a => a.Comments)
                .Where(a => a.Ambulance.Id == ambulanceId)
                .AsNoTracking().ToList();
        }

        public void Create(Booking booking)
        {
            _context.Bookings.Add(booking);
            _context.SaveChanges();
        }

        public void Update(Booking booking)
        {
            _context.Entry(booking).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}