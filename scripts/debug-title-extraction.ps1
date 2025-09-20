# 调试title字段提取的脚本

# 读取一个示例文件
$file = Get-Item -Path ".claude/epics/tms-nlops-demo/003.md"
$content = Get-Content -Path $file.FullName -Raw -Encoding UTF8

Write-Host "文件名: $($file.Name)"
Write-Host "文件内容前200字符:"
Write-Host $content.Substring(0, [Math]::Min(200, $content.Length))
Write-Host ""

# 尝试不同的正则表达式
Write-Host "尝试正则表达式 1: ^title:\s*""([^""]+)"""
$match1 = [regex]::Match($content, '^title:\s*"([^"]+)"', [System.Text.RegularExpressions.RegexOptions]::Multiline)
if ($match1.Success) {
    Write-Host "✅ 成功: $($match1.Groups[1].Value)"
} else {
    Write-Host "❌ 失败"
}

Write-Host ""
Write-Host "尝试正则表达式 2: title:\s*""([^""]+)"""
$match2 = [regex]::Match($content, 'title:\s*"([^"]+)"')
if ($match2.Success) {
    Write-Host "✅ 成功: $($match2.Groups[1].Value)"
} else {
    Write-Host "❌ 失败"
}

Write-Host ""
Write-Host "尝试正则表达式 3: title:\s*""(.+?)"""
$match3 = [regex]::Match($content, 'title:\s*"(.+?)"')
if ($match3.Success) {
    Write-Host "✅ 成功: $($match3.Groups[1].Value)"
} else {
    Write-Host "❌ 失败"
}

Write-Host ""
Write-Host "按行搜索title:"
$lines = $content -split "`n"
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match 'title:') {
        Write-Host "第$($i+1)行: $($lines[$i])"
        $lineMatch = [regex]::Match($lines[$i], 'title:\s*"([^"]+)"')
        if ($lineMatch.Success) {
            Write-Host "  提取结果: $($lineMatch.Groups[1].Value)"
        }
    }
}