using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Core.Specifications
{
    public class BaseSpecificaton<T> : ISpecification<T>
    {
        public BaseSpecificaton()
        {
        }

        public BaseSpecificaton(Expression<Func<T, bool>> criteria)
        {
            Criteria = criteria;
            
        }

        public Expression<Func<T, bool>> Criteria {get;}

        public List<Expression<Func<T, object>>> Include {get;} =
            new List<Expression<Func<T, object>>>() ;

        public Expression<Func<T, object>> OrderBy { get ; private set ; }


        public Expression<Func<T, object>> OrderByDescending { get ; private set ; }

        public int Take  { get ; private set ; }

        public int Skip  { get ; private set ; }

        public bool IsPagingEnabled { get ; private set ; }


        protected void AddInclude(Expression<Func<T, object>> includeExpression)
        {
            Include.Add(includeExpression);
        }

        protected void AddOrederBy(Expression<Func<T, object>> orderByExpression)
        {
            OrderBy = orderByExpression ; 
        }

        protected void AddOrederByDescendig(Expression<Func<T, object>> orderByDesExpression)
        {
            OrderByDescending = orderByDesExpression ; 
        }

        protected void ApplyPaging(int skip , int take){
            Skip = skip;
            Take = take; 
            IsPagingEnabled = true ; 

        }

    }

}