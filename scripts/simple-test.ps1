# 简单测试脚本

# 读取文件
$content = Get-Content ".claude/epics/tms-nlops-demo/003.md" -Raw

# 提取title
$titleMatch = [regex]::Match($content, 'title:\s*"([^"]+)"')
$title = $titleMatch.Groups[1].Value

Write-Host "Title: $title"

# 测试GitHub CLI
gh --version
gh sub-issue create --title "Test Issue" --body "Test body" --parent 1 --label enhancement --dry-run