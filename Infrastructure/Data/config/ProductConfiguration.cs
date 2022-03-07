using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.config
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p=> p.Id).IsRequired();
            builder.Property(p=>p.Name).IsRequired().HasMaxLength(100); 
            builder.Property(p=>p.Description).IsRequired().HasMaxLength(255); 
            builder.Property(p=>p.Price).HasColumnType("decimal(18,2)");
            builder.Property(p=>p.PictureUrl).IsRequired() ; 
            builder.HasOne(pk=>pk.ProductBrand).WithMany()
            .HasForeignKey(fk=>fk.ProductBrandId);
            builder.HasOne(pk=>pk.ProductType).WithMany()
            .HasForeignKey(fk=>fk.ProductTypeId);


        }
    }
}