using System;
using System.Collections.Generic;
using System.Linq;
using Yammiee.Models.Repository;

namespace Yammiee.Models.Datamanager
{
    public class UserManager : Idatarepository<User>
    {
        private readonly ProjectContext _db;

        public UserManager(ProjectContext db)
        {
            _db = db;
        }

        public bool Register(User obj)
        {
            try
            {
                _db.tblUser.Add(obj);
                _db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public List<User> GetAll()
        {
            try
            {
                return _db.tblUser.ToList();
            }
            catch
            {
                return new List<User>();
            }
        }

        public bool Login(User obj)
        {
            try
            {
                var validUser = _db.tblUser.FirstOrDefault(a =>
                    a.Email == obj.Email && a.Password == obj.Password);
                return validUser != null;
            }
            catch
            {
                return false;
            }
        }

        public bool DeleteByEmail(string email)
        {
            try
            {
                var user = _db.tblUser.FirstOrDefault(u => u.Email.ToLower() == email.ToLower());
                if (user == null)
                    return false;

                _db.tblUser.Remove(user);
                _db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

    }
}
