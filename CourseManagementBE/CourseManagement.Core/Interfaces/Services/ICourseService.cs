using CourseManagement.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Services
{
    public interface ICourseService
    {
        /// <summary>
        /// Thêm mới dữ liệu
        /// </summary>
        /// <param name="course"></param>
        /// <returns></returns>
        int InsertService(Course course);

        /// <summary>
        /// Sửa dữ liệu
        /// </summary>
        /// <param name="course"></param>
        /// <returns></returns>
        int UpdateService(Course course);
    }
}
