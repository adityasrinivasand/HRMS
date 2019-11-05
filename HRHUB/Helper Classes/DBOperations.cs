using HRHUB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRHUB.Helper_Classes
{
    public class DBOperations
    {
        public static bool IsUsernameExist(string username)
        {
            using (HREntities db = new HREntities())
            {
                var v = db.UserInfoes.Where(u => u.UserName == username).FirstOrDefault();
                return v == null ? false : true;
            }

        }
        public static bool IsEmailExist(string EmailID)
        {
            using (HREntities db = new HREntities())
            {
                var v = db.Employees.Where(u => u.Email_ID == EmailID).FirstOrDefault();
                return v == null ? false : true;
            }
        }
        public static int SaveToDB(Employee u)
        {
            using (HREntities db = new HREntities())
            {
                db.Employees.Add(u);
                int a = db.SaveChanges();
                return a;
            }
        }
        public static UserInfo LoginAttempt(string username, string password)
        {
            using (HREntities db = new HREntities())
            {
                var emp = db.UserInfoes.Where(l => l.UserName == username).FirstOrDefault();
                if (emp != null)
                {
                    if (String.Compare(password, emp.Password) == 0)
                    {
                        return emp;
                    }
                }
                return emp;
            }
        }
        public static string Password(PasswordConfirmation pass, string id)
        {
            using (HREntities db = new HREntities())
            {
                var emp = db.UserInfoes.Where(l => l.UserName == id).FirstOrDefault();
                if (emp != null)
                {
                    if (pass.password == pass.confirmpassword)
                    {
                        emp.Password = PWHashing.Hash(pass.password);
                        return "Successfull";
                    }
                    return "Not Successfull";
                    
                }

            }
            return "Not Successfull";

        }
        public static void AddingUserInfo(string username)
        {
            using(HREntities db = new HREntities())
            {
                UserInfo user = new UserInfo();

                user.UserName = username;
                user.Password = PWHashing.Hash("123");
                db.UserInfoes.Add(user);
                db.SaveChanges();
            }
        }
    }
}