using System;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
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
        [HttpGet]
        [Route("api/GetEmployees")]
       // [Authorize]
        public IHttpActionResult GetEmployees()
        {
            try
            {
                var listOfEmployees = db.Employees.Select(r => new
                {
                    ID = r.ID,
                    Name = r.Name,
                    DOB = r.DOB,
                    UserName = r.UserName,
                    DOJ = r.DOJ,
                    PhoneNumber = r.PhoneNumber,
                    Email_ID = r.Email_ID,
                    BloodType = r.BloodType,
                    MaritalStatus = r.MaritalStatus,
                    Nationality = r.Nationality,
                    Gender = r.Gender,
                    Department = r.Department
                });

                return Ok(listOfEmployees.ToList());
            }
            catch(Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
            
        }
        [ResponseType(typeof(Employee))]
        [Route("api/GetEmployee/{id=id}")]
        public IHttpActionResult GetEmployee(long id)
        {
            try
            {
                Employee employee = db.Employees.Find(id);
                if (employee == null)
                {
                    return NotFound();
                }
                return Ok(employee);
            }
            catch(Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }        
        }
        // POST: api/Employees
        [HttpPost]
        [Route("api/signup/addEmployee")]
        [ResponseType(typeof(Employee))]
        public IHttpActionResult PostEmployee(Employee employee)
        {
            try
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
            catch(Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }          
        }
        [HttpPost]
        [Route("api/signup/addEmployee/VerifyAccount/{id=id}")]
        public IHttpActionResult VerifyEmployee(string id, PasswordConfirmation password)
        {
            try
            {
                string message = VerifyPasswords.Password(password);
                if (message == "Successfull")
                {
                    CallStoredProc.RunAddUserInfo(password, id);
                    return Ok("Verified Successfully");
                }
                else
                {
                    return Ok("Verification Not Successful");
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
        private bool EmployeeExists(int id)
        {
            return db.Employees.Count(e => e.ID == id) > 0;
        }
    }
}