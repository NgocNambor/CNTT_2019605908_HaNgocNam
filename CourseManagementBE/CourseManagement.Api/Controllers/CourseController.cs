using CourseManagement.Core.Entities;
using CourseManagement.Core.Exceptions;
using CourseManagement.Core.Interfaces.Infrastructure;
using CourseManagement.Core.Interfaces.Services;
using CourseManagement.Core.Services;
using CourseManagement.Infrastructure.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace CourseManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        ICourseRepository  _courseRepository;
        ICourseService _courseService;

        public CourseController(ICourseRepository courseRepository, ICourseService courseService)
        {
            _courseRepository = courseRepository;
            _courseService = courseService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            //Thực hiện lấy dữ liệu
            var courses = _courseRepository.GetAll();
            return Ok(courses);
        }

        [HttpGet("{courseID}")]
        public IActionResult GetByID(string courseID)
        {
            try
            {
                //Thực hiện lấy dữ liệu
                var course = _courseRepository.GetByID(courseID);
                return Ok(course);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("CourseOpen")]
        public IActionResult GetCourseOpen()
        {
                var courses = _courseRepository.GetCourseOpen();
                return Ok(courses);
  
        }
        [HttpGet("CourseOpenTrainer")]
        public IActionResult GetCourseOpenTrainer(string trainerID)
        {
            try
            {
                //Thực hiện lấy dữ liệu
                var courses = _courseRepository.GetCourseOpenTrainer(trainerID);
                return Ok(courses);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        public IActionResult Post(Course course)
        {
            try
            {
                var res = _courseService.InsertService(course);

                return Ok(res);
            }
            catch (Exception ex) {
                
                return BadRequest(ex.Message);
            }
        }


        [HttpPut]
        public IActionResult Put(Course course)
        {
            try
            {
                var rowEffect = _courseService.UpdateService(course);
                return Ok(rowEffect);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("filter")]
        public IActionResult GetSearchAndPaging(int? pageSize, int? pageNumber, string? courseFilter)
        {
            try
            {
                //Lấy kết quả từ Course Repository
                var result = _courseRepository.GetSearchAndPaging(pageSize, pageNumber, courseFilter);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
