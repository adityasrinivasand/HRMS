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
    public class LeavesController : ApiController
    {
        private HREntities db = new HREntities();

        // POST: api/Leaves
        [HttpPost]
        //[Authorize]
        [Route("api/leave")]
        [ResponseType(typeof(Leave))]
        public IHttpActionResult PostLeave(Leave leave)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            string message = " ";
            message = DBOperations.CheckLeaveexist(leave);

            if(message == "Leave Applied Successfully")
            {
                return Ok("Leave Applied Successfully");
            }
            else
            {
                return Ok("Leave Not Applied Successfully");
            }
        }

        /*
        // GET: api/Leaves
        public IQueryable<Leave> GetLeaves()
        {
            return db.Leaves;
        }

        // GET: api/Leaves/5
        [ResponseType(typeof(Leave))]
        public IHttpActionResult GetLeave(int id)
        {
            Leave leave = db.Leaves.Find(id);
            if (leave == null)
            {
                return NotFound();
            }

            return Ok(leave);
        }

        // PUT: api/Leaves/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLeave(int id, Leave leave)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != leave.ID)
            {
                return BadRequest();
            }

            db.Entry(leave).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeaveExists(id))
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

        // POST: api/Leaves
        [ResponseType(typeof(Leave))]
        public IHttpActionResult PostLeave(Leave leave)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Leaves.Add(leave);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (LeaveExists(leave.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = leave.ID }, leave);
        }

        // DELETE: api/Leaves/5
        [ResponseType(typeof(Leave))]
        public IHttpActionResult DeleteLeave(int id)
        {
            Leave leave = db.Leaves.Find(id);
            if (leave == null)
            {
                return NotFound();
            }

            db.Leaves.Remove(leave);
            db.SaveChanges();

            return Ok(leave);
        }*/

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LeaveExists(int id)
        {
            return db.Leaves.Count(e => e.ID == id) > 0;
        }
    }
}