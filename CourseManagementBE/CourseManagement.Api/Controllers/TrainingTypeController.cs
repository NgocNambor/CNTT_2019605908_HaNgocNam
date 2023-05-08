using CourseManagement.Core.Interfaces.Infrastructure;
using CourseManagement.Infrastructure.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainingTypeController : ControllerBase
    {
        ITrainingTypeRepository _trainingTypeRepository;

        public TrainingTypeController(ITrainingTypeRepository trainingTypeRepository)
        {
            _trainingTypeRepository = trainingTypeRepository;
        }

        [HttpGet]
        public IActionResult GetAll() 
        {
            var trainingTypes = _trainingTypeRepository.GetAll();
            return Ok(trainingTypes);
        }

        [HttpGet("trainingTypeID")]
        public IActionResult GetByID(int trainingTypeID)
        {
            var trainingType = _trainingTypeRepository.GetByID(trainingTypeID.ToString());

            return Ok(trainingType);
        }
    }
}
