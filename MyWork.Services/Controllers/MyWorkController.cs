using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyWork.Services;

namespace MyWork.Services.Controllers
{
  [Route("api/v1")]
  public class MyWorkController: Controller
  {
    public MyWorkController(IWorkService workService)
    {
        this.MyWorkService = workService;
    }
    private IWorkService MyWorkService { get; set; }

    [HttpGet]
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