using CourseManagement.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Infrastructure
{
    public interface ITrainerRepository:IBaseRepository<Trainer>
    {
        int Insert (Trainer trainer);
        int Update (Trainer trainer);
        IEnumerable<Course> GetPaging(int pageSize, int pageIndex);

    }
}
