using HRHUB.Utilites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace HRHUB.Controllers
{
    public class AccountController : ApiController
    {
        
        [HttpGet]
        [Authorize]
        [Route("api/GetUserClaims")]
        public AccountModel GetUserClaims()
        {
            var identityClaims = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identityClaims.Claims;
            AccountModel models = new AccountModel();
                models.UserName = identityClaims.FindFirst("Username").Value;
            var roles = identityClaims.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value);
            models.Roles = string.Join(",", roles.ToList());
            models.LoggedOn = identityClaims.FindFirst("LoggedOn").Value;
            return models;
        }
    }
}
