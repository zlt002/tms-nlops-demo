#!/bin/bash

# 调试body提取的bash脚本

echo "=== 调试body提取问题 ==="

FILE=".claude/epics/tms-nlops-demo/003.md"

echo "文件: $FILE"
echo "文件大小: $(wc -c < "$FILE") 字节"

echo ""
echo "=== 前20行内容 ==="
head -n 20 "$FILE"

echo ""
echo "=== 检查分隔符 ==="
# 查找所有包含---的行
grep -n "---" "$FILE"

echo ""
echo "=== 提取body内容 ==="
# 使用awk提取第二个---之后的内容
awk '
  /^---$/ {
    if (!in_frontmatter) {
      in_frontmatter = 1
      next
    } else if (in_frontmatter && !frontmatter_end) {
      frontmatter_end = 1
      next
    }
  }
  frontmatter_end { print }
' "$FILE" > /tmp/extracted_body.txt

echo "提取的body内容:"
echo "----------------------------------------"
cat /tmp/extracted_body.txt
echo "----------------------------------------"

echo ""
echo "提取的body长度: $(wc -c < /tmp/extracted_body.txt) 字符"

echo ""
echo "=== 尝试直接创建一个测试issue ==="
# 使用简单的body内容创建测试issue
TEST_TITLE="测试Issue - $(date)"
TEST_BODY="这是一个测试issue的body内容。"
echo "执行命令: gh sub-issue create --title \"$TEST_TITLE\" --body \"$TEST_BODY\" --parent 1 --label enhancement"

RESULT=$(gh sub-issue create --title "$TEST_TITLE" --body "$TEST_BODY" --parent 1 --label enhancement 2>&1)
echo "结果: $RESULT"