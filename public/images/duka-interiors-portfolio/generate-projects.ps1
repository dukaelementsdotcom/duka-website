# generate-projects.ps1
$portfolioPath = "C:\Users\seand\Desktop\WEBSITE\my-website\public\images\duka-interiors-portfolio"
$outputPath = "C:\Users\seand\Desktop\WEBSITE\my-website\public\data\projects.json"

# Ensure output directory exists
$dataDir = [System.IO.Path]::GetDirectoryName($outputPath)
if (!(Test-Path $dataDir)) {
    New-Item -ItemType Directory -Path $dataDir | Out-Null
}

# Get all subfolders (projects)
$projectFolders = Get-ChildItem -Path $portfolioPath -Directory

$projects = @()

foreach ($folder in $projectFolders) {
    $slug = $folder.Name

    # Clean title from slug
    $title = $slug -replace '-', ' '
    $title = (Get-Culture).TextInfo.ToTitleCase($title)

    # Infer location from slug
    $location = "Addis Ababa"
    if ($slug -like "*bole*") { $location = "Bole" }
    elseif ($slug -like "*kazanchis*") { $location = "Kazanchis" }
    elseif ($slug -like "*tafo*") { $location = "Tafo" }
    elseif ($slug -like "*ayat*") { $location = "Ayat" }
    elseif ($slug -like "*merkato*") { $location = "Merkato" }
    elseif ($slug -like "*lideta*") { $location = "Lideta" }

    # Get first valid image
    $imageFile = Get-ChildItem -Path $folder.FullName -File |
        Where-Object { $_.Extension -match '\.(webp|jpg|jpeg|png)$' } |
        Select-Object -First 1

    if ($null -eq $imageFile) {
        Write-Host "⚠️  No image found in folder: $($folder.Name)" -ForegroundColor Yellow
        continue
    }

    $imageUrl = "/images/duka-interiors-portfolio/$($folder.Name)/$($imageFile.Name)"

    # Build services list based on keywords
    $services = @("Design + Build")
    if ($slug -match "office|reception|lobby|workspace") {
        $services += "Interior Architecture"
    }
    if ($slug -match "retail|shop|boutique|showroom") {
        $services += "Retail Interiors"
    }
    if ($slug -match "hospital|clinic|medical") {
        $services += "Healthcare Interiors"
    }
    if ($slug -match "gym|fitness|spa") {
        $services += "Fitness Center Design"
    }
    if ($slug -match "residence|apartment|home") {
        $services += "Residential Interiors"
    }
    if ($slug -match "branding|signage|wall") {
        $services += "Branding Environments"
    }

    # Description
    $description = "A premium interior design project by Duka Interiors in $location."

    $project = [PSCustomObject]@{
        slug        = $slug
        title       = $title
        location    = $location
        year        = 2025
        services    = $services
        image       = $imageUrl
        description = $description
    }

    $projects += $project
}

# Convert to JSON and save
$json = $projects | ConvertTo-Json -Depth 5
[System.IO.File]::WriteAllLines($outputPath, $json, [System.Text.Encoding]::UTF8)

Write-Host "SUCCESS: projects.json generated at: $outputPath" -ForegroundColor Green
Write-Host "INFO: Total projects: $($projects.Count)" -ForegroundColor Cyan