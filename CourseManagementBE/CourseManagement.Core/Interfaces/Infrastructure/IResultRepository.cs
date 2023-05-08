using CourseManagement.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Infrastructure
{
    public interface IResultRepository:IBaseRepository<Result>
    {
        int Update(Result result);

        object GetResultByEmployeeID(string employeeID);

        object GetResultByCourseID(string courseID);

        IEnumerable<Result> GetPaging(int pageSize, int pageIndex);

    }
}
