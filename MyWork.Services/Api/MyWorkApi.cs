using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyWork.Services;

namespace MyWork.Api
{
  [Route("api")]
  public class MyWorkApi: Controller
  {
    public IWorkService MyWorkService { get; set; }

    [HttpGet("")]
    public async Task<string> Get()
    {
        if (MyWorkService == null) return null;

        return await MyWorkService.GetProjects();
    } 

    [HttpGet("{id}")]
    public async Task<string> Get(int id)
    {
      return "Task Test";
    }
  }

}