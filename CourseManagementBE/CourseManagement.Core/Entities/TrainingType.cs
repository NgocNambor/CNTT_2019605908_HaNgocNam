using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Entities
{
    public class TrainingType
    {
        public int TrainingTypeID { get; set; }
        public string? TrainingTypeName { get;set; }
        public string? Description { get; set;}
    }
}
