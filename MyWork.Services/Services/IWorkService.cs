using System.Threading.Tasks;

namespace MyWork.Services
{
  interface IWorkService 
  {
    Task<string> GetProjects();
    string GetTasks();
    string MarkTaskComplete();
    string SetTaskRemainingHours();
  }
}