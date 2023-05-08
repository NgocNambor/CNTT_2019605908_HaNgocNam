using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static CourseManagement.Core.Emuns.Enum;

namespace CourseManagement.Core.Entities
{
    public class Trainer
    {
        public Trainer()
        {

        }
        public string TrainerID { get; set; }
        public string TrainerName { get; set; }
        public StatusTrainerLevel TLevel { get; set; }
        public string LevelName 
        {
            get
            {
                switch (TLevel)
                {
                    case StatusTrainerLevel.ThacSi:
                        return "Thạc sĩ";
                    case StatusTrainerLevel.TienSi:
                        return "Tiến sĩ";
                    default: return "";
                }
            }
        }
        public StatusOfTrainer Status { get; set; }

        public string StatusName
        {
            get
            {
                switch (Status)
                {
                    case StatusOfTrainer.Off:
                        return "Nghỉ";
                    case StatusOfTrainer.Onl:
                        return "Đang hoạt động";
                    default: return "";
                }
            }
        }
        public DateTime DateOfBirth{ get; set; }
        public string Address { get; set; }
        public int Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Major  { get; set; }
        public int ExpOfYear { get; set; }

    }
}
