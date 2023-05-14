using EpicAmbulance.Database;
using Microsoft.EntityFrameworkCore;

namespace EpicAmbulance.Repositories
{
    public class HospitalUserRepository : IHospitalUserRepository
    {
        protected DataContext _context;

        public HospitalUserRepository(DataContext context)
        {
            _context = context;
        }

        public HospitalUser? Get(Guid id)
        {
            return _context.HospitalUsers
                .Include(h => h.Hospital)
                .AsNoTracking()
                .FirstOrDefault(u => u.Id == id && u.IsDeleted == false);
        }

        public HospitalUser? GetByNic(string nic)
        {
            return _context.HospitalUsers
                .Include(h => h.Hospital)
                .AsNoTracking()
                .FirstOrDefault(u => u.Nic == nic && u.IsDeleted == false);
        }

        public IEnumerable<HospitalUser> GetAll()
        {
            return _context.HospitalUsers
                .Include(h => h.Hospital)
                .AsNoTracking()
                .Where(u => u.IsDeleted == false)
                .ToList();
        }

        public int GetHospitalUserCount()
        {
            return _context.HospitalUsers
                .Include(h => h.Hospital)
                .AsNoTracking()
                .Where(u => u.IsDeleted == false)
                .Count();
        }

        public void Create(HospitalUser user)
        {
            _context.HospitalUsers.Add(user);
            _context.SaveChanges();
        }

        public void Update(HospitalUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void UpdatePsw(HospitalUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Remove(HospitalUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}