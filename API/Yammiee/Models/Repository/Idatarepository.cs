namespace Yammiee.Models.Repository
{
    public interface Idatarepository<TEntity> //TEntity can be any model class
    {
        bool Register(TEntity entity);
        List<TEntity> GetAll();
        bool Login(TEntity entity);
        bool DeleteByEmail(string email);

    

    }


}
