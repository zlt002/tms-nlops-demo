# 调试body提取的脚本

# 读取文件
$content = Get-Content ".claude/epics/tms-nlops-demo/003.md" -Raw
$lines = $content -split "`n"

Write-Host "总行数: $($lines.Count)"
Write-Host "前20行:"
for ($i = 0; $i -lt [Math]::Min(20, $lines.Count); $i++) {
    Write-Host "$($i+1): $($lines[$i])"
}

Write-Host ""
Write-Host "开始提取body..."

$bodyLines = @()
$inFrontmatter = $false
$frontmatterEndFound = $false

foreach ($line in $lines) {
    $lineNum = [array]::IndexOf($lines, $line) + 1
    Write-Host "行$lineNum: '$line'"

    if ($line -eq '---') {
        Write-Host "  发现分隔符"
        if (-not $inFrontmatter) {
            Write-Host "  进入frontmatter"
            $inFrontmatter = $true
            continue
        } else {
            Write-Host "  退出frontmatter，开始收集body"
            $frontmatterEndFound = $true
            continue
        }
    }

    if ($frontmatterEndFound) {
        Write-Host "  添加到body: '$line'"
        $bodyLines += $line
    } else {
        Write-Host "  跳过（还在frontmatter中）"
    }
}

$body = $bodyLines -join "`n"
Write-Host ""
Write-Host "提取的body长度: $($body.Length)"
Write-Host "提取的body前500字符:"
Write-Host $body.Substring(0, [Math]::Min(500, $body.Length))