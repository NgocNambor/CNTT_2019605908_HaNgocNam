using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static CourseManagement.Core.Emuns.Enum;

namespace CourseManagement.Core.Entities
{
    public class Course
    {

        public Course()
        {

        }
        public string CourseID { get; set; }
        public string CourseName { get; set; }
        public int Duration { get; set; }
        public StatusCourse Status { get; set; }
        public string StatusName
        {
            get
            {
                switch (Status)
                {
                    case StatusCourse.TempClosed:
                        return "Tạm đóng";
                    case StatusCourse.OpenRegister:
                        return "Mở đăng ký";
                    case StatusCourse.Open:
                        return "Đang mở";
                    case StatusCourse.Close:
                        return "Đã kết thúc";
                    default: return "Tạm đóng";
                }
            }
        }
        public DateTime StartDay { get; set; }
        public DateTime EndDay { get; set; }
        public string? Description { get; set; }
        public int CategoryID { get; set; }
        public string? CategoryName { get; set; }
        public string TrainerID { get; set; }
        public string? TrainerName { get; set; }
        public int TrainingTypeID { get; set; }
        public string? TrainingTypeName { get; set; }
        public int NumOfRegisters { get; set; }
        public int ExpOfYear { get; set; }
        public int NumOfMembers { get; set; }

    }
}
