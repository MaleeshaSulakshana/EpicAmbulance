using EpicAmbulance.Database;
using Microsoft.EntityFrameworkCore;

namespace EpicAmbulance.Repositories
{
    public class AmbulanceCrewMemberRepository : IAmbulanceCrewMemberRepository
    {
        protected DataContext _context;

        public AmbulanceCrewMemberRepository(DataContext context)
        {
            _context = context;
        }

        public AmbulanceCrewMember? Get(Guid id)
        {
            return _context.AmbulanceCrewMembers
                .Include(h => h.Hospital)
                .Include(h => h.Ambulance)
                .AsNoTracking()
                .FirstOrDefault(u => u.Id == id && u.IsDeleted == false);
        }

        public AmbulanceCrewMember? GetByNic(string nic)
        {
            return _context.AmbulanceCrewMembers
                .Include(h => h.Hospital)
                .Include(h => h.Ambulance)
                .AsNoTracking()
                .FirstOrDefault(u => u.Nic == nic && u.IsDeleted == false);
        }

        public IEnumerable<AmbulanceCrewMember> GetAll()
        {
            return _context.AmbulanceCrewMembers
                .Include(h => h.Hospital)
                .Include(h => h.Ambulance)
                .AsNoTracking()
                .Where(u => u.IsDeleted == false)
                .ToList();
        }

        public int GetAmbulanceCrewMemberCount()
        {
            return _context.AmbulanceCrewMembers
                .Include(h => h.Hospital)
                .Include(h => h.Ambulance)
                .AsNoTracking()
                .Where(u => u.IsDeleted == false)
                .Count();
        }

        public void Create(AmbulanceCrewMember user)
        {
            _context.AmbulanceCrewMembers.Add(user);
            _context.SaveChanges();
        }

        public void Update(AmbulanceCrewMember user)
        {
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void UpdatePsw(AmbulanceCrewMember user)
        {
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Remove(AmbulanceCrewMember user)
        {
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}