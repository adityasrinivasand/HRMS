using HRHUB.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace HRHUB.Helper_Classes
{
    public class CallStoredProc
    {
        public static void RunLeaveEntryForNew(Employee employee)
        {
            try
            {
                using (HREntities db = new HREntities())
                {
                    var result = db.LeaveEntryForNew(employee.DOJ, employee.ID);
                }
            }
            catch(Exception ex)
            {
                LogFile.WriteLog(ex);
            }          
        }
        public static void RunAddUserInfo(PasswordConfirmation password, string id)
        {
            try
            {
                using (HREntities db = new HREntities())
                {
                    var employee = db.Employees.Where(l => l.UserName == id).FirstOrDefault();
                    var result = db.AddUserInfo(employee.ID, employee.UserName, password.password);
                }
            }
            catch(Exception ex)
            {
                LogFile.WriteLog(ex);
            }         
        }
    }
}