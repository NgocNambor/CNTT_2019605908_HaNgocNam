using CourseManagement.Core.Entities;
using CourseManagement.Core.Interfaces.Infrastructure;
using CourseManagement.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Services
{
    public class CourseService : ICourseService
    {
        ICourseRepository _courseRepository;
        public CourseService(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        public int InsertService(Course course)
        {

            //Validate ket qua

            //thực thi database
            var res = _courseRepository.Insert(course);
            return res;
        }

        public int UpdateService(Course course)
        {

            //validate


            //them vao db
            var rowEffect = _courseRepository.Update(course);
            return rowEffect;
        }
    }
}
