using CourseManagement.Core.Entities;
using CourseManagement.Core.Exceptions;
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
    public class ResultController : ControllerBase
    {
        IResultRepository _resultRepository;
        IResultService _resultService;
        public ResultController(IResultRepository resultRepository, IResultService resultService)
        {
            _resultRepository = resultRepository;
            _resultService = resultService;
        }

        [HttpPut]

        public IActionResult Update(Result result)
        {
            try
            {
                //Lấy kết quả trả về sau khi cập nhật kết quả
                var rowEffect = _resultService.UpdateService(result);
                return Ok(rowEffect);
            }
            catch (ValidateException ex)
            {
                var response = new
                {
                    devMsg = ex.Message,
                    userMsg = ex.Message,
                    data = result,
                };
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("EmployeeID")]

        public IActionResult GetResultByEmployeeID(string employeeID)
        {
            try
            {
                //Lấy thông tin từ repository
                var result = _resultRepository.GetResultByEmployeeID(employeeID);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("CourseID")]
        public IActionResult GetResultByCourseID(string courseID)
        {
            try
            {
                //Lấy kết quả trả về
                var result = _resultRepository.GetResultByCourseID(courseID);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("filter")]
        public IActionResult GetPaging(int? pageSize, int? pageNumber, string? courseFilter)
        {
            try
            {
                //Lấy kết quả từ Course Repository
                var result = _resultRepository.GetSearchAndPaging(pageSize, pageNumber, courseFilter);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
