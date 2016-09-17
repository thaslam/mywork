using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace MyWork.Services
{
  public class WorkService : IWorkService
  {
      public async Task<string> GetProjects()
      {
        try
        {
            var username = "haslat1@sigi.us.selective.com";
            var password = "pgbuttsw6qx76vm5d4v6lw5gedoxkbiieuzmnsgkr2455mte4rda";
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Add(
                    new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                    Convert.ToBase64String(
                        System.Text.ASCIIEncoding.ASCII.GetBytes(
                            string.Format("{0}:{1}", username, password))));

                using (HttpResponseMessage response = client.GetAsync(
                            "https://music-pilot.visualstudio.com/DefaultCollection/_apis/projects/api-version=2.0").Result)
                {
                    response.EnsureSuccessStatusCode();
                    string responseBody = await response.Content.ReadAsStringAsync();
                    return responseBody;
                    //Console.WriteLine(responseBody);
                }
            }
        }
        catch (Exception ex)
        {
            //Console.WriteLine(ex.ToString());
            throw ex;
        }
      }

      public string GetTasks()
      {
          throw new NotImplementedException();
      }

      public string MarkTaskComplete()
      {
          throw new NotImplementedException();
      }

      public string SetTaskRemainingHours()
      {
          throw new NotImplementedException();
      }
  }
}