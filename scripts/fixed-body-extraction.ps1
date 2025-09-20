# 修复的body提取脚本

# 读取文件
$content = Get-Content ".claude/epics/tms-nlops-demo/003.md" -Raw
$lines = $content -split "`n"

Write-Host "总行数: $($lines.Count)"

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
            # 不要continue，因为下一个line就是要开始的内容
            continue
        }
    }

    if ($frontmatterEndFound) {
        $bodyLines += $line
    }
}

$body = $bodyLines -join "`n"
Write-Host "修复后的body长度: $($body.Length)"
Write-Host "前10行body:"
for ($i = 0; $i -lt [Math]::Min(10, $bodyLines.Count); $i++) {
    Write-Host "$($i+1): $($bodyLines[$i])"
}

# 测试创建issue
Write-Host ""
Write-Host "测试创建issue..."
$title = "TMS NL-Ops演示系统任务003: PostgreSQL数据库连接配置和Prisma初始化"
if ($body.Length -gt 1000) {
    $shortBody = $body.Substring(0, 1000) + "..."
} else {
    $shortBody = $body
}

$result = gh sub-issue create --title $title --body $shortBody --parent 1 --label enhancement
Write-Host "结果: $result"