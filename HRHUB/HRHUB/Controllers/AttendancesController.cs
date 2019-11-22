using System;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using HRHUB.Helper_Classes;
using HRHUB.Models;

namespace HRHUB.Controllers
{
    public class AttendancesController : ApiController
    {
        private HREntities db = new HREntities();

        [HttpGet]
        [Route("api/Attendances")]
        // GET: api/Attendances
        public IHttpActionResult GetAttendances()
        {
            try
            {
                var listOfAttendances = db.Attendances.Select(r => new
                {
                    ID = r.ID,
                    Employee_ID = r.Employee_ID,
                    Date = r.Date,
                    CheckIn = r.CheckIn.ToString(),
                    CheckOut = r.CheckOut.ToString(),
                    Status = r.Status
                });

                return Ok(listOfAttendances.ToList());
            }
            catch(Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("api/Attendances/{id=id}")]
        // GET: api/Attendances/5
        [ResponseType(typeof(Attendance))]
        public IHttpActionResult GetAttendance(string id)
        {
            try
            {
                var empId = DBOperations.GetEmployeeID(id);
                if (empId != null)
                {
                    var listOfAttendances = db.Attendances.Where(x => x.Employee_ID == empId).Select(r => new
                    {
                        ID = r.ID,
                        Employee_ID = r.Employee_ID,
                        Date = r.Date,
                        CheckIn = r.CheckIn.ToString(),
                        CheckOut = r.CheckOut.ToString(),
                        Status = r.Status
                    });
                    return Ok(listOfAttendances.ToList());
                }
                else
                {
                    return BadRequest("Not Found");
                }
            }
            catch(Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        } 
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AttendanceExists(int id)
        {
            return db.Attendances.Count(e => e.ID == id) > 0;
        }
    }
}