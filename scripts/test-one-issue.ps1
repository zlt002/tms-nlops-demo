# 测试创建一个issue

# 读取文件
$content = Get-Content ".claude/epics/tms-nlops-demo/003.md" -Raw

# 提取title
$titleMatch = [regex]::Match($content, 'title:\s*"([^"]+)"')
$title = $titleMatch.Groups[1].Value

# 提取body
$lines = $content -split "`n"
$bodyLines = @()
$inFrontmatter = $false
$frontmatterEndFound = $false

foreach ($line in $lines) {
    if ($line -eq '---') {
        if (-not $inFrontmatter) {
            $inFrontmatter = $true
            continue
        } else {
            $frontmatterEndFound = $true
            continue
        }
    }
    if ($frontmatterEndFound) {
        $bodyLines += $line
    }
}

$body = $bodyLines -join "`n"

Write-Host "Title: $title"
Write-Host "Body长度: $($body.Length)"
Write-Host "前几行body:"
for ($i = 0; $i -lt [Math]::Min(5, $bodyLines.Length); $i++) {
    Write-Host "  $($bodyLines[$i])"
}
Write-Host "创建issue..."

# 创建issue（使用简单的body测试）
$simpleBody = "This is a test issue for TMS NL-Ops demo system task 003."
$result = gh sub-issue create --title $title --body $simpleBody --parent 1 --label enhancement
Write-Host "结果: $result"