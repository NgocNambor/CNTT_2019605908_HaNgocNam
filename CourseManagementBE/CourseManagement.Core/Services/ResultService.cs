using CourseManagement.Core.Entities;
using CourseManagement.Core.Interfaces.Infrastructure;
using CourseManagement.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Services
{
    public class ResultService : IResultService
    {
        IResultRepository _resultRepository;
        public ResultService(IResultRepository resultRepository)
        {
            _resultRepository = resultRepository;
        }

        public int UpdateService(Result result)
        {
            var rowEffect = _resultRepository.Update(result);
            return rowEffect;
        }
    }
}
