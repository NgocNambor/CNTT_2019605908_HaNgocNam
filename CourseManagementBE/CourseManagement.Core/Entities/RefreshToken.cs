using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Entities
{
    public class RefreshToken
    {
        public string? TokenString { get; set; }

        public DateTime TokenCreated { get; set; }
        public DateTime TokenExpires { get; set; }


    }
}
