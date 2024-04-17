using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.BranchRepo
{
    public interface IBranchRepository
    {
        List<Branch> GetAllBranches();

        Branch CreateBranch(Branch branch);

        Branch UpdateBranch(Branch branch);

        Branch GetBranchByBCode(int brancCode);
    }
}
