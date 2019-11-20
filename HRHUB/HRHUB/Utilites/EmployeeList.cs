using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRHUB.Utilites
{
    public class EmployeeList
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public System.DateTime DOB { get; set; }
        public string UserName { get; set; }
        public System.DateTime DOJ { get; set; }
        public long PhoneNumber { get; set; }
        public string Email_ID { get; set; }
        public string BloodType { get; set; }
        public string MaritalStatus { get; set; }
        public string Nationality { get; set; }
        public string Gender { get; set; }
        public string Department { get; set; }
    }
}