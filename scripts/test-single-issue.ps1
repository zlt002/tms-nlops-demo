# 测试单个GitHub sub-issue创建

# 读取一个示例文件
$file = Get-Item -Path ".claude/epics/tms-nlops-demo/003.md"
$content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
$filename = $file.Name

Write-Host "测试文件: $filename"

# 提取title字段
$titleMatch = [regex]::Match($content, 'title:\s*"([^"]+)"')
if ($titleMatch.Success) {
    $title = $titleMatch.Groups[1].Value
    Write-Host "提取的title: $title"
} else {
    Write-Host "无法提取title"
    exit 1
}

# 提取body内容
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

Write-Host "Body内容长度: $($body.Length) 字符"
Write-Host "Body前100字符: $($body.Substring(0, [Math]::Min(100, $body.Length)))"

# 测试GitHub CLI
if (Get-Command gh -ErrorAction SilentlyContinue) {
    $tempFile = "$env:TEMP\test_issue_body.md"
    $body | Out-File -FilePath $tempFile -Encoding UTF8

    Write-Host "测试创建GitHub sub-issue..."
    try {
        $issueResult = gh sub-issue create --title $title --body-file $tempFile --parent 1 --label enhancement --dry-run 2>&1
        Write-Host "Dry run result: $issueResult"

        # 实际创建（取消注释以下行来真正创建）
        # $issueResult = gh sub-issue create --title $title --body-file $tempFile --parent 1 --label enhancement 2>&1
        # Write-Host "创建结果: $issueResult"
    } catch {
        Write-Host "错误: $($_.Exception.Message)"
    }

    Remove-Item -Path $tempFile -ErrorAction SilentlyContinue
} else {
    Write-Host "GitHub CLI不可用"
}