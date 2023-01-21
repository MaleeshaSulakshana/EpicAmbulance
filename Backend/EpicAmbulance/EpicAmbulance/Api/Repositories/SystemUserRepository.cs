using EpicAmbulance.Database;
using Microsoft.EntityFrameworkCore;

namespace EpicAmbulance.Repositories
{
    public class SystemUserRepository : ISystemUserRepository
    {
        protected DataContext _context;

        public SystemUserRepository(DataContext context)
        {
            _context = context;
        }

        public SystemUser? Get(Guid id)
        {
            return _context.SystemUsers
                .AsNoTracking()
                .FirstOrDefault(u => u.Id == id && u.IsDeleted == false);
        }

        public SystemUser? GetByNic(string nic)
        {
            return _context.SystemUsers
                .AsNoTracking()
                .FirstOrDefault(u => u.Nic == nic && u.IsDeleted == false);
        }

        public IEnumerable<SystemUser> GetAll()
        {
            return _context.SystemUsers.AsNoTracking().Where(u => u.IsDeleted == false).ToList();
        }

        public void Create(SystemUser user)
        {
            _context.SystemUsers.Add(user);
            _context.SaveChanges();
        }

        public void Update(SystemUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void UpdatePsw(SystemUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Remove(SystemUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}