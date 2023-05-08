using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Emuns
{
    public class Enum
    {
        public enum Gender
        {
            Male = 0,
            Female = 1
        }

        public enum StatusTrainerLevel
        {
            ThacSi = 0,
            TienSi = 1
        }

        public enum StatusOfTrainer
        {
            Off = 0,
            Onl = 1
        }

        public enum StatusCourse
        {
            TempClosed = 0,
            OpenRegister = 1,
            Open = 2,
            Close = 3
        }

        public enum StatusRegistration
        {
            UnApprove = 0,
            Approve = 1,
            Cancel = 2
        }

    }
}
