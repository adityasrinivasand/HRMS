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
using HRHUB.Models;

namespace HRHUB.Controllers
{
    public class Leave_TrackingController : ApiController
    {
        private HREntities db = new HREntities();

        // GET: api/Leave_Tracking
        public IQueryable<Leave_Tracking> GetLeave_Tracking()
        {
            return db.Leave_Tracking;
        }

        // GET: api/Leave_Tracking/5
        [ResponseType(typeof(Leave_Tracking))]
        public IHttpActionResult GetLeave_Tracking(int id)
        {
            Leave_Tracking leave_Tracking = db.Leave_Tracking.Find(id);
            if (leave_Tracking == null)
            {
                return NotFound();
            }

            return Ok(leave_Tracking);
        }

        // PUT: api/Leave_Tracking/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLeave_Tracking(int id, Leave_Tracking leave_Tracking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != leave_Tracking.ID)
            {
                return BadRequest();
            }

            db.Entry(leave_Tracking).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Leave_TrackingExists(id))
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

        // POST: api/Leave_Tracking
        [ResponseType(typeof(Leave_Tracking))]
        public IHttpActionResult PostLeave_Tracking(Leave_Tracking leave_Tracking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Leave_Tracking.Add(leave_Tracking);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = leave_Tracking.ID }, leave_Tracking);
        }

        // DELETE: api/Leave_Tracking/5
        [ResponseType(typeof(Leave_Tracking))]
        public IHttpActionResult DeleteLeave_Tracking(int id)
        {
            Leave_Tracking leave_Tracking = db.Leave_Tracking.Find(id);
            if (leave_Tracking == null)
            {
                return NotFound();
            }

            db.Leave_Tracking.Remove(leave_Tracking);
            db.SaveChanges();

            return Ok(leave_Tracking);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Leave_TrackingExists(int id)
        {
            return db.Leave_Tracking.Count(e => e.ID == id) > 0;
        }
    }
}