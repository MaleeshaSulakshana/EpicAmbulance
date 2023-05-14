using EpicAmbulance.Database;
using Microsoft.EntityFrameworkCore;

namespace EpicAmbulance.Repositories
{
    public class HospitalRepository : IHospitalRepository
    {
        protected DataContext _context;

        public HospitalRepository(DataContext context)
        {
            _context = context;
        }

        public Hospital? Get(Guid id)
        {
            return _context.Hospitals
                .Include(a => a.Ambulances)
                .Include(a => a.CrewMembers)
                .Include(a => a.HospitalUser)
                .AsNoTracking()
                .FirstOrDefault(a => a.Id == id && a.IsDeleted == false);
        }

        public IEnumerable<Hospital> GetAll()
        {
            return _context.Hospitals
                .Include(a => a.Ambulances)
                .Include(a => a.CrewMembers)
                .Include(a => a.HospitalUser)
                .Where(a => a.IsDeleted == false)
                .AsNoTracking().ToList();
        }

        public int GetHospitalCount()
        {
            return _context.Hospitals
                .Include(a => a.Ambulances)
                .Include(a => a.CrewMembers)
                .Include(a => a.HospitalUser)
                .AsNoTracking()
                .Where(a => a.IsDeleted == false)
                .Count();
        }

        public void Create(Hospital hospital)
        {
            _context.Hospitals.Add(hospital);
            _context.SaveChanges();
        }

        public void Update(Hospital hospital)
        {
            _context.Entry(hospital).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Remove(Hospital hospital)
        {
            _context.Entry(hospital).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}