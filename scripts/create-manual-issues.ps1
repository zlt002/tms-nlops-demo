# 手动创建GitHub sub-issues的脚本

# 设置父issue编号
$parentIssue = 1

# 获取task文件
$taskFiles = Get-ChildItem -Path ".claude/epics/tms-nlops-demo" -Filter "*.md" |
    Where-Object { $_.Name -match '00[3-9]|0[1-3][0-9]|04[0-2]' } |
    Sort-Object Name

Write-Host "开始手动创建GitHub sub-issues..."
Write-Host "父Epic Issue: #$parentIssue"
Write-Host "处理的task文件数量: $($taskFiles.Count)"
Write-Host ""

# 成功创建的issues
$createdIssues = @()

foreach ($file in $taskFiles) {
    $filename = $file.Name

    if ($filename -eq "epic.md") {
        continue
    }

    Write-Host "处理文件: $filename"

    # 读取文件内容
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8

    # 提取title
    $titleMatch = [regex]::Match($content, 'title:\s*"([^"]+)"')
    if ($titleMatch.Success) {
        $title = $titleMatch.Groups[1].Value
        Write-Host "  Title: $title"
    } else {
        Write-Host "  跳过：无法提取title"
        continue
    }

    # 提取body内容
    $lines = $content -split "`n"
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

    # 如果body太长，截断
    if ($body.Length -gt 1500) {
        $body = $body.Substring(0, 1500) + "..."
    }

    Write-Host "  Body长度: $($body.Length)"

    # 手动创建命令供用户复制执行
    $escapedTitle = $title -replace '"', '\"'
    $escapedBody = $body -replace '"', '\"'
    $command = "gh sub-issue create --title `"$escapedTitle`" --body `"$escapedBody`" --parent $parentIssue --label enhancement"

    Write-Host "  执行命令:"
    Write-Host "  $command"
    Write-Host ""

    try {
        # 实际执行创建
        $result = Invoke-Expression $command 2>&1
        if ($LASTEXITCODE -eq 0) {
            # 提取issue编号
            $issueNumber = [regex]::Match($result, '#(\d+)').Groups[1].Value
            Write-Host "  ✅ 创建成功: #$issueNumber"
            $createdIssues += @{
                File = $filename
                Issue = $issueNumber
                Title = $title
            }
            Start-Sleep -Seconds 1
        } else {
            Write-Host "  ❌ 创建失败: $result"
        }
    } catch {
        Write-Host "  ❌ 执行失败: $($_.Exception.Message)"
    }

    Write-Host "---"
}

# 输出结果
Write-Host ""
Write-Host "=== 创建结果 ==="
Write-Host "成功创建: $($createdIssues.Count) 个sub-issues"

if ($createdIssues.Count -gt 0) {
    Write-Host ""
    Write-Host "Issue映射表:"
    foreach ($issue in $createdIssues) {
        Write-Host "$($issue.File) => #$($issue.Issue)"
    }

    # 保存结果到文件
    "# GitHub Sub-Issues 创建结果" | Out-File -FilePath "sub-issues-mapping.md" -Encoding UTF8
    "创建时间: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" | Out-File -FilePath "sub-issues-mapping.md" -Encoding UTF8 -Append
    "" | Out-File -FilePath "sub-issues-mapping.md" -Encoding UTF8 -Append
    "| 文件 | Issue编号 | 标题 |" | Out-File -FilePath "sub-issues-mapping.md" -Encoding UTF8 -Append
    "|------|-----------|------|" | Out-File -FilePath "sub-issues-mapping.md" -Encoding UTF8 -Append

    foreach ($issue in $createdIssues) {
        $shortTitle = if ($issue.Title.Length -gt 80) { $issue.Title.Substring(0, 80) + "..." } else { $issue.Title }
        "| $($issue.File) | #$($issue.Issue) | $shortTitle |" | Out-File -FilePath "sub-issues-mapping.md" -Encoding UTF8 -Append
    }

    Write-Host ""
    Write-Host "详细结果已保存到: sub-issues-mapping.md"
}