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
        public static void RunStoredProc(Employee employee)
        {
            using (HREntities db = new HREntities())
            {
                var result = db.LeaveEntryForNew(employee.DOJ, employee.ID);
            }
        }
    }
}