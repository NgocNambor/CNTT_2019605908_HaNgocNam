using CourseManagement.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Infrastructure
{
    public interface ICourseRepository:IBaseRepository<Course>
    {
        int Insert(Course course);  
        int Update(Course course);
        object GetCourseOpen();
        object GetCourseOpenTrainer(string trainerID);
        IEnumerable<Course> GetPaging(int pageSize, int pageIndex);  
    }
}
