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
    public class EmployeeController : ControllerBase
    {
        IEmployeeRepository _employeeRepository;
        IEmployeeService _employeeService;

        public EmployeeController(IEmployeeRepository employeeRepository, IEmployeeService employeeService)
        {
            _employeeRepository = employeeRepository;
            _employeeService = employeeService;
        }

        [HttpGet]

        public IActionResult GetAll() 
        {
            var employees = _employeeRepository.GetAll();
            return Ok(employees);
        }

        [HttpGet("EmployeeID")]
        public IActionResult GetEmployeeID(string employeeID)
        {
            var employee = _employeeRepository.GetByID(employeeID);
            return Ok(employee);
        }

        [HttpGet("filter")]

        public IActionResult GetSearchAndPaging(int? pageSize, int? pageNumber, string? employeeFilter)
        {
            try
            {
                //Lấy kết quả từ Trainer Repository
                var result = _employeeRepository.GetSearchAndPaging(pageSize, pageNumber, employeeFilter);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
