using CourseManagement.Core.Entities;
using CourseManagement.Core.Exceptions;
using CourseManagement.Core.Interfaces.Infrastructure;
using CourseManagement.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Services
{
    public class RegistrationService:IRegistrationService
    {
        IRegistrationRepository _registrationRepository;
        public RegistrationService(IRegistrationRepository registrationRepository)
        {
            _registrationRepository = registrationRepository;
        }

        public int InsertService(Registration registration)
        {
            if (!string.IsNullOrEmpty(_registrationRepository.IsDuplicated(registration.EmployeeID, registration.CourseID)))
            {
                throw new ValidateException("Bạn đã đăng ký khóa học này rồi!");
            }
            var rowEffect = _registrationRepository.Insert(registration);
            return rowEffect;
        }

        public int UpdateService(Registration registration)
        {
            var rowEffect = _registrationRepository.Update(registration);
            return rowEffect;
        }
    }
}
