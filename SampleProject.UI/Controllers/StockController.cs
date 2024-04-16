using Application.StockRepo;
using Domain;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AW.Invoice.BCS.UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly IStockService _stockService;

        public StockController(IStockService stockService)
        {
            _stockService = stockService;
        }

        [HttpGet]
        public ActionResult<Stock> Get()
        {
            var stockFromService = _stockService.GetStocks();
            return Ok(stockFromService);
        }

        [HttpPost]
        public ActionResult AddStock(Stock stock)
        {
            var stockFromService = _stockService.CreateStock(stock);
            return Ok(stockFromService);
        }

        [HttpPut]
        public ActionResult UpdateStock(Stock stock)
        {
            var stockFromService = _stockService.UpdateStock(stock);
            return Ok(stockFromService);
        }

        [HttpGet("{stockId}")]
        public ActionResult<Stock> GetStockById(int stockId) 
        { 
            var stockFromService = _stockService.GetStockById(stockId);
            return Ok(stockFromService);
        }

        [HttpGet("barcode/{barCode}")]
        public ActionResult<Stock> GetStockByBarCode(string barCode)
        {
            var stockFromService = _stockService.GetStockByBarCode(barCode);
            return Ok(stockFromService);
        }

    }
}
