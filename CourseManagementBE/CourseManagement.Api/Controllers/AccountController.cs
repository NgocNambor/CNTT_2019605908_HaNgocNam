using CourseManagement.Core.Entities;
using CourseManagement.Core.Exceptions;
using CourseManagement.Core.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;

namespace CourseManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        IAuthenticationService _authenticationService;

        public AccountController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] Account account)
        {
            try
            {
                var result = _authenticationService.LoginService(account);
                var refreshToken = GenerateRefreshToken();
                SetRefreshToken(refreshToken);
                return Ok(result);
            }
            catch (ValidateException ex)
            {
                var response = new
                {
                    devMsg = ex.Message,
                    userMsg = ex.Message,
                    data = account,
                };
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        private RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                TokenString = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                TokenExpires = DateTime.Now.AddDays(15),
                TokenCreated = DateTime.Now
            };
            return refreshToken;
        }


        private void SetRefreshToken(RefreshToken newRefreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.TokenExpires
            };
            Response.Cookies.Append("refreshToken", newRefreshToken.TokenString, cookieOptions);
        }
    }
}
