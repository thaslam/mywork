using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace MyWork.Services
{
    public class WorkService : IWorkService
    {
        const string URI_PREFIX = "https://music-pilot.visualstudio.com/DefaultCollection";
        const string API_VERSION = "1.0";

        public async Task<string> GetProjects()
        {
            return await this.GetHttp(string.Format("{0}/_apis/projects?api-version={1}", URI_PREFIX, API_VERSION));
        }

        public async Task<string> GetTasks(string projectName)
        {
            var content = new StringContent(
                "{\"query\": " +
                "\"Select [System.Id], [System.Title], [System.State] " +
                "From WorkItems Where [System.WorkItemType] = 'Task' AND [State] <> 'Closed' AND [State] <> 'Removed' And [Assigned To] = @Me " +
                "order by [Microsoft.VSTS.Common.Priority] asc, [System.CreatedDate] desc\"}", 
                System.Text.Encoding.UTF8, "application/json");

            return await this.PostHttp(string.Format("{0}/{1}/_apis/wit/wiql?api-version={2}", URI_PREFIX, projectName, API_VERSION), content);
        }

        public async Task<string> MarkTaskComplete()
        {
            throw new NotImplementedException();
        }

        public async Task<string> SetTaskRemainingHours()
        {
            throw new NotImplementedException();
        }
        
        private HttpClient CreateClient() 
        {
            // TODO: refactor the hardcoded username and token out
            var username = "haslat1@sigi.us.selective.com";
            var password = "";
            
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Add(
                new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                Convert.ToBase64String(
                    System.Text.ASCIIEncoding.ASCII.GetBytes(
                        string.Format("{0}:{1}", username, password))));
            return client;
        }
        private async Task<string> GetHttp(string uri) 
        {
            try
            {
                using (var client = this.CreateClient())
                {
                    using (HttpResponseMessage response = client.GetAsync(
                            uri).Result)
                        {
                            response.EnsureSuccessStatusCode();
                            string responseBody = await response.Content.ReadAsStringAsync();
                            return responseBody;
                        }
                }
            }
            catch (Exception ex)
            {
                // TODO: do something with this error
                return string.Format("{0}{1}", uri, ex.ToString());
            }
        }
         private async Task<string> PostHttp(string uri, HttpContent content) 
        {
            try
            {
                using (var client = this.CreateClient())
                {
                    using (HttpResponseMessage response = client.PostAsync(
                            uri, content).Result)
                        {
                            response.EnsureSuccessStatusCode();
                            string responseBody = await response.Content.ReadAsStringAsync();
                            return responseBody;
                        }
                }
            }
            catch (Exception ex)
            {
                // TODO: do something with this error
                return string.Format("{0}{1}", uri, ex.ToString());
            }
        }
    }
}