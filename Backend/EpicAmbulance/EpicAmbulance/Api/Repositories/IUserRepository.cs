using EpicAmbulance.Database;

namespace EpicAmbulance.Repositories
{
    public interface IUserRepository
    {

        User? Get(Guid id);

        User? GetByEmail(string email);

        IEnumerable<User> GetAll();

        int GetUserCount();

        void Create(User user);

        void Update(User user);

        void UpdatePsw(User user);

        void Remove(User user);
    }
}