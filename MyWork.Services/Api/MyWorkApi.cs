using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace MyWork.Api
{
  public IWorkService MyWorkService { get; set; }

  [Route("api")]
  public class MyWorkApi: Controller
  {
    [HttpGet("")]
    public async void Get()
    {
      try
      {
          var username = "haslat1@sigi.us.selective.com";
          var password = "password";
          using (HttpClient client = new HttpClient())
          {
              client.DefaultRequestHeaders.Accept.Add(
                  new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

              client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                  Convert.ToBase64String(
                      System.Text.ASCIIEncoding.ASCII.GetBytes(
                          string.Format("{0}:{1}", username, password))));

              using (HttpResponseMessage response = client.GetAsync(
                          "https://music-pilot.visualstudio.com/DefaultCollection/_apis/build/builds").Result)
              {
                  response.EnsureSuccessStatusCode();
                  string responseBody = await response.Content.ReadAsStringAsync();
                  Console.WriteLine(responseBody);
              }
          }
      }
      catch (Exception ex)
      {
          Console.WriteLine(ex.ToString());
      }
    } 

    [HttpGet("{id}")]
    public async Task<string> Get(int id)
    {
      return "Task Test";
    }
  }

}