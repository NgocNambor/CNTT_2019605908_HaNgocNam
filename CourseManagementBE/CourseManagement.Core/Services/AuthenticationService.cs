using CourseManagement.Core.Entities;
using CourseManagement.Core.Exceptions;
using CourseManagement.Core.Interfaces.Infrastructure;
using CourseManagement.Core.Interfaces.Services;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        IAuthenticationRepository _authenticationRepository;
        Jwt _jwt;

        public AuthenticationService(IAuthenticationRepository authenticationRepository, IOptionsMonitor<Jwt> optionsMonitor)
        {
            _authenticationRepository = authenticationRepository;
            _jwt = optionsMonitor.CurrentValue;
        }

        public string CreateToken(Account account)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, account.Username),
                new Claim(ClaimTypes.Role, account.RoleName)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_jwt.Key));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            string jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        public string GenerateSHA512(string input)
        {
            using (SHA512 sha512Hash = SHA512.Create())
            {
                //Chuyển string sang chuỗi byte
                byte[] inputBytes = Encoding.UTF8.GetBytes(input);

                byte[] hashBytes = sha512Hash.ComputeHash(inputBytes);

                StringBuilder sb = new StringBuilder();

                for (int i = 0; i < hashBytes.Length; i++)
                {
                    sb.Append(hashBytes[i].ToString("x2"));
                }

                return sb.ToString();
            }
        }

        public object LoginService(Account account)
        {

            Account user = _authenticationRepository.GetAccount(account.Username, account.Password);
            if( user != null )
            {
                var tokenDesc = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new []
                    {
                        new Claim(ClaimTypes.Name, user.Username),
                        new Claim(ClaimTypes.Role, user.RoleName.Trim())
                    }),

                    Expires = DateTime.Now.AddHours(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key)), SecurityAlgorithms.HmacSha512Signature)
                };

                var token = new JwtSecurityTokenHandler().CreateToken(tokenDesc);

                var jwt = new JwtSecurityTokenHandler().WriteToken(token);

                return new
                {
                    token = jwt
                };

            }
            else
            {
                throw new ValidateException("Tài khoản hoặc mật khẩu không chính xác!");
            }
        }
    }
}
