using System.Threading.Tasks;

namespace MyWork.Services
{
  public interface IWorkService 
  {
    Task<string> GetProjects();
    Task<string> GetTasks();
    Task<string> GetTasks(string projectName);
    Task<string> MarkTaskComplete();
    Task<string> SetTaskRemainingHours();
  }
}