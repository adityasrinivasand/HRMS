using HRHUB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRHUB.Helper_Classes
{
    public class DaysCalculation
    {
        public static double CalculateDays(Leave leave)
        {
            var leaveTaken = 0.0;
            var noOfDays = (leave.Leave_EndDate - leave.Leave_StartDate).TotalDays;
            if(noOfDays == 0)
            {
                if(leave.From_Session == leave.To_Session)
                {
                    leaveTaken = 0.5;
                }
                else
                {
                    leaveTaken = 1;
                }
            }
            else if (noOfDays > 0)
            {
                if (leave.From_Session == leave.To_Session)
                {
                    leaveTaken = noOfDays + 0.5;
                }
                else if (leave.From_Session != leave.To_Session)
                {
                    leaveTaken = noOfDays + 1;
                }
            }
            return leaveTaken;
        }
    }
}