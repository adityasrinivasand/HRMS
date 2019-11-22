using System;
using System.Linq;
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
        [Route("api/leave/{id=id}")]
        [ResponseType(typeof(Leave))]
        public IHttpActionResult PostLeave(string id, Leave leave)
        {
            try
            {
                leave.Employee_ID = DBOperations.GetEmployeeID(id);
                leave.Submit_Date = DateTime.Now;
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                string message = " ";
                message = DBOperations.CheckLeaveexist(leave);

                if (message == "Leave Applied Successfully")
                {
                    return Ok("Leave Applied Successfully");
                }
                else
                {
                    return Ok("Leave Not Applied Successfully");
                }
            }
            catch(Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }     
        }
        [HttpGet]
        [Route("api/leave/{id}/{leaveType}")]
        public IHttpActionResult GetBalanceLeave(string id,int leaveType)
        {
            try
            {
                var empId = DBOperations.GetEmployeeID(id);
                var balance = DBOperations.BalanceDays(empId, leaveType);
                return Ok(balance);
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

        private bool LeaveExists(int id)
        {
            return db.Leaves.Count(e => e.ID == id) > 0;
        }
    }
}