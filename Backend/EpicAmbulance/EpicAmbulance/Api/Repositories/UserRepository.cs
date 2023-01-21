using EpicAmbulance.Database;
using Microsoft.EntityFrameworkCore;

namespace EpicAmbulance.Repositories
{
    public class UserRepository : IUserRepository
    {
        protected DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public User? Get(Guid id)
        {
            return _context.Users
                .Include(c => c.Bookings)
                .AsNoTracking()
                .FirstOrDefault(u => u.Id == id && u.IsDeleted == false);
        }

        public User? GetByEmail(string email)
        {
            return _context.Users
                .Include(c => c.Bookings)
                .AsNoTracking()
                .FirstOrDefault(u => u.Email == email && u.IsDeleted == false);
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users.AsNoTracking().Where(u => u.IsDeleted == false).ToList();
        }

        public void Create(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        // public void Delete(User user)
        // {
        //     _context.Remove(user);
        //     _context.SaveChanges();
        // }

        public void Update(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void UpdatePsw(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Remove(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}