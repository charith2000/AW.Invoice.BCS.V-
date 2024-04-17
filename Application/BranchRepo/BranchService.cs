using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.BranchRepo
{
    public class BranchService : IBranchService
    {
        private readonly IBranchRepository _branchRepository;

        public BranchService(IBranchRepository branchRepository)
        {
            _branchRepository = branchRepository;
        }

        public Branch CreateBranch(Branch branch)
        {
            _branchRepository.CreateBranch(branch);
            return branch;
        }

        public List<Branch> GetAllBranches()
        {
            var branches = _branchRepository.GetAllBranches();
            return branches;
        }

        public Branch GetBranchByBCode(int brancCode)
        {
            var branch = _branchRepository.GetBranchByBCode(brancCode);
            return branch;
        }

        public Branch UpdateBranch(Branch branch)
        {
            _branchRepository.UpdateBranch(branch);
            return branch;  
        }
    }
}
