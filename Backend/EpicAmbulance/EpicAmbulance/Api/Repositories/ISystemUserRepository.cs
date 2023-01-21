using EpicAmbulance.Database;

namespace EpicAmbulance.Repositories
{
    public interface ISystemUserRepository
    {
        SystemUser? Get(Guid id);

        SystemUser? GetByNic(string nic);

        IEnumerable<SystemUser> GetAll();

        void Create(SystemUser user);

        void Update(SystemUser user);

        void UpdatePsw(SystemUser user);

        void Remove(SystemUser user);
    }
}