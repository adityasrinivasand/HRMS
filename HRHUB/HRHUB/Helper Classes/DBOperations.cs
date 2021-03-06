﻿using HRHUB.Models;
using System;
using System.Linq;

namespace HRHUB.Helper_Classes
{
    public class DBOperations
    {
        public static bool IsUsernameExist(string username) //Check User Name exists in the DB
        {
            try
            {
                using (HREntities db = new HREntities())
                {
                    var v = db.UserInfoes.Where(u => u.UserName == username).FirstOrDefault();
                    return v == null ? false : true;
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return false;
            }
        }
        public static bool IsEmailExist(string EmailID) //Check Email ID exists in the DB
        {
            try
            {
                using (HREntities db = new HREntities())
                {
                    var v = db.Employees.Where(u => u.Email_ID == EmailID).FirstOrDefault();
                    return v == null ? false : true;
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return false;
            }

        }
        public static int SaveToDB(Employee u) //Check Saving to DB exists in the DB
        {
            try
            {
                using (HREntities db = new HREntities())
                {
                    db.Employees.Add(u);
                    int a = db.SaveChanges();
                    return a;

                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return -1;
            }
        }
        public static string LoginAttempt(string username, string password, out UserInfo user) //Login function
        {
            try
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
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                user = null;
                return "Exception Caused";
            }
        }
        public static Employee IsEmployeeExist(string username) //Employee Exists in the DB.
        {
            try
            {
                using (HREntities db = new HREntities())
                {
                    return db.Employees.Where(l => l.UserName == username).FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return null;
            }
        }
        public static string SaveChangedPassword(PasswordConfirmation password, string username) //Saving the Changed password in the db
        {
            try
            {
                using (HREntities db = new HREntities())
                {
                    var emp = db.UserInfoes.Where(l => l.UserName == username).FirstOrDefault();
                    emp.Password = password.password;
                    db.SaveChanges();
                    return "Successfully Changed";
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return "Exception While trying to save in DB";
            }

        }
        public static string CheckLeaveexist(Leave leave) //Check whether leave exist, if yes the leave will be applied.
        {
            var leaveTaken = 0.0;
            try
            {
                using (HREntities db = new HREntities())
                {
                    int a = 1;
                    var emp = db.Employees.Where(l => l.ID == leave.Employee_ID).FirstOrDefault();
                    var result = from leaveTrack in db.Leave_Tracking
                                 join employee in db.Employees on leaveTrack.Employee_ID equals employee.ID
                                 select new
                                 {
                                     username = employee.UserName,
                                     leavetype = leaveTrack.Leave_Type_ID,
                                     remaining = leaveTrack.RemainingDays,
                                     empid = employee.ID

                                 };
                    foreach (var obj in result)
                    {
                        if (emp.UserName == obj.username)
                        {
                            if (obj.leavetype == leave.Leave_Type_ID)
                            {
                                leaveTaken = DaysCalculation.CalculateDays(leave);
                                if (leaveTaken < obj.remaining)
                                {
                                    db.Leaves.Add(leave);
                                    var leaveTrack = db.Leave_Tracking.Where(l => (l.Employee_ID == obj.empid) && (l.Leave_Type_ID == obj.leavetype)).FirstOrDefault();
                                    leaveTrack.RemainingDays = (obj.remaining - leaveTaken);
                                    leave.Status = "Applied";
                                    a = 0;
                                    break;
                                }
                            }
                        }
                    }
                    if (a == 0)
                    {
                        try
                        {
                            db.SaveChanges();
                        }
                        catch (Exception ex)
                        {
                            LogFile.WriteLog(ex);
                        }

                        return "Leave Applied Successfully";
                    }
                    else
                    {
                        return "Leave not Applied";
                    }
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return "Exception Caused";
            }


        }
        public static double BalanceDays(int id, int leaveTypeID) //Checking the balance days
        {
            try
            {
                using (HREntities db = new HREntities())
                {
                    double a = 1;
                    var emp = db.Employees.Where(l => l.ID == id).FirstOrDefault();
                    var result = from logger in db.Leave_Tracking
                                 join employee in db.Employees on logger.Employee_ID equals employee.ID
                                 select new
                                 {
                                     username = employee.UserName,
                                     leavetype = logger.Leave_Type_ID,
                                     remaining = logger.RemainingDays,
                                     empid = employee.ID

                                 };
                    foreach (var obj in result)
                    {
                        if (emp.UserName == obj.username)
                        {
                            if (obj.leavetype == leaveTypeID)
                            {
                                a = obj.remaining;
                                break;
                            }
                        }
                    }
                    return a;
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return -1;
            }
        }
        public static int GetEmployeeID(string userName) //Getting Employee id from the User Name
        {
            try
            {
                using (HREntities db = new HREntities())
                {
                    var v = db.UserInfoes.Where(u => u.UserName == userName).FirstOrDefault();
                    return v.Employee_ID;
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return 0;
            }

        }
        public static void UpdateUserinfo(int ID, string username)
        {
            using (HREntities db = new HREntities())
            {
                UserInfo user = new UserInfo();
                user.Employee_ID = ID;
                user.UserName = username;
                user.Password = "Psiog@123";
                db.UserInfoes.Add(user);
                db.SaveChanges();
            }
        }
    }
}
