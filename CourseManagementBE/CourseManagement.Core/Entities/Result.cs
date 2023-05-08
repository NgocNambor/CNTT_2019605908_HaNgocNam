using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Entities
{
    public class Result
    {
        public int? ResultID { get; set; }
        public string EmployeeID { get; set; }
        public string? EmployeeName { get; set; }
        public string CourseID { get; set; }
        public float? Score { get; set; }
        public string? Note { get; set; }

    }
}
