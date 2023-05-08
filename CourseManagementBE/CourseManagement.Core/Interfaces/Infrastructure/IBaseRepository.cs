using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Infrastructure
{
    public interface IBaseRepository<Entity>
    {
        IEnumerable<Entity> GetAll();

        Entity GetByID(string ID);

        object GetSearchAndPaging(int? pageSize, int? pageNumber, string? filter);   

    }
}
