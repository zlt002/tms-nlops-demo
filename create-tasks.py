#!/usr/bin/env python3
import subprocess
import os
import re

def extract_task_name(file_path):
    """Extract task name from frontmatter"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract name from frontmatter
    name_match = re.search(r'^name:\s*(.+)$', content, re.MULTILINE)
    if name_match:
        return name_match.group(1).strip()

    # Fallback to filename
    return os.path.basename(file_path).replace('.md', '')

def create_sub_issue(parent_issue, task_file, title):
    """Create a sub-issue"""
    # Extract body without frontmatter
    with open(task_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Skip frontmatter
    start_idx = 0
    dash_count = 0
    for i, line in enumerate(lines):
        if line.strip() == '---':
            dash_count += 1
            if dash_count == 2:
                start_idx = i + 1
                break

    body = ''.join(lines[start_idx:])

    # Create issue
    cmd = [
        'gh', 'sub-issue', 'create',
        '--parent', str(parent_issue),
        '--title', title,
        '--body', body,
        '--label', 'enhancement'
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0:
        # Extract issue number from output
        url_match = re.search(r'https://github.com/.*/issues/(\d+)', result.stdout)
        if url_match:
            return url_match.group(1)

    return None

def main():
    epic_dir = '.claude/epics/tms-nlops-demo'
    parent_issue = 1

    # Process all task files
    task_files = []
    for i in range(1, 43):  # 001 to 042
        task_file = os.path.join(epic_dir, f'{i:03d}.md')
        if os.path.exists(task_file):
            task_files.append(task_file)

    print(f"Found {len(task_files)} task files")

    # Create mapping file
    with open('/tmp/task-mapping.txt', 'w') as mapping_file:
        for task_file in task_files:
            task_name = extract_task_name(task_file)
            print(f"Creating issue for: {task_name}")

            issue_num = create_sub_issue(parent_issue, task_file, task_name)

            if issue_num:
                # Extract old number
                old_num = os.path.basename(task_file).replace('.md', '')
                mapping_file.write(f"{task_file}:{issue_num}\n")
                print(f"  ✓ Created issue #{issue_num}")
            else:
                print(f"  ✗ Failed to create issue")

            # Small delay to avoid rate limiting
            import time
            time.sleep(0.5)

if __name__ == '__main__':
    main()