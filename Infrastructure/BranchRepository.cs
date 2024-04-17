using Application.BranchRepo;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class BranchRepository : IBranchRepository
    {
        private readonly DataContext _dataContext;

        public BranchRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public Branch CreateBranch(Branch branch)
        {
            _dataContext.Branches.Add(branch);
            _dataContext.SaveChanges();
            return branch;
        }

        public List<Branch> GetAllBranches()
        {
            var findBranches = _dataContext.Branches.ToList();
            return findBranches;
        }

        public Branch GetBranchByBCode(int brancCode)
        {
            var findBranch = _dataContext.Branches.Find(brancCode);

            if (findBranch == null)
            {
                return null;
            }

            return findBranch;
        }

        public Branch UpdateBranch(Branch branch)
        {
            var findBranch = _dataContext.Branches.Find(branch.BranchCode);
            if (findBranch == null) {
                return null;
            }

            findBranch.Name = branch.Name;
            findBranch.Address = branch.Address;
            findBranch.TelephoneNo = branch.TelephoneNo;
            findBranch.Status = branch.Status;
            findBranch.CreatedBy = branch.CreatedBy;
            findBranch.CreatedDate = branch.CreatedDate;

            _dataContext.SaveChanges();
            return findBranch;

        }
    }
}
