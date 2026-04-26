using Microsoft.EntityFrameworkCore;
using AdditiveIndex.Api.Models.Entities;

namespace AdditiveIndex.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Additive> Additives => Set<Additive>();

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
    }
}
