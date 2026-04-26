using Microsoft.EntityFrameworkCore;
using AdditiveIndex.Api.Models.Entities;

namespace AdditiveIndex.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Additive> Additives => Set<Additive>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<AdditiveProduct> AdditiveProducts => Set<AdditiveProduct>();
    public DbSet<Discussion> Discussions => Set<Discussion>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Additive>(entity =>
        {
            entity.HasKey(a => a.Id);
            entity.HasIndex(a => a.ECode).IsUnique();
            entity.Property(a => a.Name).IsRequired().HasMaxLength(200);
            entity.Property(a => a.ECode).IsRequired().HasMaxLength(20);
            entity.Property(a => a.RiskLevel)
                  .HasConversion<string>()
                  .HasMaxLength(20);
            entity.Property(a => a.Source).HasMaxLength(500);
            entity.Property(a => a.Description).HasMaxLength(2000);
            entity.Property(a => a.ScientificReferences).HasMaxLength(4000);
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.HasIndex(p => p.Barcode).IsUnique();
            entity.Property(p => p.Name).IsRequired().HasMaxLength(300);
            entity.Property(p => p.Barcode).IsRequired().HasMaxLength(50);
            entity.Property(p => p.Brand).HasMaxLength(200);
            entity.Property(p => p.ImageUrl).HasMaxLength(1000);
        });

        modelBuilder.Entity<AdditiveProduct>(entity =>
        {
            entity.HasKey(ap => new { ap.AdditiveId, ap.ProductId });
            entity.HasOne(ap => ap.Additive)
                  .WithMany(a => a.AdditiveProducts)
                  .HasForeignKey(ap => ap.AdditiveId);
            entity.HasOne(ap => ap.Product)
                  .WithMany(p => p.AdditiveProducts)
                  .HasForeignKey(ap => ap.ProductId);
        });

        modelBuilder.Entity<Discussion>(entity =>
        {
            entity.HasKey(d => d.Id);
            entity.Property(d => d.Username).IsRequired().HasMaxLength(100);
            entity.Property(d => d.Message).IsRequired().HasMaxLength(2000);
        });
    }
}
