using HRHUB.Authenticate;
using HRHUB.Helper_Classes;
using HRHUB.Models;
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
    public class TokenController : ApiController
    {
        [HttpPost]
        [Route("token")]
        public IHttpActionResult GetToken(Login login)
        {
            if(DBOperations.LoginAttempt(login.userName, login.password, out UserInfo user) == "Successfull")
            {
                var roles = "user";
                if(user.isAdmin == true)
                {
                    roles = "admin";
                }
                IAuthContainerModel model = GetJWTContainerModel(user.UserName, roles);
                IAuthService authService = new JWTService(model.SecretKey);

                string token = authService.GenerateToken(model);

                if (!authService.IsTokenValid(token))
                    throw new UnauthorizedAccessException();
                else
                {
                    List<Claim> claims = authService.GetTokenClaims(token).ToList();

                }
                return Ok(token);
            }
            else
            {
                return BadRequest("Invalid Credentials");
            }
            
        }

        [NonAction]
        #region Private Methods
        private static JWTContainerModel GetJWTContainerModel(string username, string roles)
        {
            return new JWTContainerModel()
            {
                Claims = new Claim[]
                {
                    new Claim(ClaimTypes.Name, username),
                    new Claim(ClaimTypes.Role, roles)
                }
            };
        }
        #endregion
    }
}
