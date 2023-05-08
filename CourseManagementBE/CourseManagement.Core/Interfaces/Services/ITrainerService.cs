using CourseManagement.Core.Entities;
using CourseManagement.Core.Interfaces.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Services
{
    public interface ITrainerService
    {
        int InsertService(Trainer trainer);
        int UpdateService(Trainer trainer);
    }
}
