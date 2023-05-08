using CourseManagement.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Infrastructure
{
    public interface IEmployeeRepository:IBaseRepository<Employee>
    {
        IEnumerable<Employee> GetPaging (int pageSize, int pageIndex);  
    }
}
