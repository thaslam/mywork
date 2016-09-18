using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace MyWork.Services
{
  public class WorkItemResponse
  {
    [JsonProperty("workItems")]
    public List<WorkItem> WorkItems { get; set; }
  }

  public class WorkItem
  {
    [JsonProperty("id")]
    public string Id { get; set; }

    [JsonProperty("url")]
    public string Url { get; set; }
  }
}