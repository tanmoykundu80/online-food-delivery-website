using System.Collections.Generic;
using System.Linq;
using Yammiee.Models;
using Yammiee.Models.Repository;

namespace Yammiee.Models.Datamanager
{
    public class AdminManager : Idatarepository<Admin>
    {
        private readonly ProjectContext _db;

        public AdminManager(ProjectContext db)
        {
            _db = db;
        }

        public bool Register(Admin obj)
        {
            try
            {
                // ✅ Added check for duplicate email
                var exists = _db.tblAdmin.Any(a => a.Email == obj.Email);
                if (exists)
                    return false;

                _db.tblAdmin.Add(obj);
                _db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public List<Admin> GetAll()
        {
            return _db.tblAdmin.ToList();
        }

        public bool Login(Admin obj)
        {
            try
            {
                var validAdmin = _db.tblAdmin
                    .FirstOrDefault(a => a.Email == obj.Email && a.Password == obj.Password);
                return validAdmin != null;
            }
            catch
            {
                return false;
            }
        }

        // ✅ Added: Delete Admin by Email
        public bool DeleteByEmail(string email)
        {
            var admin = _db.tblAdmin.FirstOrDefault(a => a.Email == email);
            if (admin == null) return false;

            _db.tblAdmin.Remove(admin);
            return _db.SaveChanges() > 0;
        }
    }
}
