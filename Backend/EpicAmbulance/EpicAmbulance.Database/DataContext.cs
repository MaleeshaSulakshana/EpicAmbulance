using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EpicAmbulance.Database
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<User> Users => Set<User>();
        public DbSet<Ambulance> Ambulances => Set<Ambulance>();
        public DbSet<AmbulanceCrewMember> AmbulanceCrewMembers => Set<AmbulanceCrewMember>();
        public DbSet<Booking> Bookings => Set<Booking>();
        public DbSet<Comment> Comments => Set<Comment>();
        public DbSet<Hospital> Hospitals => Set<Hospital>();
        public DbSet<HospitalUser> HospitalUsers => Set<HospitalUser>();
        public DbSet<SystemUser> SystemUsers => Set<SystemUser>();

    }
}
