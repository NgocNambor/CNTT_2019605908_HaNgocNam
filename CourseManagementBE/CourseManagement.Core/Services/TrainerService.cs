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
    public class TrainerService : ITrainerService
    {
        ITrainerRepository _trainerRepository;
        public TrainerService(ITrainerRepository trainerRepository)
        {
            _trainerRepository = trainerRepository;
        }

        public int InsertService(Trainer trainer)
        {
            var res = _trainerRepository.Insert(trainer);
            return res;
        }

        public int UpdateService(Trainer trainer)
        {
            var res = _trainerRepository.Update(trainer);
            return res;
        }
    }
}
