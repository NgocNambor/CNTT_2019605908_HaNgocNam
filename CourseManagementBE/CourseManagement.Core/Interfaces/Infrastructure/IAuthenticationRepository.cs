using CourseManagement.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Infrastructure
{
    public interface IAuthenticationRepository
    {
        Account GetAccount(string username, string password);
    }
}
