using Application.ProductRepo;
using Domain;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AW.Invoice.BCS.UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> Get()
        {
            var productsFromService = _productService.GetAllProducts();
            return Ok(productsFromService);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> AddProduct(Product product)
        {
            var productFromService = _productService.CreateProduct(product);
            return Ok(productFromService);
        }

        [HttpPut]
        public async Task<ActionResult <Product>> UpdateProduct(Product product)
        {
            var productFromService = _productService.Updateproduct(product);
            return Ok(productFromService);
        }

        [HttpGet("{barCode}")]
        public async Task<ActionResult<Product>> GetProduct(string barCode)
        {
            var productFromService = _productService.GetProductByBarCode(barCode);
            return Ok(productFromService);
        }

    }
}
