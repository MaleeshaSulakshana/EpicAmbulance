using EpicAmbulance.Database;

namespace EpicAmbulance.Repositories
{
    public interface IAmbulanceRepository
    {

        Ambulance? Get(Guid id);

        Ambulance? GetByVehicleNumber(string vehicleNumber);

        IEnumerable<Ambulance> GetAll();

        int GetAmbulanceCount();

        void Create(Ambulance ambulance);

        void Update(Ambulance ambulance);

        void Remove(Ambulance ambulance);
    }
}