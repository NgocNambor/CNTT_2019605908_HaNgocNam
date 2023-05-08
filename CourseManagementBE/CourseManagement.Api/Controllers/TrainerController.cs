using CourseManagement.Core.Entities;
using CourseManagement.Core.Interfaces.Infrastructure;
using CourseManagement.Core.Interfaces.Services;
using CourseManagement.Infrastructure.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace CourseManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainerController : ControllerBase
    {
        ITrainerRepository _trainerRepository;
        ITrainerService _trainerService;

        public TrainerController(ITrainerRepository trainerRepository, ITrainerService trainerService)
        {
            _trainerRepository = trainerRepository;
            _trainerService = trainerService;
        }

        [HttpGet]

        public IActionResult GetAll() 
        {
            var trainers = _trainerRepository.GetAll();
            return Ok(trainers);
        }

        [HttpGet("{trainerID}")]

        public IActionResult GetByID(string trainerID) 
        {
            try
            {
                var trainer = _trainerRepository.GetByID(trainerID);
                return Ok(trainer);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]

        public IActionResult Post(Trainer trainer)
        {
            try
            {
                var res = _trainerService.InsertService(trainer);
                return Ok(res);
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]

        public IActionResult Put(Trainer trainer)
        {
            try
            {
                var rowEffect = _trainerService.UpdateService(trainer);
                return Ok(rowEffect);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("filter")]

        public IActionResult GetSearchAndPaging(int? pageSize, int? pageNumber, string? trainerFilter)
        {
            try
            {
                //Lấy kết quả từ Trainer Repository
                var result = _trainerRepository.GetSearchAndPaging(pageSize, pageNumber, trainerFilter);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
