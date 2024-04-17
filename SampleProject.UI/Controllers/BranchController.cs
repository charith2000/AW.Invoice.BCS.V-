using Application.BranchRepo;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AW.Invoice.BCS.UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchController : ControllerBase
    {
        private readonly IBranchService _branchService;

        public BranchController(IBranchService branchService)
        {
            _branchService = branchService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Branch>>> GetAll()
        {
            var branchesFromService = _branchService.GetAllBranches();
            return Ok(branchesFromService);
        }

        [HttpPost]
        public async Task<ActionResult<Branch>> AddBranch(Branch branch)
        {
            var branchFromService = _branchService.CreateBranch(branch);
            return Ok(branchFromService);
        }

        [HttpPut]
        public async Task<ActionResult<Branch>> UpdateBranch(Branch branch)
        {
            var branchFromService= _branchService.UpdateBranch(branch);
            return Ok(branchFromService);
        }

        [HttpGet("branchCode")]
        public async Task<ActionResult<Branch>> GetBranchByBCode(int branchCode) {
            var branchFromService = _branchService.GetBranchByBCode(branchCode);
            return Ok(branchFromService);
        }
    }
}
