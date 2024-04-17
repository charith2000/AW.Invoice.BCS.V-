using Application.StockDispatchRepo;
using Application.StockRepo;
using Domain.Custom;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AW.Invoice.BCS.UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockDispatchController : ControllerBase
    {
        private readonly IStockDispatchRepository _stockDispatchRepository;

        public StockDispatchController(IStockDispatchRepository stockDispatchRepository)
        {
            _stockDispatchRepository = stockDispatchRepository;
        }

        [HttpPost]
        public async Task<ActionResult<StockDispatchDetails>> AddStockDispatch(StockDispatchDetails stockDispatchDetails)
        {
            var stockDispatchFromService = _stockDispatchRepository.CreateStockDispatch(stockDispatchDetails);
            return Ok(stockDispatchFromService);
        }

        [HttpGet]
        public async Task<ActionResult<StockDispatchDetails>> GetAll()
        {
            var stockDispatchFromService = _stockDispatchRepository.GetAllStockDispatchDetails();
            return Ok(stockDispatchFromService);
        }

        [HttpGet("stockDispatchId")]
        public async Task<ActionResult<StockDispatchDetails>> GetBySDID(int stockDispatchId)
        {
            var stockDispatchFromService = _stockDispatchRepository.GetStockDispatchBySDId(stockDispatchId);
            return Ok(stockDispatchFromService);
        }
    }
}
