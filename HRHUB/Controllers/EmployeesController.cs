using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using HRHUB.Helper_Classes;
using HRHUB.Models;

namespace HRHUB.Controllers
{
    public class EmployeesController : ApiController
    {
        private HREntities db = new HREntities();

        // GET: api/Employees
        public IQueryable<Employee> GetEmployees()
        {
            return db.Employees;
        }

        

        // PUT: api/Employees/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEmployee(int id, Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employee.ID)
            {
                return BadRequest();
            }

            db.Entry(employee).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
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

        // POST: api/Employees
        [HttpPost]
        [Route("api/signup/addEmployee")]
        [ResponseType(typeof(Employee))]
        public IHttpActionResult PostEmployee(Employee employee)
        {
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (DBOperations.IsUsernameExist(employee.UserName))
            {
                return Conflict();
            }
            if (DBOperations.IsEmailExist(employee.Email_ID))
            {
                return Conflict();
            }
            employee.IsEmailVerified = false;

            string VerificationCode = Guid.NewGuid().ToString();
            var link = HttpContext.Current.Request.Url.AbsoluteUri + "/VerifyAccount/" + employee.UserName;
            VerificationLink.EmailGeneration(employee.Email_ID, VerificationCode, link);

            db.Employees.Add(employee);
            db.SaveChanges();
            CallStoredProc.RunLeaveEntryForNew(employee);
            return Ok("Successfully Added");
        }

        [HttpPost]
        [Route("api/signup/addEmployee/VerifyAccount/{id=id}")]
        public IHttpActionResult VerifyEmployee(string id, PasswordConfirmation password)
        {
            string message = VerifyPasswords.Password(password);
            if(message == "Successfull")
            {
                CallStoredProc.RunAddUserInfo(password,id);
                return Ok("Verified Successfully");     
            }
            else
            {
                return Ok("Verification Not Successful");
            }           
        }

        // DELETE: api/Employees/5
        [ResponseType(typeof(Employee))]
        public IHttpActionResult DeleteEmployee(int id)
        {
            Employee employee = db.Employees.Find(id);
            if (employee == null)
            {
                return NotFound();
            }

            db.Employees.Remove(employee);
            db.SaveChanges();

            return Ok(employee);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EmployeeExists(int id)
        {
            return db.Employees.Count(e => e.ID == id) > 0;
        }

    }
}