using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Entities
{
    public class Registration
    {
        public string EmployeeID { get; set; }
        public string CourseID { get; set; }
        public DateTime? RegistrationDate { get; set; }
        public string? EmployeeName { get; set; }
        public string? CourseName { get; set; }
        public int? Status { get; set; }
        public int? CategoryID { get; set; }
        public string? CategoryName { get; set; }
        public float? Score { get; set; }
        public string? Note { get; set; }
    }
}
