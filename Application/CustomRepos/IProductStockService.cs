using Domain.Custom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CustomRepos
{
    public interface IProductStockService
    {
        List<ProductStockDetails> GetAll();

        ProductStockDetails GetProductStockByBarCode(string barCode);

    }
}
