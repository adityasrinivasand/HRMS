using HRHUB.Helper_Classes;
using HRHUB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace HRHUB.Controllers
{
    public class LoginController : ApiController
    {
        // GET: api/Employees/5
        [HttpPost]
        [AllowAnonymous]
        [Route("api/forgot")]
        [ResponseType(typeof(Employee))]
        public IHttpActionResult ForgotPassword(ForgotPassword pass)
        {
            try
            {
                var employee = DBOperations.IsEmployeeExist(pass.UserName);
                if (employee == null)
                {
                    return NotFound();
                }
                else
                {
                    string VerificationCode = Guid.NewGuid().ToString();
                    var link = HttpContext.Current.Request.Url.AbsoluteUri + "/ForgotPassword/" + employee.UserName;
                    VerificationLink.EmailGeneration(employee.Email_ID, VerificationCode, link, "ResetPassword");
                    return Ok("Reset Link has been sent to your mail id");
                }
            }
            catch(Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }        
        }
        [HttpPost]
        [Route("api/forgot/ForgotPassword/{id=id}")]
        public IHttpActionResult ResetPassword(string id, PasswordConfirmation password)
        {
            try
            {
                string message = VerifyPasswords.Password(password);
                if (message == "Successfull")
                {
                    DBOperations.SaveChangedPassword(password, id);
                    return Ok("Password Changed Successfully");
                }
                else if (message == "Passswords Don't Match")
                {
                    return Ok("Passswords Don't Match");
                }
                else
                {
                    return Ok("Password Change Not Successful");
                }
            }
            catch(Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
            
        }
    }
}
