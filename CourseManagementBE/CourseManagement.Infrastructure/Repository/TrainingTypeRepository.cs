using CourseManagement.Core.Entities;
using CourseManagement.Core.Interfaces.Infrastructure;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Infrastructure.Repository
{
    public class TrainingTypeRepository:BaseRepository<TrainingType>, ITrainingTypeRepository
    {
        public TrainingTypeRepository(IConfiguration configuration):base(configuration) { }
    }
}
