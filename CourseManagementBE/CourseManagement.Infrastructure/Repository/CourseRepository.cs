using CourseManagement.Core.Entities;
using CourseManagement.Core.Interfaces.Infrastructure;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using static Dapper.SqlMapper;

namespace CourseManagement.Infrastructure.Repository
{
    /// <summary>
    /// 
    /// </summary>
    public class CourseRepository : BaseRepository<Course>, ICourseRepository
    {
        public CourseRepository(IConfiguration configuration) : base(configuration) 
        {
        }

        public IEnumerable<Course> GetPaging(int pageSize, int pageIndex)
        {
            throw new NotImplementedException();
        }

        public int Insert(Course course)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("NGOCNAM")))
            {
                var sqlComand = "Proc_InsertCourse";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CourseID", course.CourseID);
                parameters.Add("@CourseName", course.CourseName);
                parameters.Add("@Duration", course.Duration);
                parameters.Add("@StartDay", course.StartDay);
                parameters.Add("@EndDay", course.EndDay);
                parameters.Add("@Description", course.Description);
                parameters.Add("@CategoryID", course.CategoryID);
                parameters.Add("@TrainingTypeID", course.TrainingTypeID);
                parameters.Add("@TrainerID", course.TrainerID);
                parameters.Add("@ExpOfyear", course.ExpOfYear);

                var rowEffect = SqlServerConnection.Execute(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return rowEffect;
            }
        }

        public int Update(Course course)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("NGOCNAM")))
            {
                var sqlComand = "Proc_UpdateCourse";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CourseID", course.CourseID);
                parameters.Add("@CourseName", course.CourseName);
                parameters.Add("@Duration", course.Duration);
                parameters.Add("@Status", course.Status);
                parameters.Add("@StartDay", course.StartDay);
                parameters.Add("@EndDay", course.EndDay);
                parameters.Add("@Description", course.Description);
                parameters.Add("@CategoryID", course.CategoryID);
                parameters.Add("@TrainingTypeID", course.TrainingTypeID);
                parameters.Add("@TrainerID", course.TrainerID);
                parameters.Add("@ExpOfyear", course.ExpOfYear);


                var rowEffect = SqlServerConnection.Execute(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return rowEffect;
            }
        }

        public object GetCourseOpen()
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("NGOCNAM")))
            {
                var sqlComand = "Proc_GetCourseOpen";
                return (SqlServerConnection.Query(sqlComand, commandType: System.Data.CommandType.StoredProcedure));
            }
        }

        public object GetCourseOpenTrainer(string trainerID)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("NGOCNAM")))
            {
                var sqlComand = "Proc_GetCourseOpenTrainer";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@TrainerID", trainerID);
                var result = SqlServerConnection.Query<object>(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return result;
            }
            
        }
    }
}
