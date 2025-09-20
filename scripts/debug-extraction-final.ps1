# 最终调试body提取的脚本

# 读取文件
$content = Get-Content ".claude/epics/tms-nlops-demo/003.md" -Raw
Write-Host "原始文件内容长度: $($content.Length)"

# 使用不同的分割方式
$lines1 = $content -split "`r`n"  # Windows换行
$lines2 = $content -split "`n"     # Unix换行

Write-Host "使用`r`n分割的行数: $($lines1.Count)"
Write-Host "使用`n分割的行数: $($lines2.Count)"

# 使用Unix换行方式
$lines = $content -split "`n"
$bodyLines = @()
$inFrontmatter = $false
$frontmatterEndFound = $false

Write-Host "逐行分析:"
for ($i = 0; $i -lt [Math]::Min(20, $lines.Count); $i++) {
    $line = $lines[$i]
    Write-Host "行$($i+1): '$line'"

    if ($line -eq '---') {
        Write-Host "  发现分隔符"
        if (-not $inFrontmatter) {
            $inFrontmatter = $true
            Write-Host "  进入frontmatter"
            continue
        } else {
            $frontmatterEndFound = $true
            Write-Host "  退出frontmatter"
            continue
        }
    }

    if ($frontmatterEndFound) {
        Write-Host "  添加到body: '$line'"
        $bodyLines += $line
    } else {
        Write-Host "  跳过（frontmatter中）"
    }
}

$body = $bodyLines -join "`n"
Write-Host ""
Write-Host "最终body长度: $($body.Length)"
Write-Host "body内容:"
Write-Host "----------------------------------------"
Write-Host $body
Write-Host "----------------------------------------"

# 检查文件编码
$fileInfo = Get-Item ".claude/epics/tms-nlops-demo/003.md"
Write-Host ""
Write-Host "文件信息:"
Write-Host "大小: $($fileInfo.Length) 字节"
Write-Host "创建时间: $($fileInfo.CreationTime)"