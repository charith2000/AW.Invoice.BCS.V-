using Application.CustomRepos;
using Domain.Custom;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AW.Invoice.BCS.UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductStockController : ControllerBase
    {
        private readonly IProductStockService _productStockService;

        public ProductStockController(IProductStockService productStockService)
        {
            _productStockService = productStockService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductStockDetails>>> Get()
        {
            var productStockFromService = _productStockService.GetAll().ToList();
            return productStockFromService;
        }

        [HttpGet("barcode")]
        public async Task<ActionResult<ProductStockDetails>> GetByBarCode(string barcode)
        {
            var productStockFromService = _productStockService.GetProductStockByBarCode(barcode);
            return productStockFromService;
        }
    }
}
