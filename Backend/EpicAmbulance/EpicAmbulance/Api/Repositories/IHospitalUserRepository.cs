using EpicAmbulance.Database;

namespace EpicAmbulance.Repositories
{
    public interface IHospitalUserRepository
    {
        HospitalUser? Get(Guid id);

        HospitalUser? GetByNic(string nic);

        IEnumerable<HospitalUser> GetAll();

        void Create(HospitalUser user);

        void Update(HospitalUser user);

        void UpdatePsw(HospitalUser user);

        void Remove(HospitalUser user);
    }
}