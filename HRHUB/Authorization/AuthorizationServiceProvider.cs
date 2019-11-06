using HRHUB.Helper_Classes;
using HRHUB.Models;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace HRHUB.Authorization
{
    public class AuthorizationServiceProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated(); // 
        }
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            string message = DBOperations.LoginAttempt(context.UserName, context.Password,out UserInfo user);

            if (user != null)
            {
                if (user.isAdmin == true)
                {
                    identity.AddClaim(new Claim(ClaimTypes.Role, "admin"));
                    identity.AddClaim(new Claim("username", context.UserName));
                    context.Validated(identity);
                }
                else if (user.isAdmin == false)
                {
                    identity.AddClaim(new Claim(ClaimTypes.Role, "user"));
                    identity.AddClaim(new Claim("username", context.UserName));
                    context.Validated(identity);
                }
            }
            else
            {
                context.SetError(message);              
            }
            
        }
    }
}