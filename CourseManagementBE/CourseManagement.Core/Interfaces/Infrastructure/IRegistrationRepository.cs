using CourseManagement.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Infrastructure
{
    public interface IRegistrationRepository:IBaseRepository<Registration>
    {
        int Insert (Registration registration);
        int Update (Registration registration);
        object GetMemberOfCourse(string courseID);
        IEnumerable<Registration> GetByCourseID(string courseID);
        string IsDuplicated(string employeeID, string courseID);

    }
}
