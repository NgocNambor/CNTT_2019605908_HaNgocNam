using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Entities
{
    public class Employee
    {
        public Employee()
        {

        }

        public string EmployeeID { get; set; }
        public string EmployeeName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Gender { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public int PositionID { get; set; }
        public string PositionName { get; set; }
        public int DepartmentID { get; set; }
        public string DepartmentName { get; set; }
        public int ExpOfYear { get; set; }
    }
}
