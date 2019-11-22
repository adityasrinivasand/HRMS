using System;
using HRHUB.Controllers;
using HRHUB.Utilites;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace HRHUBTests
{
    [TestClass]
    public class LoginTest
    {
        [TestMethod]
        public void LoginAttemptSuccesfull()
        {
            TokenController controller = new TokenController();
            Login log = new Login();

            log.userName = "P102";
            log.password = "Psiog@123";
            log.grant_type = "password";

            var actionResult = controller.GetToken(log);
            var posRes = actionResult as OkNegotiatedContentResult<object>;
        }
    }
}
