using CourseManagement.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Services
{
    public interface IAuthenticationService
    {
        object LoginService(Account account);

        string GenerateSHA512(string input);

        string CreateToken(Account account);
    }
}
