# 创建GitHub sub-issues的PowerShell脚本
# 父Epic Issue编号
$PARENT_ISSUE = 1

# 创建结果记录文件
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
"# GitHub Sub-Issues 创建结果" | Out-File -FilePath "sub-issues-results.md" -Encoding UTF8
"创建时间: $timestamp" | Out-File -FilePath "sub-issues-results.md" -Encoding UTF8 -Append
"" | Out-File -FilePath "sub-issues-results.md" -Encoding UTF8 -Append

# 获取所有task文件并排序
$taskFiles = Get-ChildItem -Path ".claude/epics/tms-nlops-demo" -Filter "*.md" |
    Where-Object { $_.Name -match '00[3-9]|0[1-3][0-9]|04[0-2]' } |
    Sort-Object Name

Write-Host "开始创建GitHub sub-issues..."
Write-Host "父Epic Issue: #$PARENT_ISSUE"
Write-Host "处理的task文件数量: $($taskFiles.Count)"
Write-Host ""

# 记录开始时间
$startTime = Get-Date

# 创建issues映射表
"| 文件 | Issue编号 | 标题 | 状态 |" | Out-File -FilePath "sub-issues-results.md" -Encoding UTF8 -Append
"|------|-----------|------|------|" | Out-File -FilePath "sub-issues-results.md" -Encoding UTF8 -Append

# 处理每个task文件
foreach ($file in $taskFiles) {
    $filename = $file.Name

    # 跳过epic.md文件
    if ($filename -eq "epic.md") {
        continue
    }

    Write-Host "处理文件: $filename"

    # 读取文件内容
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8

    # 提取title字段
    $titleMatch = [regex]::Match($content, '^title:\s*"([^"]+)"', [System.Text.RegularExpressions.RegexOptions]::Multiline)
    if (-not $titleMatch.Success) {
        $titleMatch = [regex]::Match($content, 'title:\s*"([^"]+)"')
    }

    if ($titleMatch.Success) {
        $title = $titleMatch.Groups[1].Value
        Write-Host "  ✅ 提取title成功: $title"
    } else {
        Write-Host "  ❌ 无法提取title字段"
        Write-Host "  内容前100字符: $($content.Substring(0, [Math]::Min(100, $content.Length)))"
        "| $filename | - | 无法提取标题 | 失败 |" | Out-File -FilePath "sub-issues-results.md" -Encoding UTF8 -Append
        continue
    }

    # 提取body内容（去除frontmatter）
    # 分割frontmatter和内容
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

    # 创建GitHub issue
    Write-Host "  标题: $title"
    Write-Host "  创建sub-issue..."

    # 检查GitHub CLI是否可用
    if (Get-Command gh -ErrorAction SilentlyContinue) {
        # 使用临时文件存储body内容
        $tempFile = "$env:TEMP\issue_body_$($file.BaseName).md"
        $body | Out-File -FilePath $tempFile -Encoding UTF8

        try {
            # 创建issue并获取编号
            $issueResult = gh sub-issue create --title $title --body-file $tempFile --parent $PARENT_ISSUE --label enhancement 2>&1

            if ($LASTEXITCODE -eq 0) {
                # 提取issue编号
                $issueNumber = [regex]::Match($issueResult, '#(\d+)').Groups[1].Value
                Write-Host "  ✅ 创建成功: #$issueNumber"
                "| $filename | #$issueNumber | $title | 成功 |" | Out-File -FilePath "sub-issues-results.md" -Encoding UTF8 -Append

                # 等待1秒避免rate limiting
                Start-Sleep -Seconds 1
            } else {
                Write-Host "  ❌ 创建失败: $issueResult"
                "| $filename | - | $title | 失败 |" | Out-File -FilePath "sub-issues-results.md" -Encoding UTF8 -Append
            }
        } catch {
            Write-Host "  ❌ 创建失败: $($_.Exception.Message)"
            "| $filename | - | $title | 失败 |" | Out-File -FilePath "sub-issues-results.md" -Encoding UTF8 -Append
        }

        # 清理临时文件
        Remove-Item -Path $tempFile -ErrorAction SilentlyContinue
    } else {
        Write-Host "  ❌ GitHub CLI未安装，跳过创建"
        "| $filename | - | $title | 跳过(GitHub CLI未安装) |" | Out-File -FilePath "sub-issues-results.md" -Encoding UTF8 -Append
    }
}

# 记录结束时间
$endTime = Get-Date

"" | Out-File -FilePath "sub-issues-results.md" -Encoding UTF8 -Append
"## 创建统计" | Out-File -FilePath "sub-issues-results.md" -Encoding UTF8 -Append
"- 开始时间: $startTime" | Out-File -FilePath "sub-issues-results.md" -Encoding UTF8 -Append
"- 结束时间: $endTime" | Out-File -FilePath "sub-issues-results.md" -Encoding UTF8 -Append
"- 处理文件总数: $($taskFiles.Count)" | Out-File -FilePath "sub-issues-results.md" -Encoding UTF8 -Append

# 计算成功/失败数量
$results = Get-Content -Path "sub-issues-results.md" -Encoding UTF8
$successCount = ($results | Where-Object { $_ -match "成功" }).Count
$failedCount = ($results | Where-Object { $_ -match "失败" }).Count
$skippedCount = ($results | Where-Object { $_ -match "跳过" }).Count

"- 成功创建: $successCount" | Out-File -FilePath "sub-issues-results.md" -Encoding UTF8 -Append
"- 创建失败: $failedCount" | Out-File -FilePath "sub-issues-results.md" -Encoding UTF8 -Append
"- 跳过: $skippedCount" | Out-File -FilePath "sub-issues-results.md" -Encoding UTF8 -Append

"" | Out-File -FilePath "sub-issues-results.md" -Encoding UTF8 -Append
"## 注意事项" | Out-File -FilePath "sub-issues-results.md" -Encoding UTF8 -Append
"- 每次创建后暂停1秒避免rate limiting" | Out-File -FilePath "sub-issues-results.md" -Encoding UTF8 -Append
"- 使用enhancement标签" | Out-File -FilePath "sub-issues-results.md" -Encoding UTF8 -Append
"- 父issue编号: #$PARENT_ISSUE" | Out-File -FilePath "sub-issues-results.md" -Encoding UTF8 -Append

Write-Host ""
Write-Host "✅ sub-issues创建完成!"
Write-Host "结果已保存到: sub-issues-results.md"
Write-Host ""
Write-Host "统计信息:"
Write-Host "- 成功: $successCount"
Write-Host "- 失败: $failedCount"
Write-Host "- 跳过: $skippedCount"

# 显示结果文件内容
Write-Host ""
Write-Host "=== 创建结果 ==="
Get-Content -Path "sub-issues-results.md" -Encoding UTF8