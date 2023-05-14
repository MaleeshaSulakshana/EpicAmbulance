using EpicAmbulance.Database;
using Microsoft.EntityFrameworkCore;

namespace EpicAmbulance.Repositories
{
    public class AmbulanceRepository : IAmbulanceRepository
    {
        protected DataContext _context;

        public AmbulanceRepository(DataContext context)
        {
            _context = context;
        }

        public Ambulance? Get(Guid id)
        {
            return _context.Ambulances
                .Include(a => a.CrewMembers)
                .Include(a => a.Hospital)
                .AsNoTracking()
                .FirstOrDefault(a => a.Id == id && a.IsDeleted == false);
        }

        public Ambulance? GetByVehicleNumber(string vehicleNumber)
        {
            return _context.Ambulances
                .Include(a => a.CrewMembers)
                .Include(a => a.Hospital)
                .AsNoTracking()
                .FirstOrDefault(a => a.VehicleNo == vehicleNumber && a.IsDeleted == false);
        }

        public IEnumerable<Ambulance> GetAll()
        {
            return _context.Ambulances
                .Include(a => a.CrewMembers)
                .Include(a => a.Hospital)
                .Where(a => a.IsDeleted == false)
                .AsNoTracking().ToList();
        }

        public int GetAmbulanceCount()
        {
            return _context.Ambulances
                .Include(a => a.CrewMembers)
                .Include(a => a.Hospital)
                .AsNoTracking()
                .Where(a => a.IsDeleted == false)
                .Count();
        }

        public void Create(Ambulance ambulance)
        {
            _context.Ambulances.Add(ambulance);
            _context.SaveChanges();
        }

        public void Update(Ambulance ambulance)
        {
            _context.Entry(ambulance).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Remove(Ambulance ambulance)
        {
            _context.Entry(ambulance).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}