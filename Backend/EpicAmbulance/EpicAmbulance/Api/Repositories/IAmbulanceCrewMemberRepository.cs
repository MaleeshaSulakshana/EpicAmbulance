using EpicAmbulance.Database;

namespace EpicAmbulance.Repositories
{
    public interface IAmbulanceCrewMemberRepository
    {
        AmbulanceCrewMember? Get(Guid id);

        AmbulanceCrewMember? GetByNic(string nic);

        IEnumerable<AmbulanceCrewMember> GetAll();

        void Create(AmbulanceCrewMember user);

        void Update(AmbulanceCrewMember user);

        void UpdatePsw(AmbulanceCrewMember user);

        void Remove(AmbulanceCrewMember user);
    }
}