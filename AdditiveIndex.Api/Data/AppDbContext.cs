using Microsoft.EntityFrameworkCore;
using AdditiveIndex.Api.Models.Entities;

namespace AdditiveIndex.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Additive> Additives => Set<Additive>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<AdditiveProduct> AdditiveProducts => Set<AdditiveProduct>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Reference> References => Set<Reference>();
    public DbSet<Discussion> Discussions => Set<Discussion>();

    // User & Auth
    public DbSet<User> Users => Set<User>();
    public DbSet<Comment> Comments => Set<Comment>();
    public DbSet<BlogPost> BlogPosts => Set<BlogPost>();
    public DbSet<BlogCategory> BlogCategories => Set<BlogCategory>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(c => c.Id);
            entity.Property(c => c.Name).IsRequired().HasMaxLength(200);
            entity.Property(c => c.Description).HasMaxLength(1000);
            entity.Property(c => c.ECodeRange).HasMaxLength(50);
        });

        modelBuilder.Entity<Additive>(entity =>
        {
            entity.HasKey(a => a.Id);
            entity.HasIndex(a => a.ECode).IsUnique();
            entity.Property(a => a.ECode).IsRequired().HasMaxLength(20);
            entity.Property(a => a.Name).IsRequired().HasMaxLength(200);
            entity.Property(a => a.AlternativeNames).HasMaxLength(500);
            entity.Property(a => a.Description).HasMaxLength(2000);
            entity.Property(a => a.Function).HasMaxLength(200);
            entity.Property(a => a.RiskLevel)
                  .HasConversion<string>()
                  .HasMaxLength(20);
            entity.Property(a => a.Source).HasMaxLength(200);
            entity.Property(a => a.SourceDetails).HasMaxLength(500);
            entity.Property(a => a.AdiBySafety).HasMaxLength(200);
            entity.Property(a => a.RegulatoryStatus).HasMaxLength(500);

            entity.HasOne(a => a.Category)
                  .WithMany(c => c.Additives)
                  .HasForeignKey(a => a.CategoryId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<Reference>(entity =>
        {
            entity.HasKey(r => r.Id);
            entity.Property(r => r.Title).IsRequired().HasMaxLength(500);
            entity.Property(r => r.Authors).HasMaxLength(500);
            entity.Property(r => r.Journal).HasMaxLength(300);
            entity.Property(r => r.Doi).HasMaxLength(100);
            entity.Property(r => r.Url).HasMaxLength(1000);
            entity.Property(r => r.Source).HasMaxLength(100);
            entity.Property(r => r.Summary).HasMaxLength(2000);

            entity.HasOne(r => r.Additive)
                  .WithMany(a => a.References)
                  .HasForeignKey(r => r.AdditiveId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.Name).IsRequired().HasMaxLength(300);
            entity.Property(p => p.Brand).IsRequired().HasMaxLength(200);
            entity.Property(p => p.ProductCategory).HasMaxLength(200);
            entity.Property(p => p.Barcode).HasMaxLength(50);
            entity.Property(p => p.Description).HasMaxLength(2000);
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

        // User & Auth Configuration
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.Id);
            entity.HasIndex(u => u.Email).IsUnique();
            entity.HasIndex(u => u.Username).IsUnique();
            entity.Property(u => u.Email).IsRequired().HasMaxLength(255);
            entity.Property(u => u.Username).IsRequired().HasMaxLength(50);
            entity.Property(u => u.PasswordHash).IsRequired().HasMaxLength(255);
            entity.Property(u => u.Role)
                  .HasConversion<string>()
                  .HasMaxLength(20);
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(c => c.Id);
            entity.Property(c => c.Content).IsRequired().HasMaxLength(2000);

            entity.HasOne(c => c.User)
                  .WithMany(u => u.Comments)
                  .HasForeignKey(c => c.UserId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(c => c.Additive)
                  .WithMany()
                  .HasForeignKey(c => c.AdditiveId)
                  .OnDelete(DeleteBehavior.SetNull);

            entity.HasOne(c => c.Product)
                  .WithMany()
                  .HasForeignKey(c => c.ProductId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<BlogPost>(entity =>
        {
            entity.HasKey(b => b.Id);
            entity.HasIndex(b => b.Slug).IsUnique();
            entity.Property(b => b.Title).IsRequired().HasMaxLength(200);
            entity.Property(b => b.Slug).IsRequired().HasMaxLength(200);
            entity.Property(b => b.Content).IsRequired();
            entity.Property(b => b.Summary).HasMaxLength(500);
            entity.Property(b => b.FeaturedImage).HasMaxLength(1000);

            entity.HasOne(b => b.Author)
                  .WithMany(u => u.BlogPosts)
                  .HasForeignKey(b => b.AuthorId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<BlogCategory>(entity =>
        {
            entity.HasKey(bc => bc.Id);
            entity.HasIndex(bc => bc.Slug).IsUnique();
            entity.Property(bc => bc.Name).IsRequired().HasMaxLength(100);
            entity.Property(bc => bc.Slug).IsRequired().HasMaxLength(100);
            entity.Property(bc => bc.Description).HasMaxLength(500);
        });
    }
}
