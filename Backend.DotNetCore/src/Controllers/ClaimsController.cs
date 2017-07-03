namespace WebApiValues.Controllers
{
    using System.Linq;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    public class ClaimsController : Controller
    {
        // GET api/values
        [Authorize]
        [HttpGet]
        public object Get()
        {
            return User.Claims.Select(x =>
                new
                    {
                        Type = x.Type,
                        Value = x.Value
                    }
            );
        }

    }
}