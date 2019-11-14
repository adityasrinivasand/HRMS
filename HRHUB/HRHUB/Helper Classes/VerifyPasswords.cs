using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRHUB.Helper_Classes
{
    public class VerifyPasswords
    {
        public static string Password(PasswordConfirmation pass)
        {

                pass.password = PWHashing.Hash(pass.password);
                pass.confirmpassword = PWHashing.Hash(pass.confirmpassword);

                    if (pass.password == pass.confirmpassword)
                    {
                        return "Successfull";
                    }
                    else
                    {
                        return "Passswords Don't Match";
                    }



        }
    }
}