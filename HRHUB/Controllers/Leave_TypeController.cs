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
    public class Leave_TypeController : ApiController
    {
        private HREntities db = new HREntities();


        [HttpGet]
        // GET: api/Leave_Type
        public IQueryable<Leave_Type> GetLeave_Type()
        {
            return db.Leave_Type;
        }

        // GET: api/Leave_Type/5
        [ResponseType(typeof(Leave_Type))]
        public IHttpActionResult GetLeave_Type(int id)
        {
            Leave_Type leave_Type = db.Leave_Type.Find(id);
            if (leave_Type == null)
            {
                return NotFound();
            }

            return Ok(leave_Type);
        }

        // PUT: api/Leave_Type/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLeave_Type(int id, Leave_Type leave_Type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != leave_Type.ID)
            {
                return BadRequest();
            }

            db.Entry(leave_Type).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Leave_TypeExists(id))
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

        // POST: api/Leave_Type
        [ResponseType(typeof(Leave_Type))]
        public IHttpActionResult PostLeave_Type(Leave_Type leave_Type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Leave_Type.Add(leave_Type);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (Leave_TypeExists(leave_Type.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = leave_Type.ID }, leave_Type);
        }

        // DELETE: api/Leave_Type/5
        [ResponseType(typeof(Leave_Type))]
        public IHttpActionResult DeleteLeave_Type(int id)
        {
            Leave_Type leave_Type = db.Leave_Type.Find(id);
            if (leave_Type == null)
            {
                return NotFound();
            }

            db.Leave_Type.Remove(leave_Type);
            db.SaveChanges();

            return Ok(leave_Type);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Leave_TypeExists(int id)
        {
            return db.Leave_Type.Count(e => e.ID == id) > 0;
        }
    }
}