using CourseManagement.Core.Entities;
using CourseManagement.Core.Exceptions;
using CourseManagement.Core.Interfaces.Infrastructure;
using CourseManagement.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Diagnostics.CodeAnalysis;

namespace CourseManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        IRegistrationRepository _registrationRepository;
        IRegistrationService _registrationService;

        public RegistrationController(IRegistrationRepository registrationRepository, IRegistrationService registrationService)
        {
            _registrationRepository = registrationRepository;
            _registrationService = registrationService;
        }

        [HttpGet]

        public IActionResult GetAll()
        {
            var registrations = _registrationRepository.GetAll();
            return Ok(registrations);
        }

        [HttpGet("CourseID")]
        public IActionResult GetByCourseID(string courseID) 
        {

                //Lấy thông tin từ repository
                var registrations = _registrationRepository.GetByCourseID(courseID);
                return Ok(registrations);
        }


        [HttpGet("MemberOfCourse")]
        public IActionResult GetMemberOfCourse(string courseID)
        {

            //Lấy thông tin từ repository
            var registrations = _registrationRepository.GetMemberOfCourse(courseID);
            return Ok(registrations);
        }

        [HttpPost]
        public IActionResult Post(Registration registration)
        {
            try
            {
                var row = _registrationService.InsertService(registration);
                return Ok(row);
            }
            catch (ValidateException ex)
            {

                var response = new
                {
                    devMsg = ex.Message,
                    userMsg = ex.Message,
                    data = registration,
                };
                return BadRequest(response);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]

        public IActionResult Put(Registration registration) 
        {
            try
            {
                var row = _registrationService.UpdateService(registration);
                return Ok(row);
            }
            catch  (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
