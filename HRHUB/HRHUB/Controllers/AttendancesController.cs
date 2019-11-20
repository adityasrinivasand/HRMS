using System;
using System.Collections.Generic;
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

        [HttpGet]
        [Route("api/Attendances/{id=id}")]
        // GET: api/Attendances/5
        [ResponseType(typeof(Attendance))]
        public IHttpActionResult GetAttendance(string id)
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

        // PUT: api/Attendances/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAttendance(int id, Attendance attendance)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != attendance.ID)
            {
                return BadRequest();
            }

            db.Entry(attendance).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AttendanceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Attendances
        [ResponseType(typeof(Attendance))]
        public IHttpActionResult PostAttendance(Attendance attendance)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Attendances.Add(attendance);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (AttendanceExists(attendance.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = attendance.ID }, attendance);
        }

        // DELETE: api/Attendances/5
        [ResponseType(typeof(Attendance))]
        public IHttpActionResult DeleteAttendance(int id)
        {
            Attendance attendance = db.Attendances.Find(id);
            if (attendance == null)
            {
                return NotFound();
            }

            db.Attendances.Remove(attendance);
            db.SaveChanges();

            return Ok(attendance);
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