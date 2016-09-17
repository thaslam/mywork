using System.Threading.Tasks;

namespace MyWork.Services
{
  public interface IWorkService 
  {
    Task<string> GetProjects();
    string GetTasks();
    string MarkTaskComplete();
    string SetTaskRemainingHours();
  }
}