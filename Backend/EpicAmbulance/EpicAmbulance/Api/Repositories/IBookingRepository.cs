using EpicAmbulance.Database;

namespace EpicAmbulance.Repositories
{
    public interface IBookingRepository
    {

        Booking? Get(Guid id);

        IEnumerable<Booking> GetAll();

        IEnumerable<Booking> GetAllByUserId(Guid userId);

        IEnumerable<Booking> GetAllByHospitalId(Guid hospitalId);

        IEnumerable<Booking> GetAllByAmbulanceId(Guid ambulanceId);

        void Create(Booking booking);

        void Update(Booking booking);
    }
}