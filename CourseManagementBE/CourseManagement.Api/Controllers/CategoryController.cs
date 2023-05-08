using CourseManagement.Core.Interfaces.Infrastructure;
using CourseManagement.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public IActionResult GetAll() 
        {
            var categories = _categoryRepository.GetAll();

            return Ok(categories);
        }

        [HttpGet("categoryID")]
        public IActionResult GetByID(int categoryID) 
        {
            var category = _categoryRepository.GetByID(categoryID.ToString());

            return Ok(category);
        }
    }
}
