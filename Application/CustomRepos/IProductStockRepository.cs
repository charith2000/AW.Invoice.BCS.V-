using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Custom;

namespace Application.CustomRepos
{
    public interface IProductStockRepository
    {
        List<ProductStockDetails> GetAll();

        ProductStockDetails GetProductStockByBarCode(string barCode);

    }
}
