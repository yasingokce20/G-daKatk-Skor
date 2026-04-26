using AdditiveIndex.Api.Models.Entities;

namespace AdditiveIndex.Api.Data;

public static class SeedData
{
    public static async Task InitializeAsync(AppDbContext context)
    {
        if (context.Additives.Any()) return;

        var additives = new List<Additive>
        {
            new()
            {
                Name = "Curcumin",
                ECode = "E100",
                RiskLevel = RiskLevel.None,
                Source = "Natural (turmeric plant)",
                Description = "A bright yellow natural pigment used as a coloring agent.",
                ScientificReferences = "JECFA, EFSA 2017",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new()
            {
                Name = "Tartrazine",
                ECode = "E102",
                RiskLevel = RiskLevel.Medium,
                Source = "Synthetic azo dye",
                Description = "A synthetic lemon-yellow azo dye used in foods and pharmaceuticals.",
                ScientificReferences = "EFSA re-evaluation 2016; potential links to hyperactivity in children.",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new()
            {
                Name = "Sunset Yellow FCF",
                ECode = "E110",
                RiskLevel = RiskLevel.Medium,
                Source = "Synthetic azo dye",
                Description = "An orange-yellow synthetic dye used in soft drinks, confectionery and desserts.",
                ScientificReferences = "EFSA 2014; some studies suggest hypersensitivity reactions.",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new()
            {
                Name = "Cochineal (Carminic acid)",
                ECode = "E120",
                RiskLevel = RiskLevel.Low,
                Source = "Natural (insects: Dactylopius coccus)",
                Description = "A red colorant extracted from cochineal insects.",
                ScientificReferences = "FDA GRAS; rare allergic reactions reported.",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new()
            {
                Name = "Potassium Sorbate",
                ECode = "E202",
                RiskLevel = RiskLevel.Low,
                Source = "Synthetic salt of sorbic acid",
                Description = "A widely used preservative to inhibit mold and yeast growth.",
                ScientificReferences = "JECFA ADI 25 mg/kg bw/day; generally recognized as safe.",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new()
            {
                Name = "Sodium Benzoate",
                ECode = "E211",
                RiskLevel = RiskLevel.Low,
                Source = "Synthetic (benzoic acid salt)",
                Description = "A common food preservative with antimicrobial properties.",
                ScientificReferences = "EFSA 2016; caution with ascorbic acid combination (benzene formation).",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new()
            {
                Name = "Aspartame",
                ECode = "E951",
                RiskLevel = RiskLevel.Low,
                Source = "Synthetic dipeptide",
                Description = "A low-calorie artificial sweetener approximately 200 times sweeter than sugar.",
                ScientificReferences = "IARC classified as 'possibly carcinogenic' (Group 2B) in 2023; EFSA 2023 re-confirmed safe at current ADI.",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new()
            {
                Name = "Monosodium Glutamate (MSG)",
                ECode = "E621",
                RiskLevel = RiskLevel.None,
                Source = "Natural fermentation / synthetic",
                Description = "A flavor enhancer that adds umami taste to foods.",
                ScientificReferences = "JECFA; FASEB 1995; safe for general population.",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        };

        await context.Additives.AddRangeAsync(additives);
        await context.SaveChangesAsync();
    }
}
