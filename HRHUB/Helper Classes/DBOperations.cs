﻿using HRHUB.Models;
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
        public static string LoginAttempt(string username, string password,out UserInfo user)
        {
            using (HREntities db = new HREntities())
            {
                user = db.UserInfoes.Where(l => l.UserName == username).FirstOrDefault();
                password = PWHashing.Hash(password);
                if (user != null)
                {
                    if (String.Compare(password, user.Password) == 0)
                    {
                        return "Successfull";
                    }
                    else
                    {
                        user = null;
                        return "Password is Wrong";
                    }                       
                }
                else
                {
                    user = null;
                    return "Invalid Credentials";
                }
                
            }
        }   
        public static Employee IsEmployeeExist(string username)
        {
            using (HREntities db = new HREntities())
            {
                return db.Employees.Where(l => l.UserName == username).FirstOrDefault();
            }
        }
        public static string SaveChangedPassword(PasswordConfirmation password, string username)
        {
            using (HREntities db = new HREntities())
            {
                var emp=  db.UserInfoes.Where(l => l.UserName == username).FirstOrDefault();
                emp.Password = password.password;
                db.SaveChanges();
                return "Successfully Changed";       
            }
        }
        public static string CheckLeaveexist(Leave leave)
        {
            using (HREntities db = new HREntities())
            {
                var emp = db.Employees.Where(l => l.ID == leave.Employee_ID).FirstOrDefault();
                var result = from logger in db.Leave_Tracking
                             join employee in db.Employees on logger.Employee_ID equals employee.ID
                             select new
                             {
                                 username = employee.UserName,
                                 leavetype = logger.Leave_Type_ID,
                                 remaining = logger.RemainingDays

                             };

                if (emp != null)
                {
                    
                    return "Employee";
                }
                else
                {
                    return "Employee Not Found";
                }
            }
        }
    }
}