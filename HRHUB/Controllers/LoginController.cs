using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Security.Claims;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using HRHUB.Helper_Classes;
using HRHUB.Models;

namespace HRHUB.Controllers
{
    public class LoginController : ApiController
    {
        private HREntities db = new HREntities();

        [AllowAnonymous]
        [HttpGet]
        [Route("api/login/forall")]
        public IHttpActionResult Get()
        {
            return Ok("Now server time is: " + DateTime.Now.ToString());
        }

        [Authorize]
        [HttpGet]
        [Route("api/login/authenticate")]
        public IHttpActionResult GetForAuthenticate()
        {
            var identity = (ClaimsIdentity)User.Identity;
            return Ok("Hello User" );
        }

        [Authorize(Roles = "admin")]
        [HttpGet]
        [Route("api/login/authorize")]
        public IHttpActionResult GetForAdmin()
        {
            var identity = (ClaimsIdentity)User.Identity;
            var roles = identity.Claims
                        .Where(c => c.Type == ClaimTypes.Role)
                        .Select(c => c.Value);
            return Ok("Hello " + " Role: " + string.Join(",", roles.ToList()));
        }


        

        /*


        // GET: api/Login/5
        [Route("api/login")]

        public IHttpActionResult GetUserInfo(string username)
        {

            if (DBOperations.IsUsernameExist(username) == false)
            {
                return NotFound();
            }

            return Ok(username);
        }

        // PUT: api/Login/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUserInfo(int id, UserInfo userInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userInfo.Employee_ID)
            {
                return BadRequest();
            }

            db.Entry(userInfo).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserInfoExists(id))
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
        [HttpPost]
        // POST: api/Login
       // [ResponseType(typeof(UserInfo))]
        public IHttpActionResult PostUserInfo(string username )
        {
            if (DBOperations.IsUsernameExist(username) == false)
            {
                return NotFound();
            }

            return Ok(username);
            /*
            //db.UserInfoes.Add(userInfo);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (UserInfoExists(userInfo.Employee_ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = userInfo.Employee_ID }, userInfo);
        }

        // DELETE: api/Login/5
        [ResponseType(typeof(UserInfo))]
        public IHttpActionResult DeleteUserInfo(int id)
        {
            UserInfo userInfo = db.UserInfoes.Find(id);
            if (userInfo == null)
            {
                return NotFound();
            }

            db.UserInfoes.Remove(userInfo);
            db.SaveChanges();

            return Ok(userInfo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserInfoExists(int id)
        {
            return db.UserInfoes.Count(e => e.Employee_ID == id) > 0;
        }*/
    }
}