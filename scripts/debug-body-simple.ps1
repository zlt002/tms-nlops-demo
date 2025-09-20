# 简化的body提取调试脚本

# 读取文件
$content = Get-Content ".claude/epics/tms-nlops-demo/003.md" -Raw
$lines = $content -split "`n"

Write-Host "总行数: $($lines.Count)"
Write-Host "前15行:"
for ($i = 0; $i -lt [Math]::Min(15, $lines.Count); $i++) {
    Write-Host "$($i+1): $($lines[$i])"
}

Write-Host ""
Write-Host "开始提取body..."

$bodyLines = @()
$inFrontmatter = $false
$frontmatterEndFound = $false

for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]

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
Write-Host ""
Write-Host "提取的body长度: $($body.Length)"
Write-Host "提取的body前200字符:"
if ($body.Length -gt 0) {
    Write-Host $body.Substring(0, [Math]::Min(200, $body.Length))
} else {
    Write-Host "Body为空"
}