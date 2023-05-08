using CourseManagement.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Services
{
    public  interface IRegistrationService
    {
        int InsertService(Registration registration);
        int UpdateService(Registration registration);

    }
}
