#!/bin/bash

# 创建sub-issues的脚本
# 父Epic Issue编号
PARENT_ISSUE=1

# 创建结果记录文件
echo "# GitHub Sub-Issues 创建结果" > sub-issues-results.md
echo "创建时间: $(date)" >> sub-issues-results.md
echo "" >> sub-issues-results.md

# 获取所有task文件并排序
TASK_FILES=$(ls .claude/epics/tms-nlops-demo/*.md | grep -E '00[3-9]|0[1-3][0-9]|04[0-2]' | sort)

echo "开始创建GitHub sub-issues..."
echo "父Epic Issue: #$PARENT_ISSUE"
echo "处理的task文件数量: $(echo "$TASK_FILES" | wc -l)"
echo ""

# 记录开始时间
START_TIME=$(date)

# 创建issues映射表
echo "| 文件 | Issue编号 | 标题 | 状态 |" >> sub-issues-results.md
echo "|------|-----------|------|------|" >> sub-issues-results.md

# 处理每个task文件
for file in $TASK_FILES; do
    filename=$(basename "$file")

    # 跳过epic.md文件
    if [ "$filename" == "epic.md" ]; then
        continue
    fi

    echo "处理文件: $filename"

    # 提取title字段
    title=$(grep "^title:" "$file" | sed 's/title: "\(.*\)"/\1/')

    if [ -z "$title" ]; then
        echo "  ❌ 无法提取title字段"
        continue
    fi

    # 提取body内容（去除frontmatter）
    # 使用tail -n +8去除前7行frontmatter
    body=$(tail -n +8 "$file")

    # 创建GitHub issue
    echo "  标题: $title"
    echo "  创建sub-issue..."

    # 使用gh CLI创建sub-issue
    if command -v gh &> /dev/null; then
        # 使用临时文件存储body内容
        echo "$body" > /tmp/issue_body.md

        # 创建issue并获取编号
        issue_result=$(gh sub-issue create --title "$title" --body-file /tmp/issue_body --parent $PARENT_ISSUE --label enhancement 2>&1)

        if [ $? -eq 0 ]; then
            # 提取issue编号
            issue_number=$(echo "$issue_result" | grep -o '#[0-9]\+' | sed 's/#//')
            echo "  ✅ 创建成功: #$issue_number"
            echo "| $filename | #$issue_number | $title | 成功 |" >> sub-issues-results.md

            # 等待1秒避免rate limiting
            sleep 1
        else
            echo "  ❌ 创建失败: $issue_result"
            echo "| $filename | - | $title | 失败 |" >> sub-issues-results.md
        fi

        # 清理临时文件
        rm -f /tmp/issue_body.md
    else
        echo "  ❌ GitHub CLI未安装，跳过创建"
        echo "| $filename | - | $title | 跳过(GitHub CLI未安装) |" >> sub-issues-results.md
    fi
done

# 记录结束时间
END_TIME=$(date)

echo "" >> sub-issues-results.md
echo "## 创建统计" >> sub-issues-results.md
echo "- 开始时间: $START_TIME" >> sub-issues-results.md
echo "- 结束时间: $END_TIME" >> sub-issues-results.md
echo "- 处理文件总数: $(echo "$TASK_FILES" | wc -l)" >> sub-issues-results.md

# 计算成功/失败数量
SUCCESS_COUNT=$(grep -c "成功" sub-issues-results.md)
FAILED_COUNT=$(grep -c "失败" sub-issues-results.md)
SKIPPED_COUNT=$(grep -c "跳过" sub-issues-results.md)

echo "- 成功创建: $SUCCESS_COUNT" >> sub-issues-results.md
echo "- 创建失败: $FAILED_COUNT" >> sub-issues-results.md
echo "- 跳过: $SKIPPED_COUNT" >> sub-issues-results.md

echo "" >> sub-issues-results.md
echo "## 注意事项" >> sub-issues-results.md
echo "- 每次创建后暂停1秒避免rate limiting" >> sub-issues-results.md
echo "- 使用enhancement标签" >> sub-issues-results.md
echo "- 父issue编号: #$PARENT_ISSUE" >> sub-issues-results.md

echo ""
echo "✅ sub-issues创建完成!"
echo "结果已保存到: sub-issues-results.md"
echo ""
echo "统计信息:"
echo "- 成功: $SUCCESS_COUNT"
echo "- 失败: $FAILED_COUNT"
echo "- 跳过: $SKIPPED_COUNT"