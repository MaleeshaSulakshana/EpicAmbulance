using EpicAmbulance.Database;

namespace EpicAmbulance.Repositories
{
    public interface IHospitalRepository
    {

        Hospital? Get(Guid id);

        IEnumerable<Hospital> GetAll();

        int GetHospitalCount();

        void Create(Hospital hospital);

        void Update(Hospital hospital);

        void Remove(Hospital hospital);
    }
}