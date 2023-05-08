using CourseManagement.Core.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Services
{
    public interface IResultService
    {
        int UpdateService(Result result);
    }
}
